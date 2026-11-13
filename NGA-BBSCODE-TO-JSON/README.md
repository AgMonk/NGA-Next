# NGA-BBSCODE-TO-JSON

将 NGA BBCode 字符串解析为 JSON AST 节点树的 TypeScript 模块。

## 快速开始

```bash
cd NGA-BBSCODE-TO-JSON
npm install
npm run build
npm run test
```

## 使用

```typescript
import { parse, extractText } from 'nga-bbscode-to-json';

// 解析为 JSON AST
const result = parse('[b]Hello [url=https://nga.178.com]NGA[/url]![/b]');
console.log(JSON.stringify(result.children, null, 2));

// 只提取纯文本
const text = extractText('[b]加粗[/b]和[code]代码[/code]');
// → '加粗和代码'
```

## 支持的标签

| 类别 | 标签 |
|------|------|
| 基础样式 | `b` `i` `u` `del` `sup` `sub` `color` `size` `font` `align` `span` |
| 链接 | `url` `attach` |
| 引用 | `quote` |
| 列表 | `list` `*` |
| 表格 | `table` `tr` `td` |
| 媒体 | `img` `flash` `media` `iframe` `album` |
| 折叠 | `collapse` `randomblock` |
| 代码 | `code`（内部不递归） |
| 内部链接 | `tid` `pid` `fid` `stid` `uid` |
| 表情 | `s:1` / `s:ac:goodjob` |
| 其他 | `dice` `crypt` `h` `lessernuke` `atUser` |

## 架构

```
BBCode 字符串
    │
    ▼
preprocessSmiles → [s:1] → [smile=1]
    │
    ▼
preprocess → <br> → \x07，HTML 转义
    │
    ▼
parseNodes ← 逐字符扫描 + 栈式嵌套匹配
    │
    ▼
JSON AST 节点树
```

## 文件结构

```
NGA-BBSCODE-TO-JSON/
├── src/
│   ├── index.ts          # 入口
│   ├── parser.ts         # 核心递归解析器
│   ├── preprocess.ts     # 预处理（换行/HTML转义/Markdown）
│   ├── tags.ts           # 标签配置和常量
│   └── types.ts          # TypeScript 类型定义
├── test/
│   └── test-parser.mjs   # 22 个测试用例
├── docs/
│   └── parsing-method.md # 完整解析方法文档
├── package.json
├── tsconfig.json
└── README.md
```
