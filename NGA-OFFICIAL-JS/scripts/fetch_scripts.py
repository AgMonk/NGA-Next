#!/usr/bin/env python3
"""
NGA-OFFICIAL-JS 官方脚本同步工具

流程：
1. curl 抓取 https://bbs.nga.cn 首页（需带 UA + cookie 绕过反爬 Error 15）
2. 解析 JS 常量定义（__VAR = 'value'）与别名赋值（__A = __B）
3. 从 __SCRIPTS={...} 提取对象体，解析每条 key: expr
4. 表达式求值：替换 __VAR+"lit"、"lit"+__VAR、Math.floor(__NOW/N)、裸 __VAR
5. 相对路径补 https://bbs.nga.cn；过滤 127.0.0.1 / rand 数字项
6. 与旧 scripts.json 对比：新增/更新/删除 三类 diff
7. 下载或重下载变动的 URL，存到 data/{key}.js；删除失效文件
8. 输出变更摘要
"""

import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

# ---------- 配置 ----------
MODULE_DIR = Path(__file__).resolve().parent.parent          # NGA-OFFICIAL-JS
DATA_DIR   = MODULE_DIR / "data"
JSON_PATH  = MODULE_DIR / "scripts.json"
RAW_HTML   = MODULE_DIR / "scripts" / "_raw.html"

INDEX_URL  = "https://bbs.nga.cn/"
UA         = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
              "AppleWebKit/537.36 (KHTML, like Gecko) "
              "Chrome/131.0.0.0 Safari/537.36")
# 拦截页 JS 写死的 cookie，用来绕过 Error 15
COOKIES    = [
    "guestJs=1794555165_6exn4y",
    "lastpath=0",
    "ngaPassportUid=guest06af6bd30a8d22",
]


# ---------- 1. 抓首页 ----------
def fetch_index() -> str:
    """curl 抓首页到 _raw.html，返回内容（GBK）"""
    RAW_HTML.parent.mkdir(parents=True, exist_ok=True)
    tmp = str(RAW_HTML)
    # 每次加一个 rand 避免缓存
    url = f"{INDEX_URL}?rand={int(time.time())}"
    cmd = [
        "curl", "-sSL", "--max-time", "30",
        "-H", f"User-Agent: {UA}",
        "-H", "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "-H", "Accept-Language: zh-CN,zh;q=0.9,en;q=0.8",
        "-H", "Referer: https://bbs.nga.cn/",
        "-H", f"Cookie: {'; '.join(COOKIES)}",
        "-o", tmp,
        url,
    ]
    subprocess.run(cmd, check=True)
    content = Path(tmp).read_bytes()
    # 尝试 GBK，失败则回退 replace
    try:
        return content.decode("gbk")
    except UnicodeDecodeError:
        return content.decode("gbk", errors="replace")


# ---------- 2. 提取常量 ----------
def extract_constants(html: str) -> dict:
    consts: dict[str, str] = {}
    # __VAR = 'value'  或  __VAR='value'
    for m in re.finditer(r"(__[A-Z_]+)\s*=\s*'([^']*)'", html):
        consts[m.group(1)] = m.group(2)
    # 别名赋值 __A = __B（仅当 A 未定义且 B 已定义）
    for m in re.finditer(r"(__[A-Z_]+)\s*=\s*(__[A-Z_]+)", html):
        tgt, src = m.group(1), m.group(2)
        if tgt not in consts and src in consts:
            consts[tgt] = consts[src]
    # __DSBASE 在 JS 里有 .replace(/^http:/,'https:')
    if "__DSBASE" in consts:
        consts["__DSBASE"] = consts["__DSBASE"].replace("http:", "https:")
    return consts


