# NGA BBCode 渲染效果测试大全

> 本文档包含 NGA 论坛所有 BBCode 标签的可直接复制的示例。
> 每个示例都可以单独复制到论坛发帖框测试渲染效果。

---

## APP 端支持情况（实测）

> 以下为 NGA 客户端（APP）实测结果，与网页端存在差异。
> **标记 ❌ 的用法在 APP 中会原样输出 BBCode 标签，或降级渲染。**

| 用法 | APP 表现 | 结论 |
|------|---------|------|
| `[tid=123]` / `[pid=123,5]`（带等号） | 正常超链接 | ✅ |
| `[tid123]` / `[pid123,5]`（无等号） | 原样输出 BBCode | ❌ |
| `[fid=4]` / `[stid=100]` / `[uid=123]` | 原样输出 BBCode | ❌ |
| `[@用户名]` | 纯文本，不可点击 | ❌ |
| `[url=...]文字[/url]` | 正常超链接 | ✅ |
| `[url]https://...[/url]`（无参数形式） | 未生成超链接 | ❌ |
| `[list]` 无序列表 | 正常 | ✅ |
| `[list=1]` 有序列表 | 渲染为圆点，不是数字 | ❌ |
| 嵌套 `[list]` | 不缩进，层级被拉平 | ❌ |
| `[table]` / `[tr]` / `[td]` | 正常渲染 | ✅ |
| `[td width=120]` 单元格宽度 | 未生效，列宽错乱 | ❌ |
| `[tr th]` 表头 | 原样输出 BBCode | ❌ |
| `[table width=600]` | 整个表格原样输出 | ❌ |
| `[img]url[/img]` | 正常显示 | ✅ |
| `[img-1]` / `[img123]`（带参数） | 原样输出 BBCode | ❌ |
| `[flash=video]url[/flash]` | 原样输出 BBCode | ❌ |
| `[attach]...[/attach]` | 原样输出 BBCode | ❌ |
| `[collapse]` / `[collapse=标题]` | 正常折叠 | ✅ |
| `[randomblock]` | 原样输出 BBCode | ❌ |
| `[code]` / `[code=python]` | 标签被剥离，无代码框与高亮 | ❌ |
| `[crypt]` | 原样输出 BBCode | ❌ |
| `[dice]` | 正常掷骰 | ✅ |
| `[h]` | 降级为加粗文本 | ⚠️ |
| `[s:1]` / `[s:ac:中文]` | 正常显示表情图 | ✅ |
| `[b][i][u][del][sup][sub]` | 正常 | ✅ |
| `[color=...]`（白名单）/ `bg` 前缀 | 正常 | ✅ |
| `[size=50/150/200]` | 正常 | ✅ |
| `[align=left/right/center]` | 正常 | ✅ |
| `[font=...]` | 标签生效，但移动端缺字体时视觉无差异 | ⚠️ |
| `[media=audio/video]` | 未实测（推测原样输出） | ⚠️ |
| `[iframe=w,h]` | 未实测（网页端还需域名白名单） | ⚠️ |
| `[lessernuke]` | 非普通帖子标签，原样输出 | ❌ |
| `[urlreplace]` | 特殊功能，普通回复原样输出 | ❌ |

---

## 目录

