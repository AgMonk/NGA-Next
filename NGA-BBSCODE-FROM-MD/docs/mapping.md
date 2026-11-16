# Markdown → NGA BBCode 映射关系

> 本文档定义本模块支持的 Markdown 语法到 NGA BBCode 的映射规则。
> 参考来源：官方 `bbscodeMd.js`（反向转换），但以最佳实践为优先。

---

## 目录

- [块级语法](#块级语法)
  - [标题](#标题)
  - [代码块](#代码块)
  - [列表](#列表)
  - [引用](#引用)
  - [表格](#表格)
  - [水平线](#水平线)
  - [段落与空行](#段落与空行)
- [行内语法](#行内语法)
  - [加粗](#加粗)
  - [斜体](#斜体)
  - [粗斜体](#粗斜体)
  - [删除线](#删除线)
  - [行内代码](#行内代码)
  - [链接](#链接)
  - [图片](#图片)
- [转义](#转义)
- [不支持的语法](#不支持的语法)
- [与官方实现的差异](#与官方实现的差异)

---

## 块级语法

### 标题

Markdown 支持 6 级标题，NGA BBCode 没有独立的 h1-h6 标签，而是用 `[h]` + `[b]` + `[size]` + `[color]` 组合模拟。

| Markdown | BBCode |
|----------|--------|
| `# H1` | `[h][b][size=160%]H1[/size][/b][/h]` |
| `## H2` | `[h][b][size=140%]H2[/size][/b][/h]` |
| `### H3` | `[h][b][size=120%]H3[/size][/b][/h]` |
| `#### H4` | `[h][b]H4[/b][/h]` |
| `##### H5` | `[h][b][color=gray]H5[/color][/b][/h]` |
| `###### H6` | `[h][b][color=silver]H6[/color][/b][/h]` |

**规则**：
- `#` 后必须有空格
- 末尾可选 `#`（ATX 闭合），转换时自动去除
- 标题内的行内语法（粗体、链接等）正常处理

### 代码块

**Fenced Code Block**（推荐）：

| Markdown | BBCode |
|----------|--------|
| ` ```python `<br>`def hello():`<br>`    print("hi")`<br>` ``` | `[code=python]`def hello():`    print("hi")[/code]` |

**缩进式代码块**（4 空格缩进）：

| Markdown | BBCode |
|----------|--------|
| `    code here` | `[code]code here[/code]` |

**规则**：
- 语言标识符可选，缺失时 `[code]` 不带参数
- 代码块内部内容**原样保留**，不处理任何 Markdown 语法
- `[code]` 标签在 NGA 官方渲染器中内部也不递归解析 BBCode

### 列表

**无序列表**：

| Markdown | BBCode |
|----------|--------|
| `- item1`<br>`- item2` | `[list]`[*]item1`[*]item2`[/list]` |
| `* item1`<br>`+ item2` | 同上（`*` 和 `+` 等价） |

**有序列表**：

| Markdown | BBCode |
|----------|--------|
| `1. first`<br>`2. second` | `[list=1]`[*]first`[*]second`[/list]` |

**嵌套列表**：

| Markdown | BBCode |
|----------|--------|
| `- outer`<br>`  - inner` | `[list]`[*]outer`[list]`[*]inner`[/list]`[/list]` |

**规则**：
- 列表标记后必须有空格
- 有序列表可以从任意数字开始（`1.` `3.` 都合法），BBCode 统一输出 `[list=1]`
- 嵌套通过缩进（2 或 4 空格）识别
- 列表项内的行内语法正常处理

### 引用

| Markdown | BBCode |
|----------|--------|
| `> quoted text` | `[quote]quoted text[/quote]` |
| `> line1`<br>`> line2` | `[quote]`line1`<br>`line2`[/quote]` |

**嵌套引用**：

| Markdown | BBCode |
|----------|--------|
| `> outer`<br>`> > inner` | `[quote]outer [quote]inner[/quote][/quote]` |

**规则**：
- `>` 后可跟可选空格
- 连续引用行合并为一个 `[quote]` 块
- 引用块内的嵌套结构（列表、链接等）正常处理
- NGA 官方渲染器限制 quote 最大嵌套 10 层

### 表格

| Markdown | BBCode |
|----------|--------|
| `| A | B |` | `[table]` |
| `|---|---|` | `[tr][td][b]A[/b][/td][td][b]B[/b][/td][/tr]` |
| `| 1 | 2 |` | `[tr][td]1[/td][td]2[/td][/tr]` |
| | `[/table]` |

**对齐语法**：

| Markdown 分隔行 | BBCode |
|-----------------|--------|
| `|:---|`（左对齐） | `[align=left]`...`[/align]` |
| `|---:|`（右对齐） | `[align=right]`...`[/align]` |
| `|:---:|`（居中） | `[align=center]`...`[/align]` |

**规则**：
- 必须有表头分隔行（包含 `|` `:` `-` 三种字符的行）
- 表头行自动加粗（`[b]`）
- 对齐信息通过 `[align=xxx]` 包裹对应单元格内容
- 单元格内的行内语法正常处理
- 转义的 `\|` 作为普通竖线处理

### 水平线

| Markdown | BBCode |
|----------|--------|
| `---` / `***` / `___` | `[h]──────────────────[/h]` |

**规则**：
- 单独一行、三个以上的 `-` `*` 或 `_` 序列
- BBCode 没有标准水平线标签，用 `[h]` 包裹一串长横线模拟视觉分隔
- 如果下一行是标题或其他块级元素，水平线直接忽略

### 段落与空行

| Markdown | BBCode |
|----------|--------|
| 普通文本行 | 直接输出 |
| 两个换行符（空行） | 保持段落分隔 |
| 行尾两个空格 + 换行（硬换行） | `<br>` |

**规则**：
- BBCode 中换行符会被官方渲染器转为 `<br>`
- 空行自动转为 BBCode 的段落间距
- 行尾空白（trailing whitespace）用于识别硬换行

---

## 行内语法

行内语法在**所有块级上下文**中都生效（标题、列表项、表格单元格、引用等），但在代码块内部不生效。

### 加粗

| Markdown | BBCode |
|----------|--------|
| `**bold**` | `[b]bold[/b]` |
| `__bold__` | `[b]bold[/b]` |

### 斜体

| Markdown | BBCode |
|----------|--------|
| `*italic*` | `[i]italic[/i]` |
| `_italic_` | `[i]italic[/i]` |

**规则**：
- `*` 在词内不触发斜体（`he*llo` 中的 `*` 保留原样）
- `_` 在词内也不触发斜体（保留原样）

### 粗斜体

| Markdown | BBCode |
|----------|--------|
| `***bold italic***` | `[b][i]bold italic[/i][/b]` |

**规则**：三个连续的 `*` 或 `_` 同时触发加粗和斜体

### 删除线

| Markdown | BBCode |
|----------|--------|
| `~~deleted~~` | `[del]deleted[/del]` |

### 行内代码

| Markdown | BBCode |
|----------|--------|
| `` `code` `` | `[font=Lucida Console]code[/font]` |
| `` `code with 'quotes'` `` | `[font=Lucida Console]code with 'quotes'[/font]` |

**规则**：
- NGA BBCode 没有专门的行内代码标签，用 `[font=Lucida Console]` 模拟等宽字体效果
- 行内代码内部的内容**不做任何进一步转换**
- 支持双反引号包裹（`` ``code with ` inside` ``）

### 链接

| Markdown | BBCode |
|----------|--------|
| `[text](https://example.com)` | `[url=https://example.com]text[/url]` |
| `[text](https://example.com "title")` | `[url=https://example.com]text[/url]`（title 忽略） |
| `<https://example.com>` | `[url=https://example.com]https://example.com[/url]` |

**规则**：
- NGA BBCode 的 `[url]` 不支持 title 属性，转换时丢弃
- 自动链接（尖括号形式）自动补全为完整链接
- 链接文本内的行内语法正常处理

### 图片

| Markdown | BBCode |
|----------|--------|
| `![alt](https://example.com/img.png)` | `[img]https://example.com/img.png[/img]` |
| `![alt][ref]`（引用式） | 暂不支持，保留原样 |

**规则**：
- NGA BBCode 的 `[img]` 不支持 alt 属性，转换时丢弃
- 图片 URL 必须在 `[img]` 和 `[/img]` 之间
- NGA 官方 `[img]` 内部不递归解析，但本模块只输出 URL，所以没有冲突

---

## 转义

Markdown 中反斜杠 `\` 可以转义以下字符：

| 输入 | 输出 | 说明 |
|------|------|------|
| `\*literal\*` | `*literal*` | 转义 `*` 不触发斜体 |
| `\*\*not bold\*\*` | `**not bold**` | 转义 `**` 不触发加粗 |
| `\[not a link\]` | `[not a link]` | 转义 `[` 不触发链接 |
| `\` + 其他字符 | 保留反斜杠 | 非特殊字符的反斜杠原样保留 |

---

## 不支持的语法

以下 Markdown 语法**不支持**转换，将保留原样输出：

| 语法 | 原因 |
|------|------|
| 参考式链接 `[text][ref]` / `[ref]: url` | 需要预收集所有引用定义，复杂度高 |
| 参考式图片 `![alt][ref]` | 同上 |
| 定义列表 | NGA BBCode 无对应标签 |
| 任务列表 `- [ ] task` | NGA BBCode 无对应标签 |
| 脚注 `[^note]` | NGA BBCode 无对应标签 |
| 数学公式 `$...$` / `$$...$$` | NGA BBCode 无对应标签 |
| HTML 标签 `<div>` | NGA 论坛一般禁用 HTML |
| 自动链接 `<name@example.com>` | 邮箱自动链接，需额外处理 |

---

## 与官方实现的差异

| 方面 | 官方 `bbscodeMd.js` | 本模块 |
|------|---------------------|--------|
| 列表实现 | 用 `&#9675;`/`&#9679;` + `<div>` 缩进 | 用标准 `[list]`/`[list=1]` + `[*]` |
| 行内代码 | 未处理 | 用 `[font=Lucida Console]` 包裹 |
| 水平线 | 未处理 | 用 `[h]────────[/h]` 模拟 |
| 实现方式 | 纯正则 + 状态位 | 逐行扫描 + 行内递归 |
| 表格对齐 | 支持 | 支持，用 `[align=xxx]` |
| 引用 | 未显式处理 | 支持嵌套引用 |

**列表差异说明**：
官方实现用 `<div class='inlineBlock'>` 做缩进，渲染效果依赖论坛 CSS。本模块改用标准 `[list]` 标签，好处是：
1. 跨客户端兼容（官方 App、第三方客户端都能正确渲染）
2. 支持有序列表（官方 `bbscodeMd.js` 只能输出圆点，无法区分有序/无序）
3. 支持嵌套列表（官方嵌套处理有 bug）
