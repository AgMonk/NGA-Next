# NGA BBCode 标签完全参考

> 本文档整理本模块（typescript + kotlin 两个实现）支持的所有 BBCode 标签。
> 参考来源：NGA 官方客户端 `bbscode.js` / `bbscodeSpec.js` / `bbscodeMd.js`。

---

## 目录

- [基础样式](#基础样式)
- [链接与附件](#链接与附件)
- [引用](#引用)
- [列表](#列表)
- [表格](#表格)
- [媒体](#媒体)
- [折叠与随机](#折叠与随机)
- [代码](#代码)
- [内部链接](#内部链接)
- [表情](#表情)
- [其他](#其他)
- [版头与高级布局（NGA 论坛专用）](#版头与高级布局nga-论坛专用)
- [预处理移除标签](#预处理移除标签)

---

## 基础样式

### `[b]...[/b]` 加粗

| 项 | 说明 |
|----|------|
| 规范名 | `bold` |
| 别名 | — |
| 参数 | 无 |

```
输入: [b]这是加粗文本[/b]
输出: [{"type":"tag","name":"bold","children":[{"type":"text","content":"这是加粗文本"}]}]
```

### `[i]...[/i]` 斜体

| 项 | 说明 |
|----|------|
| 规范名 | `italic` |
| 别名 | — |
| 参数 | 无 |

### `[u]...[/u]` 下划线

| 项 | 说明 |
|----|------|
| 规范名 | `underline` |
| 别名 | — |
| 参数 | 无 |

### `[del]...[/del]` 删除线

| 项 | 说明 |
|----|------|
| 规范名 | `strikethrough` |
| 别名 | — |
| 参数 | 无 |

### `[sup]...[/sup]` 上标

| 项 | 说明 |
|----|------|
| 规范名 | `superscript` |
| 别名 | — |
| 参数 | 无 |

### `[sub]...[/sub]` 下标

| 项 | 说明 |
|----|------|
| 规范名 | `subscript` |
| 别名 | — |
| 参数 | 无 |

### `[color=颜色]...[/color]` 文字颜色

| 项 | 说明 |
|----|------|
| 规范名 | `color` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=值` | 颜色名 / HEX | 如 `red`, `#ff0000`, `#f00` |

```
[color=red]红色[/color]            → params: { value: "red" }
[color=#00ff00]HEX绿色[/color]      → params: { value: "#00ff00" }
```

### `[size=尺寸]...[/size]` 字号

| 项 | 说明 |
|----|------|
| 规范名 | `size` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=值` | 百分比 / em | 如 `120%`, `1.5em`, `20px` |

### `[font=字体]...[/font]` 字体

| 项 | 说明 |
|----|------|
| 规范名 | `font` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=值` | 字体名 | 如 `微软雅黑`, `Consolas`, `Arial` |

### `[align=center|left|right|justify]...[/align]` 对齐

| 项 | 说明 |
|----|------|
| 规范名 | `align` |
| 别名 | `[l]` → `[align=left]`, `[r]` → `[align=right]` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=值` | `center` / `left` / `right` / `justify` | 对齐方向 |

### `[span=样式]...[/span]` 行内样式

| 项 | 说明 |
|----|------|
| 规范名 | `span` |
| 参数模式 | `key=value` |

用于应用行内 CSS 样式。与 `[style]` 不同，`span` 是行内元素（不生成新行），`style` 是块级元素。

---

## 链接与附件

### `[url=URL]文字[/url]` 超链接

| 项 | 说明 |
|----|------|
| 规范名 | `url` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=URL` | 字符串 | 目标地址 |

**官方特殊处理**：
- 有参数 `[url=xxx]` 时优先使用参数作为 URL，内部文字作为链接文本
- 无参数时内部文本同时作为 URL 和链接文字
- 自动去除 NGA 域名前缀（`http://bbs.ngacn.cc` 等）

```
[url=https://nga.178.com]NGA 官网[/url]   → params.value = "https://nga.178.com"
```

### `[attach]附件名[/attach]` 附件链接

| 项 | 说明 |
|----|------|
| 规范名 | `attach` |
| 参数 | 无 |

内部文本为附件文件名，渲染器会自动生成下载链接。

### `[urlreplace=规则][/urlreplace]` URL 替换

| 项 | 说明 |
|----|------|
| 规范名 | `urlreplace` |
| 参数模式 | `key=value` |
| 内部 | **不递归解析**（rawContent = true） |

用于根据 URL 模式将外部链接替换为 NGA 内部链接格式。

---

## 引用

### `[quote]...[/quote]` 引用块

| 项 | 说明 |
|----|------|
| 规范名 | `quote` |
| 参数 | 无 |
| 最大嵌套 | 10 层 |

引用嵌套格式：
```
[quote]
[pid=xxx,yyy]Reply[/pid] Post by [uid=zzz]用户名[/uid] (2024-01-01 12:00):
被引用的原帖内容
[/quote]
```

**官方特殊处理**：自动识别 Reply 模板格式，提取发帖人、时间、内容。
`pid` 和 `uid` 标签会被自动补充（发帖时从上下文获取）。

---

## 列表

### `[list]...[/list]` 无序列表

| 项 | 说明 |
|----|------|
| 规范名 | `list` |
| 参数模式 | `key=value` |
| 最大嵌套 | 5 层 |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=1` / `=a` / `=A` / `=i` / `=I` | 字符串 | 有序列表标记类型 |

```
[list]
[*]第一项
[*]第二项
[/list]

[list=1]
[*]A
[*]B
[/list]
```

### `[*]` 列表项分隔

| 项 | 说明 |
|----|------|
| 规范名 | `*` |
| 自闭合 | 是 |
| 参数 | 无 |

放在 `[list]` 内部，标记列表项边界。**不是**成对标签，而是 `[list]...[*]item1[*]item2...[/list]` 形式。

---

## 表格

### `[table]...[/table]` 表格容器

| 项 | 说明 |
|----|------|
| 规范名 | `table` |
| 参数 | 无 |

必须与 `[tr]` / `[td]` 配合使用。

### `[tr]...[/tr]` 表格行

| 项 | 说明 |
|----|------|
| 规范名 | `tr` |
| 参数 | 无 |

### `[td=参数]...[/td]` 单元格

| 项 | 说明 |
|----|------|
| 规范名 | `td` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=宽度` | 数字 / 百分比 | 如 `[td=100]`, `[td=50%]` |
| `width=值` | 数字 | 列宽 |
| `colspan=N` | 数字 | 跨 N 列 |
| `rowspan=N` | 数字 | 跨 N 行 |
| `auto` | 无值 | 自适应宽度 |

**官方特殊处理**：`[td100]` 无等号形式自动转换为 `[td=width=100]`。

---

## 媒体

### `[img=尺寸]URL[/img]` 图片

| 项 | 说明 |
|----|------|
| 规范名 | `img` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `-1` | 特殊 | 不缩小（NGA 移动端适配） |
| `=宽度` | 数字 | 最大显示宽度（em 单位） |
| 无参数 | — | 正常尺寸 |

内部为图片 URL，渲染器会自动处理缩略图（`.thumb.jpg`）。

### `[flash=宽,高]URL[/flash]` Flash 视频

| 项 | 说明 |
|----|------|
| 规范名 | `flash` |
| 参数模式 | `key=value` |

### `[media=宽,高]URL[/media]` 多媒体

| 项 | 说明 |
|----|------|
| 规范名 | `media` |
| 参数模式 | `key=value` |

支持 Bilibili 视频、Acfun 等外链。

### `[iframe=宽,高]URL[/iframe]` 嵌入页面

| 项 | 说明 |
|----|------|
| 规范名 | `iframe` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=宽,高` | 数字 | 如 `=800,600` |

有**白名单域名**限制（安全沙箱）。

### `[album=标题]...[/album]` 相册

| 项 | 说明 |
|----|------|
| 规范名 | `album` |
| 参数模式 | `key=value` |

渲染时自动提取内部所有 `[img]` 生成相册画廊。

---

## 折叠与随机

### `[collapse=标题]...[/collapse]` 折叠块

| 项 | 说明 |
|----|------|
| 规范名 | `collapse` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=标题` | 字符串 | 折叠按钮上显示的标题 |

**官方特殊处理**：当内部包含 `[fixsize]` 时，自动设置 `clear:both` 防止版头溢出。

### `[randomblock]...[/randomblock]` 随机显示

| 项 | 说明 |
|----|------|
| 规范名 | `randomblock` |
| 参数 | 无 |

多个 `[randomblock]` 同时出现时，渲染器随机选择显示其中一个。

---

## 代码

### `[code=语言]...[/code]` 代码块

| 项 | 说明 |
|----|------|
| 规范名 | `code` |
| 参数模式 | `key=value` |
| 内部 | **不递归解析**（rawContent = true） |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=语言` | 字符串 | 语法高亮语言标识 |

**支持的语言**：`lua`, `php`, `c`, `js`, `javascript`, `css`, `xml`, `html`, `py`, `python`, `java`, `go`, `rs`, `rust`, `sql` 等。

**关键规则**：内部 BBCode 标签（如 `[b]` `[url]`）**不被解析**，保持原样。这是为了在代码示例中演示 BBCode 语法本身。

```
[code]let [b]x[/b] = 1;[/code]
→ 内部内容: "let [b]x[/b] = 1;"  （不会再递归解析 [b]）
```

---

## 内部链接

### `[tid=主题ID]标题[/tid]` 主题链接

| 项 | 说明 |
|----|------|
| 规范名 | `tid` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=ID` | 数字 | 主题 ID |

**特殊处理**：如果内部文本为纯数字（如 `[tid=12345]12345[/tid]`），渲染器自动取内部数字作为标题。

### `[pid=回复ID,版面ID]标题[/pid]` 回复链接

| 项 | 说明 |
|----|------|
| 规范名 | `pid` |
| 参数模式 | `key=value`（整体作为 value） |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=回复ID,版面ID` | 数字对 | 如 `=123,456` |

第二个数字是版面 ID（`topid`），用于定位回复所在的主题。

### `[fid=版面ID]` / `[fid=版面ID]名称[/fid]` 版面链接

| 项 | 说明 |
|----|------|
| 规范名 | `fid` |
| 参数模式 | `key=value` |

### `[stid=合集ID]...[/stid]` 合集链接

| 项 | 说明 |
|----|------|
| 规范名 | `stid` |
| 参数模式 | `key=value` |

### `[uid=用户ID]用户名[/uid]` 用户链接

| 项 | 说明 |
|----|------|
| 规范名 | `uid` |
| 参数模式 | `key=value` |

| 参数 | 类型 | 说明 |
|------|------|------|
| `=ID` | 数字 | 用户 UID |

### `[@用户名]` @提及

| 项 | 说明 |
|----|------|
| 规范名 | `atUser` |
| 别名 | `[at=用户名]` |

自动查找并链接到对应用户主页。

---

## 表情

### `[s:数字]` / `[s:分组:表情名]`

| 项 | 说明 |
|----|------|
| 规范名 | `smile` |
| 别名 | — |
| 自闭合 | 是 |
| 原生标签 | `[s]`（不是成对形式） |

**支持的两种格式**：

| 格式 | 转换后 | 说明 |
|------|--------|------|
| `[s:1]` | `[smile=1]` | 数字索引表情 |
| `[s:ac:goodjob]` | `[smile=ac:goodjob]` | 分组表情 |

**预处理阶段转换**（`preprocessSmiles`）→ 两种格式统一转为 `[smile=值]` 进入解析器。

---

## 其他

### `[dice]表达式[/dice]` 骰子

| 项 | 说明 |
|----|------|
| 规范名 | `dice` |
| 内部 | **不递归解析** |

| 参数 | 类型 | 说明 |
|------|------|------|
| 内部文本 | 字符串 | 骰子表达式，如 `2d6+3` |

**骰子表达式格式**：`+固定值+NdM+固定值...`
- `NdM`：N 个 M 面骰，如 `2d6`
- 固定值：如 `+3`

**随机算法**（LCG 伪随机）：
```
seed = (seed × 9301 + 49297) mod 233280
结果 = floor(seed / 233280 × M) + 1
```

**种子来源**（官方 JS 硬编码逻辑）：`authorId + tid + pid` 组合。

### `[crypt]密码保护内容[/crypt]` 加密

| 项 | 说明 |
|----|------|
| 规范名 | `crypt` |
| 内部 | **不递归解析** |

渲染时默认隐藏，用户需输入密码才能查看。

### `[h]...[/h]` 小标题

| 项 | 说明 |
|----|------|
| 规范名 | `heading` |
| 别名 | — |
| 参数 | 无 |

另一种不规范语法：`===小标题===`，官方会自动转换为 `[h]小标题[/h]`。

### `[lessernuke]...[/lessernuke]` 处罚遮罩

| 项 | 说明 |
|----|------|
| 规范名 | `lessernuke` |
| 参数 | 无 |

内容默认折叠隐藏（灰色遮罩 + "查看" 按钮），点击后展开。

### `[urlreplace=规则]...[/urlreplace]` URL 替换规则

| 项 | 说明 |
|----|------|
| 规范名 | `urlreplace` |
| 内部 | **不递归解析** |

用于自定义 URL 替换，一般用于 armory 类外部链接。

---

## 版头与高级布局（NGA 论坛专用）

这组标签是 NGA 论坛**版头**（版规 / 公告区块）专用的高级布局语法，在 `tid=33684916` 这类版头主题中大量使用。

> ⚠️ 这组标签的参数模式为 **key val key val 交替**（`paramMode: space`），与其他标签的 `key=value` 模式不同。

### `[fixsize height H width W [maxW] background 背景色 [底色]]...[/fixsize]` 固定尺寸容器

| 项 | 说明 |
|----|------|
| 规范名 | `fixsize` |
| 参数模式 | `space` |
| 最大嵌套 | 2 层 |

| key | value 数量 | 类型 | 说明 |
|-----|-----------|------|------|
| `height` | 1 | 数字 | 容器高度（em） |
| `width` | 1 或 2 | 数字 | 容器宽度 + 可选的 max-width |
| `background` | 1 或 2 | `#颜色` / `transparent` | 前景背景色 + 可选的内层底色 |

```
[fixsize height 19.3 width 60 153 background transparent transparent]...[/fixsize]

解析结果:
  height: "19.3"
  width: "60", width_1: "153"
  background: "transparent", background_1: "transparent"
```

**官方限制**：`height < 50em` 且 `width < 300em` 才允许渲染，否则显示 "过高或过宽" 按钮。

**官方 JS 实现位置**：`ubbcode.parseFix`（整个函数 ~270 行）。

### `[style key val key val ...]...[/style]` 样式容器

| 项 | 说明 |
|----|------|
| 规范名 | `style` |
| 参数模式 | `space` |
| 最大嵌套 | 10 层 |

这是 NGA 版头的核心组件，支持 **绝对定位**、**尺寸**、**CSS transform** 等 20+ 种 key。

#### 支持的 key 完整列表

| key | value 数量 | 类型 | 说明 | 官方 JS 处理 |
|-----|-----------|------|------|-------------|
| `width` | 1 | 数字 | 容器宽度（em 或 %） | `s.width = z+'em'` 或 `%` |
| `height` | 1 | 数字 | 容器高度 | 同上 |
| `line-height` | 1 | 数字 | 行高 | 同上 |
| `left` / `top` / `right` / `bottom` | 1 | 数字 | 绝对定位偏移（em） | `s.position='absolute'; s[key]=z+'em'` |
| `margin` | 1-4 | 数字/`auto` | 外边距，1/2/3/4 个值 | CSS margin 简写，官方按数量自动补 `auto` |
| `padding` | 1-4 | 数字/`auto` | 内边距 | 同上 |
| `float` | 1 | `left` / `right` | 浮动 | `s.float = z` |
| `clear` | 1 | `both` | 清除浮动 | `s.clear = 'both'` |
| `align` | 1 | `center` / `left` / `right` / `justify-all` | 对齐 | `s.text-align = z` |
| `color` | 1 | `#HEX` | 文字颜色 | `s.color = z` |
| `background` | 1 | `#HEX` | 背景色 | `s.background = z` |
| `background-repeat` | 1 | `0` / `1` | 是否平铺 | `s['background-repeat'] = z ? 'repeat' : 'no-repeat'` |
| `font` | 2 | 数字 + HEX + 可选 `serif` | 字号 + 颜色 + 字体族 | 复杂处理 |
| `rotate` | 1 | 数字 | CSS rotate（度） | `transform: rotate(z+'deg')` |
| `scale` | 1 | 数字 | CSS scale | `transform: scale(z)` |
| `border-radius` | 1 | 数字 | 圆角 | `s['border-radius'] = z+'em'` |
| `src` | 1 | 相对路径 | 版头背景图 | 自动拼接附件基础 URL |
| `extendtop` | 1 | 数字 | 向上延伸（em） | 附加 `onload` 脚本 `ubbcode.extendtop.load` |
| `innerHTML` | 特殊 | `$votedata_xxx` | 投票数据注入 | 从 `commonui.vote` 取值 |
| `filter-drop-shadow` | 特殊 | HEX + 数字 × N | CSS drop-shadow | `drop-shadow(x em y em blur spread 色)` |
| `dybg` | 特殊 | 多值 | 动态背景图（鼠标移动时变化） | `background-position` 实时更新 |
| `parentfitwidth` | 0 | 无值 | 自动适应父元素宽度 | `onload` 脚本设置 parent `width`/`height` |
| `aligntobottom` | 0 | 无值 | 绝对定位到底部 | `position:absolute; bottom:0` |
| `randprop` | 0 | 无值 | 随机选择一个 style 块 | 官方用 `Math.random()` 取索引 |

#### 参数解析规则（`paramMode = space`）

token 列表按空格（和逗号）切分后，**遇到已知 key 就切换当前 key**，后续非 key token 作为该 key 的 value：

```
[style left 0.3 top 0 width 19 padding 0 0]
  → left = "0.3"
    top  = "0"
    width = "19"
    padding = "0", padding_1 = "0"    (padding 接受多个值)

[style width 100% align center extendtop 1 src ./mon.webp]
  → width = "100%"
    align = "center"
    extendtop = "1"
    src = "./mon.webp"
```

#### 渲染行为

- 外层：`display: inline-block` 的 `<div>`
- 有 `left`/`top`/`right`/`bottom` 时自动切换为 `position: absolute`
- 有 `src` 时，内部 tag 变为 `<img>` 而非 `<div>`
- 嵌套 `[style]` 叠加应用（内层继承外层位置属性）
- 最终生成的 CSS class 由官方渲染器统一处理

### `[parentfitwidth]...[/parentfitwidth]` 自动适应父元素

| 项 | 说明 |
|----|------|
| 规范名 | `parentfitwidth` |
| 参数模式 | `space` |

无显式参数，渲染时在 `onload` 回调中自动读取子元素尺寸并设置父元素 `width`/`height`。

### `[aligntobottom]...[/aligntobottom]` 贴底对齐

| 项 | 说明 |
|----|------|
| 规范名 | `aligntobottom` |
| 参数 | 无 |

等价于 `[style bottom 0][/style]`。

### `[extendtop N]...[/extendtop]` 向上延伸

| 项 | 说明 |
|----|------|
| 规范名 | `extendtop` |
| 参数 | 数字（em） |

值为 1-5，在内容上方延伸 N em 空间用于视觉过渡。

---

## 预处理移除标签

这两个标签**不会进入 AST**，在预处理阶段直接从文本中删除。

### `[comment 注释内容]` / `[comment // 注释内容]`

| 项 | 说明 |
|----|------|
| 规范名 | `comment` |
| 自闭合 | 是 |
| 预处理移除 | 是 |

**官方实现**：`arg.txt.replace(/\[\/?comment (.+?)\]/g,'')`

写在版头内部用于标注各区块功能，不影响渲染结果。

```
[comment // 参数设定]
[fixsize height 19.3 width 60 153 background transparent transparent]
...
[comment // 背景图]
[style width 100% align center extendtop 1 src ./mon.webp]...[/style]
```

解析后 comment 行已全部消失，只剩 fixsize + style 嵌套。

### `[stripbr]`

| 项 | 说明 |
|----|------|
| 规范名 | `stripbr` |
| 自闭合 | 是 |
| 预处理移除 | 是 |

**官方实现**：`arg.txt.replace(/\[stripbr\][\x00\s]*/g,'')`

版头内部用于强制清除换行（避免 `<br>` 被保留在 style 之间造成多余空白）。纯标记，不影响渲染。

---

## 参数解析规则总结

| 参数形式 | 例子 | 参数解析器 | 适用标签 |
|----------|------|-----------|---------|
| `=值`（整体一个 value） | `[url=http://x]`, `[pid=123,456]` | `parseTagParams` | url, pid, tid, uid, color, size, font, align... |
| `key=value` + 布尔 key | `[td width=80 auto]` | `parseTagParams`（含 `hasKeyValue` 检测） | td, table, list 等 |
| `key val key val` 交替 | `[style left 0.3 top 0]` | `parseSpaceParams`（knownKeys 白名单） | fixsize, style, parentfitwidth |
| 无参数 | `[b]`, `[quote]` | — | 大多数基础标签 |

---

## 特殊标签行为汇总

| 标签 | 内部递归 | 预处理移除 | 自闭合 | 最大嵌套 |
|------|---------|-----------|--------|---------|
| `code` | ❌ rawContent | — | — | — |
| `dice` | ❌ rawContent | — | — | — |
| `crypt` | ❌ rawContent | — | — | — |
| `urlreplace` | ❌ rawContent | — | — | — |
| `quote` | ✅ | — | — | 10 |
| `list` | ✅ | — | — | 5 |
| `fixsize` | ✅ | — | — | 2 |
| `style` | ✅ | — | — | 10 |
| `*` | — | — | ✅ | — |
| `smile` (`[s:1]`) | — | — | ✅ | — |
| `comment` | — | ✅ | ✅ | — |
| `stripbr` | — | ✅ | ✅ | — |

---

## 参考来源

| 文件 | 路径 | 内容 |
|------|------|------|
| 官方主解析器 | `NGA-OFFICIAL-JS/data/bbscode.js` | 5199 行，所有标签的 `ubbcode.xxx.parse` 实现 |
| 论坛扩展 | `NGA-OFFICIAL-JS/data/bbscodeSpec.js` | armory / customachieve 等论坛专属标签 |
| Markdown 转换 | `NGA-OFFICIAL-JS/data/bbscodeMd.js` | MD → BBCode 的反向转换规则 |
| 本模块 | `NGA-BBSCODE-TO-JSON/` | TypeScript + Kotlin 双实现 |
