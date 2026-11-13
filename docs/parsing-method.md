# BBCode 解析方法文档

> 本文档描述 NGA BBCode 到 JSON 节点树的解析方法，基于官方 JS (`bbscode.js`) 和 nga-api (Java/Kotlin) 实现分析整理。

---

## 一、总体架构

解析采用 **预处理 + 递归解析** 两阶段架构：

```
原始 BBCode 文本
       │
       ▼
  ┌─────────────┐
  │  预处理阶段   │  ← 规范化、标签修复、特殊处理
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  递归解析阶段  │  ← 逐字符扫描，构建节点树
  └──────┬──────┘
         │
         ▼
    JSON 节点树
```

---

## 二、预处理阶段

预处理在正式解析前对文本进行规范化，确保后续解析能正确处理。

### 2.1 换行符和空字符处理

```
<br> / <br/> / <br />  →  \x07 (ASCII BEL，作为换行占位符)
\n                      →  替换为空格（或保留用于分段）
```

**官方 JS 代码位置**：`bbscode_core()` 入口处第一行

```javascript
arg.txt = arg.txt.replace(/<br\s*\/?>/g,'\x07')
```

### 2.2 HTML 安全编码

对文本内容进行 HTML 转义，防止 XSS：

| 原字符 | 转义后 |
|--------|--------|
| `<`    | `&lt;` |
| `>`    | `&gt;` |
| `"`    | `&quot;` |
| `'`    | `&#39;` |
| `$`    | `&#36;` |
| `\`    | `&#92;` |

### 2.3 标签规范化（来自 nga-api 预处理）

| 原始标签 | 规范化后 | 说明 |
|---------|---------|------|
| `===heading===` | `[h]heading[/h]` | 不规范小标题语法 |
| `[b]` | `[bold]` | 短标签扩展 |
| `[i]` | `[italic]` | |
| `[u]` | `[underline]` | |
| `[l]` | `[left]` | 对齐 |
| `[r]` | `[right]` | |
| `[h]` | `[heading]` | |
| `[td100]` | `[td=width100]` | td 宽度参数 |
| `[@name]` | `[atUser=name]name[/atUser]` | @提及 |

### 2.4 Reply 模板自动包裹

```
[b]Reply to [pid=xxx,xxx,xxx]Reply[/pid] Post by ...[/b]
  ↓ 自动包裹
[quote][b]Reply to [pid=xxx,xxx,xxx]Reply[/pid] Post by ...[/b][/quote]
```

### 2.5 列表标签规范化

```
[list]
[*]item1
[*]item2
[/list]
  ↓ 转换为（解析器内部处理）
[ul][li]item1[/li][li]item2[/li][/ul]

[list=1]
  ↓
[ol type=1]...[/ol]
```

### 2.6 表情占位

```
[s:数字]       →  数字表情（如 [s:1]）
[s:组名:表情名]  →  分组表情（如 [s:ac:goodjob]）
```

### 2.7 连续字符自动换行处理

对于连续出现 24 次以上的特定字符（`~`, `!`, `@`, `#` 等），在相邻相同字符之间插入零宽空格 `\u200b`。

---

## 三、递归解析阶段

### 3.1 核心算法

采用 **逐字符扫描 + 栈式嵌套匹配** 的方式。

```
伪代码:
function parseCode(text, depth=0):
    if depth > MAX_DEPTH: return [text节点(text)]
    
    nodes = []
    buffer = ""
    i = 0
    
    while i < text.length:
        if text[i] == '[':
            // 尝试匹配开标签
            tag = tryMatchOpenTag(text, i)
            
            if tag:
                // 先把之前累积的文本加入节点
                if buffer:
                    nodes.push(textNode(buffer))
                    buffer = ""
                
                // 找到对应的闭标签位置
                closePos = findCloseTag(text, tag.name, i + tag.length)
                
                if closePos:
                    // 递归解析标签内部内容
                    innerContent = text.substring(i + tag.length, closePos)
                    children = parseCode(innerContent, depth + 1)
                    nodes.push(tagNode(tag.name, tag.params, children))
                    i = closePos + closeTagLength
                else:
                    // 没有匹配的闭标签，当作普通文本
                    buffer += text[i]
                    i++
            else:
                buffer += text[i]
                i++
        else:
            buffer += text[i]
            i++
    
    if buffer:
        nodes.push(textNode(buffer))
    
    return nodes
```

