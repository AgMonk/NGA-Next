# NGA BBCode 渲染效果测试大全

> 本文档包含 NGA 论坛所有 BBCode 标签的可直接复制的示例。
> 每个示例都可以单独复制到论坛发帖框测试渲染效果。
> 所有示例都已用官方 `bbscode.js` 的实际正则/白名单校验过。

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

> ⚠️ 官方不支持 HEX（如 `#ff0000`），只认颜色名；参数必须有等号。非法值渲染为 `/* bbscode color error */`

```
[color=red]红色[/color] [color=blue]蓝色[/color] [color=green]绿色[/color]
[color=orange]橙色[/color] [color=purple]紫色[/color] [color=skyblue]天蓝[/color]
[color=royalblue]宝蓝[/color] [color=darkblue]深蓝[/color]
[color=orangered]橙红[/color] [color=crimson]洋红[/color]
[color=firebrick]砖红[/color] [color=darkred]暗红[/color]
[color=limegreen]青柠绿[/color] [color=seagreen]海绿[/color] [color=teal]青绿[/color]
[color=deeppink]深粉[/color] [color=tomato]番茄[/color] [color=coral]珊瑚[/color]
[color=indigo]靛蓝[/color] [color=burlywood]原木[/color] [color=sandybrown]沙棕[/color]
[color=sienna]赭色[/color] [color=chocolate]巧克力[/color]
[color=yellow]黄色[/color] [color=gold]金色[/color]
[color=black]黑色[/color] [color=white]白色[/color] [color=gray]灰色[/color]
[color=bgred]红底白字[/color] [color=bgblue]蓝底白字[/color] [color=bgblack]黑底白字[/color]
```

### 字号

> 官方只接受数字 + 可选 `%`，其他值渲染为 `/* bbscode size error */`

```
[size=50]50% 小[/size] 正常 [size=150]150% 大[/size] [size=200]200% 超大[/size]
```

### 字体（仅 17 种白名单可用）

> ⚠️ 官方只有以下 17 种字体可用，其他值渲染为 `/* bbscode font error */`
> 注意：`微软雅黑`、`等宽字体` 等不在白名单里！

**合法值**（来源：`bbscode.js` 行 3351）：

| 值 | 显示名 |
|----|--------|
| `simsun` | 宋体 |
| `simhei` | 黑体 |
| `Arial` | Arial |
| `Arial Black` | Arial Black |
| `Book Antiqua` | Book Antiqua |
| `Century Gothic` | Century Gothic |
| `Comic Sans MS` | Comic Sans MS |
| `Courier New` | Courier New |
| `Georgia` | Georgia |
| `Impact` | Impact |
| `Tahoma` | Tahoma |
| `Times New Roman` | Times New Roman |
| `Trebuchet MS` | Trebuchet MS |
| `Script MT Bold` | Script MT Bold |
| `Stencil` | Stencil |
| `Verdana` | Verdana |
| `Lucida Console` | Lucida Console |

```
[font=simsun]宋体 simsun[/font]
[font=simhei]黑体 simhei[/font]
[font=Arial]Arial[/font]
[font=Georgia]Georgia[/font]
[font=Courier New]Courier New[/font]
[font=Times New Roman]Times New Roman[/font]
[font=Verdana]Verdana[/font]
[font=Impact]Impact[/font]
```

### 对齐

```
[align=center]居中对齐[/align]
[align=right]右对齐[/align]
[align=left]左对齐[/align]
[align=justify]两端对齐[/align]
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

### 图片（官方正则 `\[img(-?\d{0,3})\]...\[/img\]`）

> ⚠️ **开标签**参数直接跟标签名、不带等号；但**闭标签永远是 `[/img]`！**
> 正确写法：`[img-1]url[/img]` ✅
> 错误写法：`[img-1]url[/img-1]` ❌ 闭标签带参数会匹配失败

```
[img]https://img.nga.cn/attachments/mon_202611/14/-bqqbQ39-fpquKzT3cSsg-iy.jpg[/img]

[img-1]https://img.nga.cn/attachments/mon_202607/21/-bqqbQ40-40jvK11T1kScb-am.jpg[/img]
```

### Flash / Media 视频

> 官方统一正则 `\[(flash|media)(?:=(video|audio))?\]...\[/\1\]`
> 参数只能是 `=video` 或 `=audio`（或省略），然后内部按 URL 域名匹配具体播放器
> 支持的视频源：bilibili / b23.tv / youku / acfun / 腾讯视频 / 乐视 / pptv / 163 / 战旗直播 / 火猫直播 等

```
[flash=video]https://www.bilibili.com/video/BV1Zb4y1q7j3[/flash]
[flash]https://b23.tv/eVBgYQM[/flash]
[media=video]https://www.bilibili.com/video/av170001[/media]
[media]https://live.bilibili.com/live/123456[/media]
```

### Iframe 嵌入

> 参数 `=宽,高`，逗号分隔；等号可选；**开/闭标签都不带参数**（闭标签永远是 `[/iframe]`）
> ⚠️ 有 `checkIframeTable` **host 白名单机制**：
> - 白名单内的 host → 直接渲染 `<iframe>`
> - 白名单外的 host → 渲染成"点击显示页面"按钮（manual load，需用户点击才加载）
>
> 白名单由运行时 `commonui.checkIframeTable` 注入，通常包含 NGA 内部工具页

```
[iframe=800,600]https://gfl-pick.pages.dev[/iframe]
```

### 相册

```
[album]相册标题[/album]
[album=相册标题]https://img.nga.cn/attachments/mon_202611/14/-bqqbQ39-fpquKzT3cSsg-iy.jpg https://img.nga.cn/attachments/mon_202607/21/-bqqbQ40-40jvK11T1kScb-am.jpg[/album]
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

