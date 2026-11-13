# BBCode 解析方法文档

> 本文档描述 NGA BBCode 到 JSON 节点树的解析方法，基于官方 JS (`bbscode.js`) 和 nga-api (Java/Kotlin) 实现分析整理。

## 一、总体架构

```
原始 BBCode 文本
       │
       ▼
  ┌─────────────┐
  │  预处理阶段   │  ← [s:1] → [smile=1], <br> → \x07, HTML 编码
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  递归解析阶段  │  ← 逐字符扫描 + 栈式嵌套匹配
  └──────┬──────┘
         │
         ▼
    JSON 节点树
```

## 二、预处理

| 处理 | 说明 |
|------|------|
| `[s:数字]` → `[smile=数字]` | 表情标签统一 |
| `<br>` → `\x07` | 换行占位符 |
| `[<>"'$\\]` | BBCode 标签外文本 HTML 编码 |
| Markdown 兼容 | `**bold**` `*italic*` `~~del~~` `![alt](url)` `[t](u)` |

## 三、核心算法

逐字符扫描 + 栈式嵌套匹配：

```python
def parseNodes(text):
    nodes = []
    buffer = ""
    for i, ch in enumerate(text):
        if ch == '\x07':     # 换行占位符
            flush buffer → newline node
        elif ch == '[' and match_tag(text[i:]):
            flush buffer
            # 栈式查找闭合标签
            closePos = findCloseTag(text, i + tagLen, tagName)
            inner = text[i+tagLen : closePos]
            if tag.rawContent:
                children = [textNode(inner)]    # 不递归
            else:
                children = parseNodes(inner)    # 递归
            nodes.append(tagNode(name, params, children))
            i = closePos + closeTagLen
        else:
            buffer += ch
    flush buffer
    return nodes
```

### 查找闭标签（栈式）

```python
def findCloseTag(text, from, name):
    depth = 1
    for i in range(from, len(text)):
        if text[i:] matches openTag:
            depth += 1
        elif text[i:] matches closeTag:
            depth -= 1
            if depth == 0: return i
    return -1   # 未匹配
```

### 按长度优先匹配标签名

正则中标签名按长度降序排列，避免 `[b]` 误匹配 `[bold]` 开头。

## 四、不递归解析的标签

| 标签 | 说明 |
|------|------|
| `[code]` | 代码块内部保持原样 |
| `[dice]` | 骰子表达式 |
| `[crypt]` | 加密内容 |
| `[urlreplace]` | URL 替换模式 |

## 五、自闭合标签

| 标签 | 说明 |
|------|------|
| `[*]` | 列表项分隔符 |
| `[smile=数字]` | 表情（`[s:1]` 转换而来） |

## 六、参数解析

```
[pid=123,456]         → { value: '123,456' }      # 整个作为 value
[color=red]           → { value: 'red' }
[td width=80 auto]    → { width: '80', auto: 'true' }  # key=value 模式
[url=https://x]text[/url]  → params.value 为 URL
```

规则：如果包含 `空格/逗号 + key=` 这种模式，按 key=value 解析；否则整个 `=xxx` 作为 `value`。

## 七、支持的标签（30+）

| 类别 | 标签 |
|------|------|
| 基础样式 | `b` `i` `u` `del` `sup` `sub` `color` `size` `font` `align` `span` |
| 链接 | `url` `attach` |
| 引用 | `quote`（最大嵌套 10） |
| 列表 | `list` `*` |
| 表格 | `table` `tr` `td` |
| 媒体 | `img` `flash` `media` `iframe` `album` |
| 折叠 | `collapse` `randomblock` |
| 代码 | `code` |
| 内部链接 | `tid` `pid` `fid` `stid` `uid` |
| 表情 | `s`（数字/分组） |
| 其他 | `dice` `crypt` `h` `lessernuke` `atUser` |

## 八、JSON 节点类型

```typescript
type BbscodeNode = TextNode | TagNode | NewlineNode;

interface TextNode { type: 'text'; content: string; }
interface TagNode {
  type: 'tag';
  name: string;           // 'bold' 'quote' 'url' 等规范名
  rawParams?: string;     // 原始 '=red' '=800,600'
  params: Record<string, string>;  // 解析后 { value: 'red' } 或 { width: '80' }
  children: BbscodeNode[];
}
interface NewlineNode { type: 'newline'; }
```

### 示例

输入：
```
[b]加粗[/b] 和 [url=https://nga.178.com]NGA[/url]
```

输出：
```json
{
  "children": [
    { "type": "tag", "name": "bold", "children": [
      { "type": "text", "content": "加粗" }
    ]},
    { "type": "text", "content": " 和 " },
    { "type": "tag", "name": "url", "rawParams": "=https://nga.178.com",
      "params": { "value": "https://nga.178.com" },
      "children": [ { "type": "text", "content": "NGA" } ] }
  ]
}
```

## 九、嵌套深度限制

默认最大递归 20 层。`quote`/`list` 分别声明了 10/5 层的建议值。超过限制会警告并截断。

## 十、参考实现

| 来源 | 路径 | 说明 |
|------|------|------|
| 官方 JS | `NGA-OFFICIAL-JS/data/bbscode.js` | 5199 行正则替换式解析器 |
| 官方 JS | `NGA-OFFICIAL-JS/data/bbscodeSpec.js` | 论坛标签扩展 |
| 官方 JS | `NGA-OFFICIAL-JS/data/bbscodeMd.js` | Markdown → BBCode |
| nga-api (Java) | `BbsTagParser.java` | 递归 + 预处理，架构参考 |
| nga-api (Java) | `TagName.java` | 标签枚举 |