### 3.2 标签名匹配规则

使用正则匹配标签名，**按长度优先匹配**（避免 `[b]` 误匹配 `[bold]` 的开头）：

```regex
\[(\/?)(code|collapse|urlreplace|quote|crypt|table|tr|td|del|u|b|i|sup|sub|span|dice|list|color|upup|size|font|align|album|img|flash|iframe|attach|url|tid|stid|pid|uid|h|l|r|randomblock|atUser|s)([=\s][^\]]{0,100})?\]
```

### 3.3 查找闭标签（处理嵌套）

对于需要成对出现的标签，需正确处理嵌套：

```
function findCloseTag(text, tagName, startPos):
    depth = 1
    i = startPos
    
    while i < text.length:
        openMatch = text[i:].match(openTagPattern(tagName))
        closeMatch = text[i:].match(closeTagPattern(tagName))
        
        if openMatch at position 0:
            depth++
            i += openMatch.length
        else if closeMatch at position 0:
            depth--
            if depth == 0:
                return i  // 找到匹配的闭标签
            i += closeMatch.length
        else:
            i++
    
    return -1  // 未找到匹配
```

### 3.4 不递归解析的标签

以下标签内部内容作为纯文本，**不再递归解析**：

| 标签 | 说明 |
|------|------|
| `[code]` | 代码块，内部文本保持原样 |
| `[code=language]` | 带语言标识的代码块 |

```python
# 伪代码
if tag.name == "code":
    children = [textNode(rawInnerContent)]  # 不递归
else:
    children = parseCode(innerContent)  # 递归解析
```

---

## 四、标签详解

### 4.1 基础样式标签（ubi.parse）

处理顺序：嵌套关系由递归自然建立。

| 标签 | 格式 | 说明 | JSON 节点 type |
|------|------|------|---------------|
| `[b]` | `[b]text[/b]` | 加粗 | `bold` |
| `[i]` | `[i]text[/i]` | 斜体 | `italic` |
| `[u]` | `[u]text[/u]` | 下划线 | `underline` |
| `[del]` | `[del]text[/del]` | 删除线 | `strikethrough` |
| `[sup]` | `[sup]text[/sup]` | 上标 | `superscript` |
| `[sub]` | `[sub]text[/sub]` | 下标 | `subscript` |
| `[color=xxx]` | 颜色名或 HEX | 文字颜色 | `color`, params: {color} |
| `[size=xxx]` | `100%`, `120%` 等 | 字号 | `size`, params: {size} |
| `[font=xxx]` | 字体名 | 字体 | `font`, params: {font} |
| `[align=xxx]` | `left`/`center`/`right` | 对齐 | `align`, params: {align} |
| `[l]` / `[r]` | 强制左右对齐 | 简写对齐 | `align` |

**官方 JS 正则**：
```regex
(\s*\x07?\s*)(?:\[(\/?)(b|color|size|align|del|font|u|i|sub|sup|span|upup|l|r)(?:[=\s]+([^\]]+))?\])(\s*\x07\s*)?|\n+
```

### 4.2 链接标签

| 标签 | 格式 | 说明 |
|------|------|------|
| `[url]xxx[/url]` | 内部文本为 URL | 自动作为链接文字 |
| `[url=xxx]yyy[/url]` | `xxx` 为 URL，`yyy` 为链接文字 | 参数优先 |
| `[attach]xxx[/attach]` | 附件链接 | 自动生成下载链接 |