### 附件

```
[attach]attach_name[/attach]
```

### URL 替换

```
[urlreplace=http://old.example.com,http://new.example.com]原帖链接里的老域名[/urlreplace]
```

---

## 全标签大全（一键复制）

> 下面这段包含了以上所有标签的示例，可以直接复制到论坛发帖框查看渲染效果。
> 部分标签（`[crypt]` 加密、`[dice]` 骰子等）需要后端/特定上下文才会触发。
> `[iframe]` 需要白名单 host 才渲染。

```
[b]加粗[/b] [i]斜体[/i] [u]下划线[/u] [del]删除线[/del] [sup]上标[/sup] [sub]下标[/sub]

[color=red]红[/color] [color=blue]蓝[/color] [color=green]绿[/color] [color=purple]紫[/color] [color=bgred]红底白字[/color]

[size=150]大字号[/size] [size=50]小字号[/size]

[font=simsun]宋体[/font] [font=simhei]黑体[/font] [font=Arial]Arial[/font] [font=Georgia]Georgia[/font]

[align=center]居中对齐[/align]

[url=https://www.nga.cn]NGA 论坛[/url]
[tid=12345678]主题标题[/tid]
[pid=98765432,5]回复标题[/pid]
[fid=4]魔兽世界[/fid]
[uid=123456]用户名[/uid]
[@用户名]

[quote]引用块内容[/quote]

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

[img]https://img.nga.cn/attachments/mon_202611/14/-bqqbQ39-fpquKzT3cSsg-iy.jpg[/img]
[img-1]https://img.nga.cn/attachments/mon_202607/21/-bqqbQ40-40jvK11T1kScb-am.jpg[/img]

[flash=video]https://www.bilibili.com/video/BV1Zb4y1q7j3[/flash]

[iframe=800,600]https://gfl-pick.pages.dev[/iframe]

[collapse=点击展开]隐藏的折叠内容[/collapse]

[code]
var x = 1;
[/code]

[code=javascript]
function hello() { return "world"; }
[/code]

[s:1] [s:2] [s:ac:goodjob] [s:ac:blink]

[dice]3d6[/dice]

[h]小标题[/h]
```

---

## 备注与已知限制

### 参数规则（按官方 `bbscode.js` 正则）

| 模式 | 合法示例 | 说明 |
|------|---------|------|
| 必须有等号 | `[color=red]` `[size=150]` `[url=xxx]` | color 等，等号不可省略 |
| 必须无等号 | `[img-1]` `[img123]` | img 直接跟数字，等号会报错 |
| 等号可选 | `[tid123]` `[tid=123]` / `[td width80]` `[td width=80]` | tid/pid/fid/stid + td/tr/table 的大部分属性 |
| 固定值白名单 | `[color=red]` / `[font=Arial]` | 颜色 25 种、字体 17 种，超范围渲染为 error 注释 |
| 固定参数值 | `[flash=video]` / `[media=audio]` | 只能是 video 或 audio |
| 固定单字符 | `[list=1]` | 等号 + 单个字符（列表序号类型） |

### 标签闭合规则

> ⚠️ **重要**：BBCode 闭标签格式永远是 `[/tagname]`，**不带参数**！即使开标签带了参数，闭标签也不变。
>
> | 开标签 | 正确闭标签 | 错误闭标签 |
> |--------|-----------|-----------|
> | `[img-1]` | `[/img]` ✅ | `[/img-1]` ❌ |
> | `[img123]` | `[/img]` ✅ | `[/img123]` ❌ |
> | `[color=red]` | `[/color]` ✅ | — |
> | `[iframe=500,300]` | `[/iframe]` ✅ | — |

### 渲染外部依赖

- **iframe**：有 `checkIframeTable` host 白名单，不在白名单的 host → 渲染成"点击显示页面"按钮
- **flash/media**：内部按 URL 域名匹配特定视频播放器（bilibili/youku/腾讯视频等），普通 mp3/mp4 链接不会自动播放
- **crypt**：需要客户端/后端配合解密，纯前端 BBCode 渲染不会自动解开
- **dice**：需要后端或客户端 JS 执行骰子逻辑

### 非用户标签

以下标签**不能手动使用**，由后端/客户端自动插入：
- `[lessernuke]` — 处罚遮罩（后端在 `arg.isNukePost` 时自动注入）
- `[urlreplace]` — 版本兼容替换规则（后端预处理）
- `[comment]` — 注释标签（渲染前被 `secureText` 移除）

### 参考来源

- `NGA-OFFICIAL-JS/data/bbscode.js` （主替换链 + 参数正则）
- `NGA-OFFICIAL-JS/data/bbscodeSpec.js`（尺寸容器）
- `NGA-OFFICIAL-JS/data/bbscodeMd.js` （md→bb 预处理）
- 字体白名单：`bbscode.js` 行 3351
- 颜色白名单：`bbscode.js` 行 3339
- flash/media 域名匹配：`bbscode.js` 行 3656-3681
- iframe host 白名单：`bbscode.js` 行 756 + `commonui.checkIframeTable`
