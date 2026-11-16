# NGA-BBSCODE-FROM-MD

将标准 Markdown 语法转换为 NGA BBCode。

## 目录结构

```
NGA-BBSCODE-FROM-MD/
├── README.md                  ← 本文件（模块根目录说明）
├── docs/
│   └── mapping.md             ← Markdown → BBCode 完整映射关系文档
│
├── typescript/                ← TypeScript 实现
│   ├── src/
│   │   └── index.ts          # 主入口：md2bbscode()
│   ├── test/
│   │   └── test-convert.mjs  # 39 个测试用例
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore
│
└── kotlin/                    ← Kotlin 实现
    ├── build.gradle.kts
    ├── settings.gradle.kts
    └── src/
        ├── main/kotlin/com/nga/bbscode/
        │   └── MdToBbs.kt     # 转换器
        └── test/kotlin/com/nga/bbscode/
            └── MdToBbsTest.kt # 39 个测试用例
```

## 实现对比

| 维度 | TypeScript | Kotlin |
|------|-----------|--------|
| 构建 | npm / tsc | Gradle + Kotlin JVM |
| 运行环境 | Node.js | JVM 17+ |
| 入口 | `md2bbscode()` | `md2bbscode()` |
| 测试 | Node.js mjs 脚本 | Kotlin Test + JUnit Platform |

## 快速开始

### TypeScript

```bash
cd typescript
npm install
npm run build
npm run test          # 39/39 通过
```

```typescript
import { md2bbscode } from 'nga-bbscode-from-md';

const bbcode = md2bbscode('# 标题\n\n**粗体** 和 [链接](https://nga.178.com)');
console.log(bbcode);
// [h][b][size=160%]标题[/size][/b][/h]
//
// [b]粗体[/b] 和 [url=https://nga.178.com]链接[/url]
```

### Kotlin

```bash
# 使用 kotlinc 快速验证
kotlinc src/main/kotlin/com/nga/bbscode/MdToBbs.kt -include-runtime -d md2bbs.jar
java -jar md2bbs.jar
```

```kotlin
import com.nga.bbscode.md2bbscode

fun main() {
    val bbcode = md2bbscode("# 标题\n\n**粗体**")
    println(bbcode)
}
```

## 架构

```
Markdown 字符串
    │
    ▼  逐行分割（统一换行）
    │
    ▼  块级状态机（识别优先级从高到低）
    │   ├─ Fenced code block（```lang）→ 内部原样保留
    │   ├─ 表格（| 表头 | + |---| 分隔行）
    │   ├─ 标题（# ~ ######）
    │   ├─ 水平线（--- / *** / ___）
    │   ├─ 引用（> ）
    │   ├─ 列表（- / * / + / 1.）→ 处理缩进嵌套
    │   ├─ 缩进式代码块（4 空格 / \t）
    │   └─ 普通段落
    │
    ▼  行内转换（非代码块上下文中生效）
    │   ├─ 行内代码 `code` → [font=Lucida Console]
    │   ├─ 粗体 ** / __ → [b]
    │   ├─ 斜体 * / _ → [i]（词边界检查）
    │   ├─ 粗斜体 *** / ___ → [b][i]
    │   ├─ 删除线 ~~ → [del]
    │   ├─ 链接 [text](url) → [url=url]text[/url]
    │   ├─ 图片 ![alt](url) → [img]url[/img]
    │   └─ 转义 \* \[ 等
    │
    ▼
NGA BBCode 字符串
```

## 支持的语法

| 类别 | 语法 | 状态 |
|------|------|------|
| 标题 | ATX（#），6 级 | ✅ |
| 代码块 | Fenced（```）、缩进（4空格） | ✅ |
| 行内代码 | `` `code` ``、`` ``code`` `` | ✅ |
| 粗体 | `**` / `__` | ✅ |
| 斜体 | `*` / `_`（词边界安全） | ✅ |
| 粗斜体 | `***` / `___` | ✅ |
| 删除线 | `~~` | ✅ |
| 链接 | `[text](url)`、自动链接 `<url>` | ✅ |
| 图片 | `![alt](url)` | ✅ |
| 表格 | GFM 表格 + 对齐语法 | ✅ |
| 列表 | 有序/无序/嵌套 | ✅ |
| 引用 | 单行/多行/嵌套 | ✅ |
| 水平线 | `---` / `***` / `___` | ✅ |
| 转义 | `\*` `\[` 等 | ✅ |

**暂不支持**：参考式链接、参考式图片、任务列表、脚注、数学公式、HTML 标签。

## 与官方 bbscodeMd.js 的差异

| 方面 | 官方实现 | 本模块 |
|------|---------|--------|
| 列表 | `&#9675;` + `<div>` 缩进 | 标准 `[list]`/`[list=1]` + `[*]` |
| 行内代码 | 未处理 | `[font=Lucida Console]` |
| 实现方式 | 纯正则 + 状态位 | 逐行扫描 + 状态机 + 递归行内 |
| 可维护性 | ~400 行难读正则 | 清晰的分块函数结构 |

> 详细映射规则见 [docs/mapping.md](docs/mapping.md)。

## 参考

| 来源 | 路径 |
|------|------|
| 官方 Markdown→BBCode 反向转换 | `../NGA-OFFICIAL-JS/data/bbscodeMd.js` |
| NGA BBCode 标签参考 | `../NGA-BBSCODE-TO-JSON/docs/tag-reference.md` |
| BBCode→JSON 解析器（反向模块） | `../NGA-BBSCODE-TO-JSON/` |