# ---------- 3. 提取 __SCRIPTS 体 ----------
def extract_scripts_body(html: str) -> str:
    idx = html.find("__SCRIPTS={")
    if idx < 0:
        raise RuntimeError("找不到 __SCRIPTS 定义")
    brace_start = html.index("{", idx)
    depth = 0
    end = brace_start
    for i in range(brace_start, len(html)):
        c = html[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                end = i
                break
    return html[brace_start + 1:end]


# ---------- 4. 表达式求值 ----------
def resolve_expr(expr: str, consts: dict, now: int) -> str:
    e = expr.strip()
    # Math.floor(__NOW / N)
    e = re.sub(
        r"Math\.floor\(\s*__NOW\s*/\s*(\d+)\s*\)",
        lambda m: str(now // int(m.group(1))),
        e,
    )
    # 循环替换 __VAR + "lit" / "lit" + __VAR / 裸 __VAR
    # （注意 + 号两侧可能带空格）
    while True:
        # __VAR + "..."
        m = re.search(r"(__[A-Z_]+)\s*\+\s*\"([^\"]*)\"", e)
        if m:
            e = e[:m.start()] + consts.get(m.group(1), "") + m.group(2) + e[m.end():]
            continue
        m = re.search(r"(__[A-Z_]+)\s*\+\s*'([^']*)'", e)
        if m:
            e = e[:m.start()] + consts.get(m.group(1), "") + m.group(2) + e[m.end():]
            continue
        # "..." + __VAR
        m = re.search(r"\"([^\"]*)\"\s*\+\s*(__[A-Z_]+)", e)
        if m:
            e = e[:m.start()] + m.group(1) + consts.get(m.group(2), "") + e[m.end():]
            continue
        m = re.search(r"'([^']*)'\s*\+\s*(__[A-Z_]+)", e)
        if m:
            e = e[:m.start()] + m.group(1) + consts.get(m.group(2), "") + e[m.end():]
            continue
        # 裸 __VAR
        m = re.fullmatch(r"\s*(__[A-Z_]+)\s*", e)
        if m and m.group(1) in consts:
            e = consts[m.group(1)]
            continue
        break

    # 首尾引号
    if (e.startswith('"') and e.endswith('"')) or (e.startswith("'") and e.endswith("'")):
        e = e[1:-1]
    # 相对路径（/js_xxx 开头但不是 // 协议继承）补域名
    if e.startswith("/") and not e.startswith("//"):
        e = "https://bbs.nga.cn" + e
    return e


def parse_scripts(body: str, consts: dict) -> dict:
    """返回 {key: url}，自动过滤 rand 数字项、127.0.0.1、非 http(s)"""
    now = int(time.time())
    result: dict[str, str] = {}
    pat = re.compile(r'[,\s]*"?([a-zA-Z_][a-zA-Z0-9_]*)"?\s*:\s*([^,}\n]+)')
    for m in pat.finditer(body):
        key = m.group(1).strip()
        expr = m.group(2).strip()
        # rand: 637858 这类数字项跳过
        if re.fullmatch(r"\d+", expr):
            continue
        url = resolve_expr(expr, consts, now)
        if "127.0.0.1" in url:
            continue
        if not (url.startswith("http://") or url.startswith("https://")):
            continue
        result[key] = url
    return result


# ---------- 5. 读取旧 json ----------
def load_old_json() -> dict:
    if JSON_PATH.exists():
        try:
            return json.loads(JSON_PATH.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}


# ---------- 6. diff ----------
def diff(old: dict, new: dict):
    added = {k: new[k] for k in new if k not in old}
    removed = {k: old[k] for k in old if k not in new}
    updated = {k: new[k] for k in new if k in old and old[k] != new[k]}
    unchanged = {k: new[k] for k in new if k in old and old[k] == new[k]}
    return added, updated, removed, unchanged


# ---------- 7. 下载 ----------
def download_file(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    # 写入临时文件再 rename，避免下载中断留下半文件
    tmp = dest.with_suffix(dest.suffix + ".part")
    cmd = [
        "curl", "-sSL", "--max-time", "60",
        "-H", f"User-Agent: {UA}",
        "-H", "Referer: https://bbs.nga.cn/",
        "-o", str(tmp),
        url,
    ]
    rc = subprocess.run(cmd).returncode
    if rc != 0 or not tmp.exists() or tmp.stat().st_size == 0:
        tmp.unlink(missing_ok=True)
        return False
    tmp.replace(dest)
    return True


def download_all(items: dict, updated_keys: set[str]) -> tuple[int, list]:
    """
    items: 需要下载的 {key: url}（新增 + 更新的）
    updated_keys: 需要重下的 key（url 变了）
    返回 (成功数, 失败条目列表 [(key, url)])
    """
    ok = 0
    fails: list[tuple[str, str]] = []
    for key, url in items.items():
        dest = DATA_DIR / f"{key}.js"
        if dest.exists() and key not in updated_keys:
            # 已存在且 url 没变，跳过
            continue
        if download_file(url, dest):
            ok += 1
            print(f"  ✓ {key}.js")
        else:
            fails.append((key, url))
            print(f"  ✗ {key} 下载失败: {url}")
    return ok, fails


# ---------- 主流程 ----------
def main() -> int:
    print("=== NGA-OFFICIAL-JS 同步 ===")
    print()

    # 1. 抓首页
    print("[1/5] 抓取 nga.cn 首页 ...")
    html = fetch_index()
    print(f"      已保存 {len(Path(RAW_HTML).read_bytes())} 字节 → scripts/_raw.html")

    # 2. 提取常量
    consts = extract_constants(html)
    print(f"[2/5] 提取到 {len(consts)} 个 JS 常量")

    # 3. __SCRIPTS
    print("[3/5] 解析 __SCRIPTS ...")
    body = extract_scripts_body(html)
    new = parse_scripts(body, consts)
    print(f"      解析出 {len(new)} 条合法 URL")

    # 4. 对比旧 json
    old = load_old_json()
    added, updated, removed, _ = diff(old, new)
    print(f"[4/5] 对比变更：新增 {len(added)} / 更新 {len(updated)} / 删除 {len(removed)} / 未变 {len(new)-len(added)-len(updated)}")

    # 写 scripts.json
    JSON_PATH.write_text(
        json.dumps(new, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"      → 写入 scripts.json")

    # 5. 下载
    print("[5/5] 下载/更新 JS 文件 ...")
    need = {**added, **updated}
    ok, fails = download_all(need, set(updated.keys()))
    # 删除不再需要的文件
    deleted_local = 0
    for key in removed:
        dest = DATA_DIR / f"{key}.js"
        if dest.exists():
            dest.unlink()
            deleted_local += 1
            print(f"  🗑 {key}.js")

    # 总结
    print()
    print("=== 变更摘要 ===")
    print(f"  新增下载  {ok} 个")
    print(f"  删除本地  {deleted_local} 个")
    if fails:
        print(f"  失败 {len(fails)} 个:")
        for k, u in fails:
            print(f"    - {k}: {u}")

    return 0 if not fails else 1


if __name__ == "__main__":
    sys.exit(main())
