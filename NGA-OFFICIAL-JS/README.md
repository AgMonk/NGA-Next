# NGA-OFFICIAL-JS

NGA 官方前端 JavaScript 资源镜像。通过抓取 `bbs.nga.cn` 首页解析其 `__SCRIPTS` 对象，把官方加载的全部脚本自动归档到本模块，供其他模块（如 `NGA-BBSCODE-*`、`NGA-ANDROID-JPC`）参考实现。

## 目录结构

```
NGA-OFFICIAL-JS/
├── README.md                   # 本文档
├── scripts/
│   ├── fetch_scripts.py        # 主脚本：抓首页 → 解析 → 生成 scripts.json → 下载 JS
│   └── _raw.html               # （运行时生成）首页抓取的原始 HTML，已被 .gitignore 忽略
├── scripts.json                # __SCRIPTS 解析结果，{key: 绝对URL}
└── data/                       # scripts.json 中每个 key 对应一个 .js 文件
    ├── lib.js
    ├── common.js
    ├── forum.js
    ├── bbscode.js
    ├── bbscodeSpec.js
    ├── ...                     # 共 30 个 nga.cn 官方脚本
    └── aipi.js
```

## scripts.json 中的 key 含义

`bbs.nga.cn` 首页里 `__SCRIPTS` 对象大致长这样（经过本脚本处理后的绝对 URL 形式）：

| key | 原始来源 | 作用 |
|-----|----------|------|
| `lib` | `__COMMONRES_PATH+/js_commonLib.js` | 基础工具库（`window.$`、cookie、URL 工具等） |
| `common` | `__COMMONRES_PATH+/js_commonui.js` | UI 通用逻辑 |
| `forum` | `__COMMONRES_PATH+/js_forum.js` | 论坛首页相关 |
| `bbscode` | `__COMMONRES_PATH+/js_bbscode_core.js` | BBCode 解析核心 —— `NGA-BBSCODE-TO-JSON` 的重要参考 |
| `bbscodeSpec` | `__RES_STYLE+/js_bbscode_smiles.js` | 表情映射 —— `NGA-BBSCODE-SMILES` 的原始来源 |
| `commonSpec` | `__RES_STYLE+/js_default.js` | 默认皮肤逻辑 |
| `combine` | `__IMG_BASE+"/proxy/cache_attach/..."` | 动态生成的合并脚本（`Math.floor(__NOW/300)` 做缓存戳） |
| `service` | `/js_service.js` | 相对路径，补域名后 `https://bbs.nga.cn/js_service.js` |

完整列表见 [`scripts.json`](./scripts.json)。

## 脚本功能

[scripts/fetch_scripts.py](./scripts/fetch_scripts.py) —— 纯 Python 3 标准库 + `curl`，无额外依赖。执行流程：

1. **抓首页** — `curl -sSL https://bbs.nga.cn/?rand=<时间戳>`
   - 自动处理 nga.cn 的 Error 15 拦截页：检测到"访客不能直接访问"后，从拦截页 JS 中正则提取 `guestJs` / `lastpath` cookie 重试。
2. **提取 JS 常量** — 正则匹配 `__VAR = 'value'` 形式的全部常量，以及别名赋值 `__A = __B`。
3. **提取 `__SCRIPTS={...}`** — 按大括号深度配对截取对象体，避免被嵌套 `{}` 截断。
4. **表达式求值** — 循环替换 `__VAR + "字面量"`、`"字面量" + __VAR`、裸 `__VAR`、`Math.floor(__NOW/N)` 等拼接语法。
5. **URL 清洗** — 统一升级 `http://` → `https://`，相对路径补 `https://bbs.nga.cn`，query 串只保留 `?` 后跟纯数字的情况（去掉 `?+xxxxx` 这类脏值）。
6. **过滤** — 剔除 `rand` 数字项、`127.0.0.1`、非 `.js` 扩展名、第三方广告/统计域名（`tagtic.cn`）。
7. **Diff & 下载** — 对比旧 `scripts.json` 得出新增/更新/删除三类，仅下载变动项；删除不再需要的本地文件。

运行：

```bash
python3 NGA-OFFICIAL-JS/scripts/fetch_scripts.py
```

## GitHub Actions

工作流位于 [`.github/workflows/official-js-sync.yml`](../.github/workflows/official-js-sync.yml)：

- **触发**：每天 UTC 16:00（北京时间 0:00），支持手动 `workflow_dispatch`。
- **执行**：Checkout → 跑 `fetch_scripts.py` → `git add -A` → 有变更则 commit + push。
- **Commit 格式**：`official-js: sync YYYY-MM-DD`，author 为 `official-js-bot`。

## 过滤规则一览

| 类型 | 保留 / 剔除 | 示例 |
|------|-------------|------|
| nga.cn 官方资源（`img4.nga.cn`、`bbs.nga.cn`） | ✅ 保留 | `https://img4.nga.cn/common_res/js_bbscode_core.js?1342409` |
| 相对路径 `/js_service.js?xxx` | ✅ 保留（自动补域名） | `https://bbs.nga.cn/js_service.js?778549` |
| `rand: 637858` 数字项 | ❌ 剔除 | — |
| `jsDebug: http://127.0.0.1/...` | ❌ 剔除 | — |
| `ubbeditor_v2/index.html` 非 `.js` | ❌ 剔除 | — |
| `tagtic.cn` 广告/统计域名 | ❌ 剔除 | `g1.tagtic.cn/v1/xingyou/c/715.js` |