- [基础样式](#基础样式)
- [链接与内部](#链接与内部)
- [引用与列表](#引用与列表)
- [表格](#表格)
- [媒体](#媒体)
- [折叠与随机](#折叠与随机)
- [代码与加密](#代码与加密)
- [表情](#表情)
- [其他功能](#其他功能)
- [版头与高级布局](#版头与高级布局)
- [全标签大全（一键复制）](#全标签大全一键复制)

---

## 基础样式

### 加粗、斜体、下划线、删除线、上下标

```
[b]加粗文本[/b]
[i]斜体文本[/i]
[u]下划线文本[/u]
[del]删除线文本[/del]
[sup]上标文本[/sup]
[sub]下标文本[/sub]
```

### 嵌套样式

```
[b][i]粗斜体[/i] 再粗 [/b]
[b][i][u]粗斜下划线[/u][/i][/b]
```

### 文字颜色（25 种官方白名单颜色）

> ⚠️ 官方正则：`/^(bg)?(skyblue|royalblue|blue|darkblue|orange|orangered|crimson|red|firebrick|darkred|green|limegreen|seagreen|teal|deeppink|tomato|coral|purple|indigo|burlywood|sandybrown|sienna|chocolate|silver|gray)\s*$/i`
> 不在白名单里的值（如 `yellow`/`gold`/`black`/`white`）渲染为 `/* bbscode color error */`
> `bg` 前缀 + 白名单颜色名 = 背景色（如 `bgred` ✅ `bgblack` ❌ 因为 black 不在白名单）

```
[color=skyblue]天蓝skyblue[/color] [color=royalblue]宝蓝royalblue[/color]
[color=blue]蓝blue[/color] [color=darkblue]深蓝darkblue[/color]

[color=orange]橙orange[/color] [color=orangered]橙红orangered[/color] [color=crimson]洋红crimson[/color]

[color=red]红red[/color] [color=firebrick]砖红firebrick[/color] [color=darkred]暗红darkred[/color]

[color=green]绿green[/color] [color=limegreen]青柠limegreen[/color] [color=seagreen]海绿seagreen[/color] [color=teal]青绿teal[/color]

[color=deeppink]深粉deeppink[/color] [color=tomato]番茄tomato[/color] [color=coral]珊瑚coral[/color]

[color=purple]紫purple[/color] [color=indigo]靛蓝indigo[/color]

[color=burlywood]原木burlywood[/color] [color=sandybrown]沙棕sandybrown[/color] [color=sienna]赭sienna[/color] [color=chocolate]巧克力chocolate[/color]

[color=silver]银灰silver[/color] [color=gray]灰gray[/color]

[color=bgred]红底bgred[/color] [color=bgblue]蓝底bgblue[/color] [color=bgsilver]银底bgsilver[/color] [color=bgdarkred]暗红底bgdarkred[/color]
```

### 字号

```
[size=50]50% 小[/size] 正常 [size=150]150% 大[/size] [size=200]200% 超大[/size]
```

### 字体

> 官方白名单 17 种：`simsun` / `simhei` / `Arial` / `Arial Black` / `Book Antiqua` / `Century Gothic` / `Comic Sans MS` / `Courier New` / `Georgia` / `Impact` / `Tahoma` / `Times New Roman` / `Trebuchet MS` / `Script MT Bold` / `Stencil` / `Verdana` / `Lucida Console`
> 不在白名单的字体名渲染为 `/* bbscode font error */`
> ⚠️ **APP 实测**：标签本身生效，但移动端通常未安装这些字体，视觉上基本无差异

```
[font=simsun]simsun 宋体[/font]
[font=simhei]simhei 黑体[/font]
[font=Arial]Arial[/font]
[font=Georgia]Georgia[/font]
[font=Courier New]Courier New[/font]
```

### 对齐

> ⚠️ 官方正则 `/^(left|right|center)\s*$/i`，**只认这三个值**，`justify` 会渲染为 `/* bbscode align error */`

```
[align=center]居中对齐[/align]
[align=right]右对齐[/align]
[align=left]左对齐[/align]
```

---

## 链接与内部

### 超链接

> ❌ **APP 实测**：`[url]https://...[/url]` 无参数形式不生成超链接，只有 `[url=...]文字[/url]` 可用

```
[url=https://www.nga.cn]NGA 论坛[/url]
[url]https://www.nga.cn[/url]
```

### 内部链接（主题、回复、版面、合集）

> 等号可选，官方正则 `(tid|pid|fid|stid)=?(\d+)`
> ❌ **APP 实测**：只有 `[tid=123]` / `[pid=123,5]` 可用；无等号形式、`[fid=]`、`[stid=]` 全部原样输出

```
[tid=12345678]主题标题[/tid]
[tid12345678]无等号也支持[/tid]

[pid=98765432,5]回复标题[/pid]
[pid98765432,5]无等号[/pid]

[fid=4]版区链接（显示数字）[/fid]
[fid=4]魔兽世界[/fid]

[stid=100]合集链接[/stid]
```

### 用户链接与 @提及

> ❌ **APP 实测**：`[uid=123456]` 原样输出；`[@用户名]` 渲染为纯文本、不可点击

```
[uid=123456]用户名[/uid]
[@用户名]
```

---

## 引用与列表

### 引用块

```
[quote]这是一段引用内容[/quote]
```

### 嵌套引用

```
[quote]外层引用 [quote]内层引用[/quote] 回到外层[/quote]
```

### 无序列表

```
[list]
[*]第一项
[*]第二项
[*]第三项
[/list]
```

### 有序列表

> ❌ **APP 实测**：`[list=1]` 渲染为圆点（无序），不显示数字序号

```
[list=1]
[*]第一项
[*]第二项
[*]第三项
[/list]
```

### 多层嵌套列表

> ❌ **APP 实测**：嵌套层级被拉平，子项与根项同缩进

```
[list]
[*]根项 1
[list=1]
[*]子项 1-1
[*]子项 1-2
[/list]
[*]根项 2
[/list]
```

---

## 表格

### 基本表格（等号可选！）

> 官方正则：`width=?(auto|\d+)`、`colspan=?\d+`、`rowspan=?\d+`
> ❌ **APP 实测**：`[td width=120]` 宽度未生效，列宽会挤在一起错乱

```
[table]
[tr]
[td width=120]第一列[/td]
[td width=120]第二列[/td]
[td]第三列[/td]
[/tr]
[tr]
[td width=120]宽度有等号[/td]
[td width120]宽度无等号[/td]
[td]普通[/td]
[/tr]
[/table]
```

### 合并单元格

```
[table]
[tr]
[td colspan3]这一格跨三列（等号可选：colspan3 或 colspan=3）[/td]
[/tr]
[tr]
[td rowspan=2]跨两行 A[/td]
[td]B1[/td]
[td]C1[/td]
[/tr]
[tr]
[td]B2[/td]
[td]C2[/td]
[/tr]
[/table]
```

### 对齐 + 关键字 top

```
[table]
[tr]
[td top]top 关键字（单元格内元素顶部对齐）[/td]
[td width=80]普通单元格[/td]
[/tr]
[/table]
```

### 表头（th 关键字）

> ❌ **APP 实测**：`[tr th]` 原样输出 BBCode，表头样式不生效

```
[table]
[tr th]
[td]表头列 1[/td]
[td]表头列 2[/td]
[td]表头列 3[/td]
[/tr]
[tr]
[td]数据 1[/td]
[td]数据 2[/td]
[td]数据 3[/td]
[/tr]
[/table]
```

### 表格宽度

> ❌ **APP 实测**：`[table width=600]` / `[table width600]` 整块原样输出 BBCode

```
[table width=600]
[tr][td]等号宽度[/td][td]600px[/td][/tr]
[/table]

[table width600]
[tr][td]无等号也支持[/td][td]600px[/td][/tr]
[/table]
```

---

## 媒体

### 图片（官方正则 `\[img(-?\d{0,3})\]`）

> ⚠️ 参数直接跟标签名，**不带等号**！`[img-1]` `[img]` `[img123]` 都合法
> ❌ **APP 实测**：只有 `[img]` 可用；`[img-1]` / `[img123]` 带参数形式会原样输出 BBCode

```
[img]https://img4.nga.178.com/ngaweb/photo/2024/1201/abc123.jpg[/img]
[img-1]https://img4.nga.178.com/ngaweb/photo/2024/1201/abc123.jpg[/img]
[img123]https://img4.nga.178.com/ngaweb/photo/2024/1201/abc123.jpg[/img]
```

### Flash 视频

> 参数固定是 `=video`（不是宽高！）
> ❌ **APP 实测**：`[flash=video]` 原样输出 BBCode，不播放

```
[flash=video]https://example.com/video.swf[/flash]
```

### 多媒体（音频/视频）

> 参数固定是 `=audio` 或 `=video`
> ⚠️ **APP 未实测**：推测与 `flash` 一样原样输出，建议改用 `[attach]` 或链接

```
[media=audio]https://example.com/music.mp3[/media]
[media=video]https://example.com/player.html[/media]
```

### Iframe 嵌入

> 参数是 `=宽,高`，逗号分隔，等号可选
> ⚠️ **APP 未实测**：网页端还需域名白名单，APP 大概率原样输出

```
[iframe=500,300]https://example.com/embed[/iframe]
```

### 相册

```
[album]相册标题[/album]
[album=相册标题]http://img1.jpg http://img2.jpg http://img3.jpg[/album]
```

---

## 折叠与随机

### 折叠块

```
[collapse]默认折叠[/collapse]
[collapse=点击展开标题]隐藏的内容[/collapse]
```

### 随机显示

> ⚠️ 官方 `randomblock` 内部的内容**不会展开 `[*]` 标签**，直接写普通文本即可
> 只有一个内部节点会被随机选中显示
> ❌ **APP 实测**：整个 `[randomblock]` 连同闭标签原样输出，不随机

```
[randomblock]
选项 A - 幸运儿
选项 B - 可能是我
选项 C - 也有可能是这个
[/randomblock]
```

---

## 代码与加密

### 代码块

> ❌ **APP 实测**：`[code]` / `[code=javascript]` / `[code=python]` 标签被剥离，只输出纯文本，无代码框、无语法高亮

```
[code]
var x = 1;
function hello() { return "world"; }
[/code]

[code=javascript]
var x = 1;
function hello() { return "world"; }
[/code]

[code=python]
def hello():
    return "world"
[/code]
```

### 密码保护

> ❌ **APP 实测**：`[crypt]` 原样输出 BBCode，不解密

```
[crypt]加密内容[/crypt]
```

---

## 表情

> 官方表情正则 `/\[s:(.{1,10}?)\]/gi`。数字表情格式 `[s:编号]`，分组表情格式 `[s:分组:名字]`。
> ⚠️ **AC 娘分组表情名是中文**，不是英文！`confused`/`mad`/`cry` 等英文不存在，会残留为原始标签不渲染。

### 数字表情（默认分组）

```
[s:1] [s:2] [s:3] [s:4] [s:5] [s:6] [s:7] [s:8]
```

### AC 娘分组（中文表情名，官方 45 种）

```
[s:ac:blink] [s:ac:goodjob] [s:ac:上] [s:ac:中枪] [s:ac:偷笑]
[s:ac:冷] [s:ac:凌乱] [s:ac:吓] [s:ac:吻] [s:ac:呆]
[s:ac:哭] [s:ac:哭1] [s:ac:哭笑] [s:ac:喘] [s:ac:心]
[s:ac:囧] [s:ac:晕] [s:ac:汗] [s:ac:羞] [s:ac:羡慕]
[s:ac:委屈] [s:ac:忧伤] [s:ac:怒] [s:ac:怕] [s:ac:惊]
[s:ac:愁] [s:ac:抓狂] [s:ac:哼] [s:ac:喷] [s:ac:无语]
[s:ac:衰] [s:ac:花痴] [s:ac:闪光] [s:ac:擦汗] [s:ac:茶]
[s:ac:计划通] [s:ac:反对] [s:ac:赞同]
```

### 官方分组一览

| 分组 key | 显示名 | 数量 | 说明 |
|----------|--------|------|------|
| `0` | 默认 | 27 | 纯编号 `[s:1]`~`[s:27]` |
| `ac` | AC娘(v1) | 45 | 中文表情名 |
| `a2` | — | — | — |
| `ng` | NG娘 | 34 | — |
| `pst` | — | — | — |
| `dt` | — | — | — |
| `pg` | — | — | — |

---

## 其他功能

### 骰子

```
[dice]3d6[/dice]
[dice]2d20+5[/dice]
[dice]1d100[/dice]
```

### 小标题

> ⚠️ **APP 实测**：降级为加粗文本，无明显标题样式

```
[h]这是小标题[/h]
```

### 处罚遮罩

> ❌ **不支持**：`lessernuke` 不在普通帖子的解析正则里，任何端都原样输出

```
[lessernuke]这行内容会被遮罩[/lessernuke]
```

### 附件

> ❌ **APP 实测**：`[attach]` 原样输出 BBCode，不解析附件

```
[attach]attach_name[/attach]
```

### URL 替换

> ❌ **不支持**：`urlreplace` 只在特定处理流程生效，普通帖子原样输出

```
[urlreplace=http://old.example.com,http://new.example.com]原帖链接里的老域名[/urlreplace]
```

---

## 版头与高级布局

> 这些标签主要用于版头（版面公告），普通帖子里**原样输出不生效**，APP 同样不解析。

### 固定尺寸容器

```
[fixsize height 60 width 500]
这是固定宽高的容器
[/fixsize]

[fixsize height 40 width 400 maxW 500 background red]
带背景色的容器
[/fixsize]
```

### 样式容器

```
[style width 500 height 80 background #333 color #fff padding 10 border 1px solid #666]
自定义样式区域
[/style]
```

### 自动适应父元素宽度

```
[parentfitwidth]宽度自动跟随父元素[/parentfitwidth]
```

### 贴底对齐

```
[aligntobottom]这行文字会贴着容器底部[/aligntobottom]
```

### 向上延伸

```
[extendtop 200]从上方延伸 200px 的元素[/extendtop]
```

---

## 全标签大全（一键复制）

> 下面这段包含了以上所有标签的示例，可以直接复制到论坛发帖框查看渲染效果。
> 部分标签（版头专用、加密、骰子等）可能需要特定上下文才会触发。
> ⚠️ 其中 `[fid]`/`[stid]`/`[uid]`/`[img-1]`/`[flash]`/`[attach]`/`[randomblock]`/`[code]`/`[crypt]`/`[lessernuke]` 在 APP 端会原样输出，详见文首「APP 端支持情况」。

```
[b]加粗[/b] [i]斜体[/i] [u]下划线[/u] [del]删除线[/del] [sup]上标[/sup] [sub]下标[/sub]

[color=skyblue]天蓝[/color] [color=royalblue]宝蓝[/color] [color=blue]蓝[/color] [color=darkblue]深蓝[/color]
[color=orange]橙[/color] [color=orangered]橙红[/color] [color=crimson]洋红[/color]
[color=red]红[/color] [color=firebrick]砖红[/color] [color=darkred]暗红[/color]
[color=green]绿[/color] [color=limegreen]青柠[/color] [color=seagreen]海绿[/color] [color=teal]青绿[/color]
[color=deeppink]深粉[/color] [color=tomato]番茄[/color] [color=coral]珊瑚[/color]
[color=purple]紫[/color] [color=indigo]靛蓝[/color]
[color=burlywood]原木[/color] [color=sandybrown]沙棕[/color] [color=sienna]赭[/color] [color=chocolate]巧克力[/color]
[color=silver]银灰[/color] [color=gray]灰[/color]
[color=bgred]红底[/color] [color=bgblue]蓝底[/color] [color=bgsilver]银底[/color]

[size=150]大字号[/size] [font=simsun]simsun[/font] [font=Arial]Arial[/font]

[align=center]居中[/align]

[url=https://www.nga.cn]NGA[/url]
[tid=12345678]主题标题[/tid]
[pid=98765432,5]回复标题[/pid]
[fid=4]魔兽世界[/fid]
[uid=123456]用户名[/uid]
[@用户名]

[quote]引用块[/quote]

[list]
[*]无序 1
[*]无序 2
[/list]

[list=1]
[*]有序 1
[*]有序 2
[/list]

[table]
[tr th]
[td]表头 1[/td]
[td]表头 2[/td]
[/tr]
[tr]
[td width=100]等号宽度[/td]
[td width100]无等号宽度[/td]
[/tr]
[tr]
[td colspan2]colspan=2[/td]
[/tr]
[/table]

[img]https://img4.nga.178.com/ngaweb/photo/2024/1201/abc123.jpg[/img]
[img-1]https://img4.nga.178.com/ngaweb/photo/2024/1201/abc123.jpg[/img]
[iframe=500,300]https://example.com/embed[/iframe]
[media=audio]https://example.com/music.mp3[/media]
[media=video]https://example.com/player.html[/media]
[album=相册标题]http://img1.jpg http://img2.jpg[/album]

[collapse=折叠标题]隐藏内容[/collapse]

[code]
var x = 1;
[/code]

[code=javascript]
function hello() { return "world"; }
[/code]

[s:1] [s:2] [s:ac:blink] [s:ac:goodjob] [s:ac:囧] [s:ac:怒] [s:ac:茶]

[dice]3d6[/dice]

[h]小标题[/h]

[lessernuke]被遮罩的内容[/lessernuke]
```

---

## 备注

- 颜色参数必须带等号：`[color=red]` ✅ / `[color red]` ❌
- 图片参数不带等号：`[img-1]` ✅ / `[img=-1]` ❌
- `td width` / `table width` 等号可选：`[td width80]` / `[td width=80]` 都合法
- `tid` / `pid` 等号可选：`[tid123]` / `[tid=123]` 都合法
- `flash` / `media` 参数是 `=video` / `=audio`，不是宽高
- 版头相关标签（`fixsize` / `style` 等）仅在 `isBlock && opt & 1` 场合生效，普通帖子可能不渲染
- 参考来源：`NGA-OFFICIAL-JS/data/bbscode.js`、`bbscodeSpec.js`、`bbscodeMd.js`
