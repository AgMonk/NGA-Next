# AGENTS 协作铁律

## Worktree 隔离

不同模块在各自独立的 Git worktree 中开发，互不影响主工作区和其他会话。

### worktree 命名与分支

- 每个模块一个 worktree，目录名和分支名统一使用模块短名（去掉 `NGA-` 后小写）。
- worktree 目录放在仓库同级目录，路径：`../<模块短名>`。
- 分支从 `main` 新建，开发完成后合并回 `main`，然后删除分支和 worktree。

```bash
# 创建 worktree（一次性命令，不存在分支则自动创建）
git worktree add ../official-js -b official-js main

# 开发、提交、推送（worktree 目录内操作）
cd ../official-js
git commit -m "official-js: xxx"
git push

# 合并回 main（在主工作区操作）
cd /workspace
git checkout main
git fetch
git merge official-js
git branch -d official-js
git push

# 删除 worktree
git worktree remove ../official-js
```

### 完整对照表

| 模块 | worktree 目录 | 分支名 | commit 前缀 |
|------|--------------|--------|------------|
| NGA-OFFICIAL-JS | `../official-js` | `official-js` | `official-js:` |
| NGA-BBSCODE-TO-JSON | `../bbscode-to-json` | `bbscode-to-json` | `bbscode-to-json:` |
| NGA-BBSCODE-SMILES | `../bbscode-smiles` | `bbscode-smiles` | `bbscode-smiles:` |
| NGA-WEB-API | `../web-api` | `web-api` | `web-api:` |
| NGA-ANDROID-JPC | `../android-jpc` | `android-jpc` | `android-jpc:` |

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
