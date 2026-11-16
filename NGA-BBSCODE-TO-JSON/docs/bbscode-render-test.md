# NGA BBCode 渲染效果测试大全

> 本文档包含 NGA 论坛所有 BBCode 标签的可直接复制的示例。
> 每个示例都可以单独复制到论坛发帖框测试渲染效果。

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

### 文字颜色（25 种官方颜色名）

> ⚠️ 官方不支持 HEX（如 `#ff0000`），只认颜色名；参数必须有等号

```
[color=red]红色[/color] [color=blue]蓝色[/color] [color=green]绿色[/color]
[color=orange]橙色[/color] [color=purple]紫色[/color] [color=skyblue]天蓝[/color]
[color=royalblue]宝蓝[/color] [color=darkblue]深蓝[/color]
[color=orangered]橙红[/color] [color=crimson]洋红[/color]
[color=firebrick]砖红[/color] [color=darkred]暗红[/color]
[color=limegreen]青柠绿[/color] [color=seagreen]海绿[/color] [color=teal]青绿[/color]
[color=yellow]黄色[/color] [color=gold]金色[/color]
[color=black]黑色[/color] [color=white]白色[/color] [color=gray]灰色[/color]
[color=bgred]红底白字[/color] [color=bgblue]蓝底白字[/color]
```

### 字号

```
[size=50]50% 小[/size] 正常 [size=150]150% 大[/size] [size=200]200% 超大[/size]
```

### 字体

```
[font=微软雅黑]微软雅黑[/font]
[font=宋体]宋体[/font]
[font=黑体]黑体[/font]
[font=等宽字体]等宽字体[/font]
```

### 对齐

```
[align=center]居中对齐[/align]
[align=right]右对齐[/align]
[align=left]左对齐[/align]
```

---

## 链接与内部

### 超链接

```
[url=https://www.nga.cn]NGA 论坛[/url]
[url]https://www.nga.cn[/url]
```

### 内部链接（主题、回复、版面、合集）

> 等号可选，官方正则 `(tid|pid|fid|stid)=?(\d+)`

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

```
[list=1]
[*]第一项
[*]第二项
[*]第三项
[/list]
```

### 多层嵌套列表

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

```
[img]https://img4.nga.178.com/ngaweb/photo/2024/1201/abc123.jpg[/img]
[img-1]https://img4.nga.178.com/ngaweb/photo/2024/1201/abc123.jpg[/img]
[img123]https://img4.nga.178.com/ngaweb/photo/2024/1201/abc123.jpg[/img]
```

### Flash 视频

> 参数固定是 `=video`（不是宽高！）

```
[flash=video]https://example.com/video.swf[/flash]
```

### 多媒体（音频/视频）

> 参数固定是 `=audio` 或 `=video`

```
[media=audio]https://example.com/music.mp3[/media]
[media=video]https://example.com/player.html[/media]
```

### Iframe 嵌入

> 参数是 `=宽,高`，逗号分隔，等号可选

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

> 只有一个内部节点会被随机选中显示

```
[randomblock]
[*]选项 A
[*]选项 B
[*]选项 C
[/randomblock]
```

---

## 代码与加密

### 代码块

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

```
[crypt]加密内容[/crypt]
```

---

## 表情

### 数字表情

```
[s:1] [s:2] [s:3] [s:ac:goodjob] [s:ac:confused]
```

### 常见表情分组示例

> 官方有 15+ 分组，可在论坛发帖框表情面板查看具体列表

```
[s:ac:goodjob]   [s:ac:confused]   [s:ac:ohno]   [s:ac:blink]
[s:ac:cry]       [s:ac:mad]       [s:ac:lol]    [s:ac:go]
```

---

## 其他功能

### 骰子

```
[dice]3d6[/dice]
[dice]2d20+5[/dice]
[dice]1d100[/dice]
```

### 小标题

```
[h]这是小标题[/h]
```

### 处罚遮罩

```
[lessernuke]这行内容会被遮罩[/lessernuke]
```

### 附件

```
[attach]attach_name[/attach]
```

### URL 替换

```
[urlreplace=http://old.example.com,http://new.example.com]原帖链接里的老域名[/urlreplace]
```

---

## 版头与高级布局

> 这些标签主要用于版头（版面公告），普通帖子里可能不生效。

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

```
[b]加粗[/b] [i]斜体[/i] [u]下划线[/u] [del]删除线[/del] [sup]上标[/sup] [sub]下标[/sub]

[color=red]红[/color] [color=blue]蓝[/color] [color=green]绿[/color] [color=bgred]红底白字[/color]

[size=150]大字号[/size] [font=微软雅黑]微软雅黑[/font]

[align=center]居中对齐[/align]

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

[s:1] [s:2] [s:ac:goodjob] [s:ac:blink]

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