**URL 处理特殊逻辑**：
- 如果有参数 `[url=xxx]`，优先使用参数作为 URL
- 无参数时使用内部文本作为 URL
- 自动去除 NGA 域名前缀（`http://bbs.ngacn.cc` 等）

### 4.3 引用标签（parseQuote.parse）

| 标签 | 格式 | 说明 |
|------|------|------|
| `[quote]...[/quote]` | 引用块 | 支持嵌套 |
| Reply 引用 | 自动解析 `[pid=xxx]Reply[/pid] Post by ...` | 提取发帖人和内容 |

**嵌套处理**：递归调用自身，每次替换一层。

**特殊 Reply 格式识别**：
```
[quote]
[pid=xxx,xxx,xxx]Reply[/pid] Post by [uid=xxx]name[/uid] (date):
被引用的内容
[/quote]
```

### 4.4 列表标签（parseList.parse）

| 标签 | 格式 | 说明 |
|------|------|------|
| `[list]...[/list]` | 无序列表 | `[*]` 分隔各项 |
| `[list=1]...[/list]` | 有序列表 | type 参数对应 HTML ol type |
| `[*]` | 列表项分隔 | 转换为 `<li>` |

**嵌套处理**：递归调用自身。

### 4.5 表格标签（parseTable）

| 标签 | 格式 | 说明 |
|------|------|------|
| `[table]...[/table]` | 表格容器 | |
| `[tr]...[/tr]` | 表格行 | |
| `[td]...[/td]` | 单元格 | |
| `[td=width]` | 带宽度的单元格 | 参数 `width` 可为百分比或 auto |
| `[td=colspan=N rowspan=N]` | 合并单元格 | |
| `[tr th]` | 表头行 | 特殊标记 |

**状态栈**：使用 `STACK` 数组维护嵌套状态，追踪 `tablec`(表格计数), `trc`(行计数), `tdc`(单元格计数)。

### 4.6 图片标签（imgGen）

| 标签 | 格式 | 说明 |
|------|------|------|
| `[img]url[/img]` | 普通图片 | |
| `[imgN]url[/img]` | N 为 -1 时不缩小 | |
| `[album=title]...[/album]` | 相册 | 提取所有图片 |

**图片处理**：
- 检查附件类型
- 自动生成缩略图 URL（`.thumb.jpg`）
- 限制最大尺寸

### 4.7 媒体/视频标签（parseFlash）

| 标签 | 格式 | 说明 |
|------|------|------|
| `[flash]url[/flash]` | Flash 视频 | 兼容旧格式 |
| `[media]url[/media]` | 媒体文件 | 支持 bilibili, acfun, 附件视频等 |

### 4.8 折叠/随机块标签（collapse.parse）

| 标签 | 格式 | 说明 |
|------|------|------|
| `[collapse]...[/collapse]` | 折叠块 | 默认隐藏，点击展开 |
| `[collapse=标题]` | 带标题的折叠 | |
| `[randomblock]...[/randomblock]` | 随机显示块 | 多个 randomblock 随机显示一个 |

### 4.9 表情标签

| 标签 | 格式 | 说明 |
|------|------|------|
| `[s:数字]` | 数字表情 | 对应 smiles 表中的数字索引 |
| `[s:组名:表情名]` | 分组表情 | 如 `[s:ac:goodjob]` |

### 4.10 代码标签（codeTag.parse）

| 标签 | 格式 | 说明 |
|------|------|------|
| `[code]...[/code]` | 普通代码 | |
| `[code=language]` | 带语言的代码 | 支持 lua, php, c, js, xml, css, py 等 |

