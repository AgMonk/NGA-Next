# AGENTS 协作铁律

## Commit Message 格式

提交 commit 时，以自己模块名（不含 "NGA" 前缀）作为 commit message 前缀。

```
<模块简称>: <描述>

示例：
official-js: 新增官方 JS 文件归档
bbscode-to-json: 修复加粗标签解析逻辑
bbscode-smiles: 更新表情映射表
web-api: 新增帖子详情接口
android-jpc: 实现首页帖子列表
```

其中模块简称对应关系：

| 完整模块名 | Commit 前缀 |
|-----------|-------------|
| NGA-OFFICIAL-JS | official-js |
| NGA-BBSCODE-TO-JSON | bbscode-to-json |
| NGA-BBSCODE-SMILES | bbscode-smiles |
| NGA-WEB-API | web-api |
| NGA-ANDROID-JPC | android-jpc |
