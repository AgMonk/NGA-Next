# NGA-BBSCODE-TO-JSON

将 NGA BBCode 字符串解析为 JSON AST 节点树。

## 目录结构

```
NGA-BBSCODE-TO-JSON/
├── README.md                  ← 本文件（模块根目录说明）
├── docs/
│   └── parsing-method.md      ← 解析方法详细文档
│
├── typescript/                ← TypeScript 实现
│   ├── src/
│   │   ├── index.ts          # 入口：parse(), extractText()
│   │   ├── parser.ts         # 核心递归解析器
│   │   ├── preprocess.ts     # 预处理（换行/HTML转义/Markdown/表情）
│   │   ├── tags.ts           # 标签配置（30+ 标签 + 别名）
│   │   └── types.ts          # AST 节点类型定义
│   ├── test/
│   │   └── test-parser.mjs   # 25 个测试用例
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── kotlin/                    ← Kotlin 实现
    ├── build.gradle.kts      # Gradle + Jackson
    ├── settings.gradle.kts
    └── src/
        ├── main/kotlin/com/nga/bbscode/
        │   └── BbsCodeParser.kt   # 解析器 + Jackson 序列化
        └── test/kotlin/com/nga/bbscode/
            └── BbsCodeParserTest.kt
```

## 实现对比

| 维度 | TypeScript | Kotlin |
|------|-----------|--------|
| 构建 | npm / tsc | Gradle |
| JSON 序列化 | 手动 (JSON.stringify) | Jackson + jackson-module-kotlin |
| 运行环境 | Node.js | JVM 17+ |
| 入口 | `parse()` / `extractText()` | `parse()` / `BbsCodeJson` |
| 标签覆盖 | 30+ | 30+（相同） |

## 快速开始

### TypeScript

```bash
cd typescript
npm install
npm run build
npm run test
```

```typescript
import { parse } from 'nga-bbscode-to-json';
const result = parse('[b]Hello [url=https://nga.178.com]NGA[/url]![/b]');
console.log(JSON.stringify(result.children, null, 2));
```

### Kotlin

```bash
cd kotlin
./gradlew build          # 或 gradle build
./gradlew test           # 运行单元测试
./gradlew run            # 运行 main 示例
```

```kotlin
val result = parse("[b]Hello[/b]")
val json = BbsCodeJson.toJson(result)
println(json)
```

## 架构

```
BBCode 字符串
    │
    ▼  预处理（类型无关）
    ├─ [s:1] → [smile=1]        表情归一
    ├─ <br> → \u0007            换行占位符
    ├─ quote/list 边界清换行
    └─ BBCode 外文本 HTML 编码
    │
    ▼  递归解析（逐字符扫描 + 栈式嵌套匹配）
    │   遇到 [  → 尝试按长度优先匹配标签名
    │   找到开标签 → 栈式查找对应闭标签深度
    │   code/dice/crypt 内部不递归
    │
    ▼
JSON AST 节点树
    TextNode  { type: 'text', content }
    TagNode   { type: 'tag', name, rawParams, params, children }
    NewlineNode { type: 'newline' }
```

详见 [docs/parsing-method.md](docs/parsing-method.md)。

## 支持的标签

| 类别 | 标签 |
|------|------|
| 基础样式 | `b` `i` `u` `del` `sup` `sub` `color` `size` `font` `align` `span` |
| 链接 | `url` `attach` |
| 引用 | `quote`（嵌套 ≤ 10） |
| 列表 | `list` `*` |
| 表格 | `table` `tr` `td` |
| 媒体 | `img` `flash` `media` `iframe` `album` |
| 折叠 | `collapse` `randomblock` |
| 代码 | `code`（内部不递归） |
| 内部链接 | `tid` `pid` `fid` `stid` `uid` |
| 表情 | `s`（数字 / 分组） |
| 其他 | `dice` `crypt` `h` `lessernuke` `atUser` |

## 参数解析规则

```
[pid=123,456]              → { value: '123,456' }      整体作为 value
[color=red]                → { value: 'red' }
[td width=80 auto]         → { width: '80', auto: 'true' }
```

规则：存在 `空格/逗号 + key=` 模式时按 key=value 解析，否则整个 `=xxx` 作为 `value`。

## 参考

- 官方 JS：`../../NGA-OFFICIAL-JS/data/bbscode.js`
- nga-api (Java)：`BbsTagParser.java` / `TagName.java`