**特殊处理**：
- 代码块内部**不递归解析**，直接作为纯文本
- 支持 Markdown 三引号 ``` 到 [code] 的转换
- JS 代码可选嵌入运行或沙盒运行

### 4.11 内部链接标签

| 标签 | 格式 | 说明 |
|------|------|------|
| `[tid=xxx]标题[/tid]` | 主题链接 | |
| `[pid=xxx,yyy]标题[/pid]` | 回复链接 | yyy 为 topid |
| `[fid=xxx]` | 版面链接 | |
| `[stid=xxx]` | 合集链接 | |
| `[uid=xxx]name[/uid]` | 用户链接 | |
| `[@name]` | @用户 | |

### 4.12 其他标签

| 标签 | 格式 | 说明 |
|------|------|------|
| `[dice]NdM[/dice]` | 骰子 | N 个 M 面骰，LCG 随机算法 |
| `[crypt]...[/crypt]` | 加密内容 | 需密码查看 |
| `[h]...[/h]` | 小标题 | |
| `[iframe=h,w]url[/iframe]` | 嵌入页面 | 白名单域名限制 |
| `[lessernuke]...[/lessernuke]` | 处罚遮罩 | 被处罚内容折叠 |
| `[fixsize]...[/fixsize]` | 固定尺寸容器 | 复杂 CSS 布局 |
| `[chartradar ...]...[/chartradar]` | 雷达图 | SVG 绘制 |
| `[customachieve]...[/customachieve]` | 自定义成就 | 结构化子标签 |
| `[dict][词条]解释[/dict]` | 注解 | 点击弹出解释 |

---

## 五、骰子随机算法

NGA 使用经典 LCG（线性同余生成器）：

```python
def dice_roll(expr, seed):
    """
    解析并执行骰子表达式
    格式: +3+2d6+1d20
    """
    parts = parse_dice_expr(expr)
    total = 0
    
    for sign, count, sides in parts:
        if sides:  # 这是一个骰子投掷
            for _ in range(count):
                seed = (seed * 9301 + 49297) % 233280
                total += (seed / 233280.0) * sides + 1
        else:  # 固定数值
            total += count
    
    return total, seed
```

**种子来源**：
```
seed = authorId + tid + pid + (offset if large ids else 0)
```

---

## 六、JSON 节点类型定义

```typescript
type BbscodeNode = 
    | TextNode
    | TagNode;

interface TextNode {
    type: 'text';
    content: string;
}

interface TagNode {
    type: 'tag';
    name: string;           // 标签名 (小写, 如 'b', 'url', 'quote')
    params?: string;        // 原始参数字符串 (如 '=red', '=800,600')
    children: BbscodeNode[];
    
