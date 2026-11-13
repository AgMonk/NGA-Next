#!/usr/bin/env python3
"""
NGA-BBSCODE-SMILES: 从官方 JS 文件提取表情分组数据

输入: NGA-OFFICIAL-JS/data/bbscode.js (GBK / UTF-8 编码)
输出:
    NGA-BBSCODE-SMILES/data/groups.json  # 表情分组 JSON
    NGA-BBSCODE-SMILES/data/groups.md    # 表情分组 Markdown

URL 说明:
    bbscode.js 第 2 行硬编码的 __IMGPATH 是过时的默认值（http://img4.ngacn.cc/ngabbs），
    线上运行时会被 commonSpec.js 的替换逻辑重写为 https://img4.nga.cn/ngabbs。
    本脚本直接使用后者作为基础 URL，避免读到过时值。
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Optional

# ---------------------------------------------------------------------------
# 常量
# ---------------------------------------------------------------------------

# 线上实际生效的图片基础路径（见 commonSpec.js 的 host 替换逻辑与 scripts.json）
BASE_IMG_URL = "https://img4.nga.cn/ngabbs"

# 模块根目录相对仓库根目录
REPO_ROOT = Path(__file__).resolve().parent.parent.parent
DEFAULT_INPUT = REPO_ROOT / "NGA-OFFICIAL-JS" / "data" / "bbscode.js"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "NGA-BBSCODE-SMILES" / "data"


# ---------------------------------------------------------------------------
# 工具函数
# ---------------------------------------------------------------------------

def read_js(path: Path) -> str:
    """读取 bbscode.js，自动尝试多种编码（官方文件通常为 GBK）。"""
    for encoding in ("utf-8", "gbk", "gb18030", "latin-1"):
        try:
            return path.read_text(encoding=encoding)
        except UnicodeDecodeError:
            continue
    raise RuntimeError(f"无法解码文件 {path} (尝试了 utf-8 / gbk / gb18030 / latin-1)")


def find_smiles_block(content: str) -> str:
    """定位 ubbcode.smiles = { ... } 的对象体。"""
    # bbscode.js 中该对象以 `//s` 注释结尾
    m = re.search(r"ubbcode\.smiles\s*=\s*\{(.+?)\}\s*//s", content, re.DOTALL)
    if not m:
        raise RuntimeError("未找到 ubbcode.smiles 对象，bbscode.js 结构可能已变化")
    return m.group(1)


# ---------------------------------------------------------------------------
# 核心解析
# ---------------------------------------------------------------------------

_KV_PATTERN = re.compile(
    r"""
        ["']?([^"':,\s]+)["']?      # key: 数字 / 标识符 / 可带引号
        \s*:\s*                     # 冒号
        ["']([^"']+)["']            # value: 带引号的字符串（表情文件名）
        (?:\s*,\s*                   # 可选结尾逗号
            (?://\s*(.+?)\s*$))?     # 可选行尾 // 注释（作为 note）
        ,?                          # 尾部逗号
    """,
    re.VERBOSE,
)


def parse_groups(block: str) -> dict[str, dict]:
    """解析 smiles 对象体，返回 { 分组key -> {name, smiles: [...]} }。"""
    # 匹配分组 key，允许多行和逗号/换行两种分隔
    group_pattern = re.compile(r'(?:^|[\n,]\s*)["\']?([a-zA-Z0-9_]+)["\']?\s*:\s*\{')

    group_starts: list[tuple[str, int]] = []
    for m in group_pattern.finditer(block):
        key = m.group(1)
        brace_start = block.find("{", m.start())
        group_starts.append((key, brace_start))

    if not group_starts:
        raise RuntimeError("未解析到任何表情分组")

    groups: dict[str, dict] = {}

    for i, (key, brace_start) in enumerate(group_starts):
        end_boundary = group_starts[i + 1][1] if i + 1 < len(group_starts) else len(block)

        # 手动匹配闭合大括号（处理嵌套）
        depth = 0
        brace_end = brace_start
        for j in range(brace_start, min(end_boundary, len(block))):
            if block[j] == "{":
                depth += 1
            elif block[j] == "}":
                depth -= 1
                if depth == 0:
                    brace_end = j
                    break

        group_body = block[brace_start + 1 : brace_end]

        # 中文名
        name_match = re.search(r"_______name\s*:\s*['\"]([^'\"]+)['\"]", group_body)
        cn_name = name_match.group(1) if name_match else ""

        smiles_list: list[dict] = []
        for raw_line in group_body.split("\n"):
            line = raw_line.strip()
            if not line:
                continue

            # 跳过整行 // 注释（____display 就是以 // 开头的整行注释）
            if line.startswith("//"):
                continue

            kv = _KV_PATTERN.match(line)
            if not kv:
                continue

            k = kv.group(1)
            filename = kv.group(2)
            raw_note = kv.group(3)
            # 从行尾注释中提取纯文本: //"逆转裁判", / //"卡兹" → "逆转裁判" / "卡兹"
            note: Optional[str] = None
            if raw_note:
                inner = re.search(r'["\'](.*?)["\']', raw_note)
                note = inner.group(1).strip() if inner else raw_note.strip().rstrip(",")

            # 跳过元数据字段（_______name / ____display 等）
            if k.startswith("____"):
                continue

            # 生成编辑器实际输出的 code
            # 默认分组 (key="0") → [s:<表情key>] 或 [s::<表情key>]
            # 其他分组           → [s:<分组key>:<表情key>]
            if str(key) == "0":
                code = f"[s::{k}]"
            else:
                code = f"[s:{key}:{k}]"

            smiles_list.append(
                {
                    "code": code,
                    "url": f"{BASE_IMG_URL}/post/smile/{filename}",
                    "note": note if note else None,
                }
            )

        groups[str(key)] = {"name": cn_name, "smiles": smiles_list}

    return groups


# ---------------------------------------------------------------------------
# 输出
# ---------------------------------------------------------------------------

def write_json(groups: dict, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(groups, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def _md_escape(s: str) -> str:
    """Markdown 表格单元格里的特殊字符处理。"""
    return s.replace("|", "\\|").replace("\n", " ").strip()


def write_markdown(groups: dict, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    lines: list[str] = []
    lines.append("# NGA 表情分组一览")
    lines.append("")
    lines.append(f"> 图片基础路径: `{BASE_IMG_URL}`")
    lines.append("> code 字段为正文编辑器点击表情时实际输出的 UBB code，可直接复制使用。")
    lines.append("> 数据由 `scripts/parse_smiles.py` 从 `NGA-OFFICIAL-JS/data/bbscode.js` 自动生成。")
    lines.append("")

    for gkey, gdata in groups.items():
        lines.append(f"## {gdata['name']}（key: `{gkey}`）")
        lines.append("")
        lines.append("| code | 图片 | 备注 |")
        lines.append("|------|------|------|")
        for s in gdata["smiles"]:
            note = _md_escape(s["note"]) if s["note"] else ""
            lines.append(f"| `{s['code']}` | <{s['url']}> | {note} |")
        lines.append("")

    path.write_text("\n".join(lines), encoding="utf-8")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(description="从 NGA 官方 JS 提取表情分组")
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT, help="bbscode.js 路径")
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR, help="输出目录")
    args = parser.parse_args()

    if not args.input.is_file():
        print(f"错误: 输入文件不存在 {args.input}", file=sys.stderr)
        return 1

    print(f"读取: {args.input}")
    content = read_js(args.input)
    block = find_smiles_block(content)
    groups = parse_groups(block)

    total = sum(len(g["smiles"]) for g in groups.values())
    print(f"解析完成: {len(groups)} 个分组, {total} 个表情")
    for gkey, gdata in groups.items():
        print(f"  [{gkey}] {gdata['name']}: {len(gdata['smiles'])}")

    json_path = args.output_dir / "groups.json"
    md_path = args.output_dir / "groups.md"
    write_json(groups, json_path)
    write_markdown(groups, md_path)
    print(f"输出: {json_path}")
    print(f"输出: {md_path}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