    // 特殊标签可扩展字段
    url?: string;           // [url] 解析后的 URL
    attachments?: string[]; // [album] 提取的图片列表
    codeLang?: string;      // [code] 语言标识
    diceResult?: {          // [dice] 结果
        expression: string;
        rolls: number[];
        total: number;
    };
}
```

### 示例

**输入**：
```
[b]加粗[/b] 和 [url=https://nga.178.com]NGA[/url]

[quote]
[pid=123,456]Reply[/pid] Post by [uid=789]user[/uid] (2024-01-01 12:00):
这是引用内容
[/quote]
```

**输出**：
```json
{
  "type": "root",
  "children": [
    { "type": "text", "content": "\n" },
    { "type": "tag", "name": "bold", "children": [
      { "type": "text", "content": "加粗" }
    ]},
    { "type": "text", "content": " 和 " },
    { "type": "tag", "name": "url", "params": "=https://nga.178.com", "url": "https://nga.178.com", "children": [
      { "type": "text", "content": "NGA" }
    ]},
    { "type": "text", "content": "\n\n" },
    { "type": "tag", "name": "quote", "children": [
      { "type": "tag", "name": "pid", "params": "=123,456", "children": [
        { "type": "text", "content": "Reply" }
      ]},
      { "type": "text", "content": " Post by " },
      { "type": "tag", "name": "uid", "params": "=789", "children": [
        { "type": "text", "content": "user" }
      ]},
      { "type": "text", "content": " (2024-01-01 12:00):\n这是引用内容" }
    ]}
  ]
}
```

---

## 七、解析顺序（官方 JS 实际流程）

```
bbscode_core(arg)
│
├── 1. 预处理
│   ├── replace <br> → \x07
│   ├── extract contentQuoteCache（引用缓存）
│   ├── bbscode_pre 钩子（如 p_w_upload → attachment）
│   ├── lesserNuke 处理（处罚遮罩）
│   ├── removeQuote 正则移除多余引用
│   ├── continueCharProc（连续字符处理）
│   └── secureText（HTML 转义）
│
├── 2. codeTag.parse(arg)          ← 代码块（不递归内部）
│
├── 3. bbscode_bef 钩子
│
├── 4. collapse.parse(arg)        ← 折叠/随机块
│
├── 5. parseTemplate(arg)         ← 模板（表情模板）
│
├── 6. HTML entity 还原
│
├── 7. bbscode_mid 钩子            ← 数据库链接、armory 等
│
├── 8. bbscode_common(arg)        ← 通用标签处理
│   ├── urlreplace 提取
│   ├── Reply to 模板补全引用
│   ├── [crypt] 加密
│   ├── parseQuote.parse          ← 嵌套引用
│   ├── Reply 格式简化
│   ├── parseTable                ← 表格
│   ├── [dice] 骰子
│   ├── parseList.parse           ← 列表
│   ├── [headline] 标题
│   ├── [album] 相册
│   ├── [webgal] 网页画廊
│   ├── [img] 图片
│   ├── parseFlash                ← 视频
│   ├── [iframe] 嵌入
│   ├── [s:xxx] 表情
│   ├── [attach] 附件
│   ├── [url] 链接
│   ├── [tid/pid/stid/fid] 内部链接
│   ├── [uid] 用户
│   ├── parseTitle                ← 标题语法
│   ├── [chartradar] 雷达图
│   └── ubi.parse                 ← 基础样式 [b][i][u][del]...
│
├── 9. bbscode_aft 钩子
│
├── 10. contentPrefix 处理
│
└── 11. replace \x07 → <br/>  ← 最终换行还原
```

---

## 八、关键注意事项

### 8.1 换行占位符 `\x07`

官方 JS 使用 `\x07`（BEL 字符）作为换行占位符，在解析过程中保留结构信息，最后再转回 `<br/>`。实现时可选择同样的策略，或用专门的节点类型表示换行。

### 8.2 嵌套深度限制

为防止恶意嵌套，建议设置最大递归深度（官方 JS 对 quote 和 list 限制为 5 层）。

### 8.3 标签匹配的贪婪性

`[\s\S]*?`（非贪婪匹配）在处理嵌套时会失效，必须用栈式匹配来正确处理嵌套结构。

### 8.4 不完整/不匹配的标签

官方 JS 的 `ubi.parse` 使用计数器 `b[t]` 来追踪标签开闭状态。如果结束标签多于开始标签，输出 `errorHint`；如果开始标签未关闭，在文本末尾自动补全。

### 8.5 Markdown 兼容性

当 `opt & 65536` 标志位开启时，额外支持：
- `**粗体**` → `[b]粗体[/b]`
- `*斜体*` → `[i]斜体[/i]`
- `~~删除线~~` → `[del]删除线[/del]`
- `# 标题` → `[h][b]标题[/b][/h]`
- ```代码块``` → `[code]代码块[/code]`
- Markdown 表格 → `[table][tr][td]...[/td][/tr][/table]`
- `&gt;` 引用语法 → `[quote]`

---

## 九、参考实现

| 来源 | 文件 | 说明 |
|------|------|------|
| 官方 JS | `NGA-OFFICIAL-JS/data/bbscode.js` | 主解析器，5199 行 |
| 官方 JS | `NGA-OFFICIAL-JS/data/bbscodeSpec.js` | 论坛特定标签扩展 |
| 官方 JS | `NGA-OFFICIAL-JS/data/bbscodeMd.js` | Markdown → BBCode 转换 |
| nga-api (Java) | `BbsTagParser.java` | 递归解析 + 预处理 |
| nga-api (Java) | `TagName.java` | 标签枚举定义 |
| nga-api (Java) | `DiceUtils.java` | 骰子算法 |
