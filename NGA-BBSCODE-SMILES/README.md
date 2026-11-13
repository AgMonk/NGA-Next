# NGA-BBSCODE-SMILES

从 NGA 官方 JS 源文件 `NGA-OFFICIAL-JS/data/bbscode.js` 提取表情分组数据。

## 目录结构

```
NGA-BBSCODE-SMILES/
├── README.md                   # 本文件
├── data/
│   ├── groups.json             # 表情分组 JSON（机器可读）
│   └── groups.md               # 表情分组 Markdown（人工查阅）
└── scripts/
    └── parse_smiles.py         # 解析脚本
```

## 数据格式

`groups.json` 示例：

```json
{
  "0": {
    "name": "默认",
    "smiles": [
      {
        "code": "[s::1]",
        "url": "https://img4.nga.cn/ngabbs/post/smile/smile.gif",
        "note": null
      }
    ]
  },
  "a2": {
    "name": "AC娘(v2)",
    "smiles": [
      {
        "code": "[s:a2:异议]",
        "url": "https://img4.nga.cn/ngabbs/post/smile/a2_47.png",
        "note": "逆转裁判"
      }
    ]
  }
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | string | 正文编辑器点击表情时实际输出的 UBB code，可直接复制粘贴使用。格式规则：默认分组 key=`"0"` 时为 `[s::<表情key>]`；其他分组为 `[s:<分组key>:<表情key>]`。生成逻辑见 `scripts/parse_smiles.py`，实现参考 `NGA-OFFICIAL-JS/data/post.js` 第 640/652 行。 |
| `url` | string | 表情图片的完整绝对地址。基础路径硬编码为 `https://img4.nga.cn/ngabbs` — bbscode.js 中的 `__IMGPATH` 变量是过时的旧值 `http://img4.ngacn.cc/ngabbs`，线上运行时会被 `commonSpec.js` 替换为新域名。 |
| `note` | string \| null | 行尾 `//` 注释中的描述文字。例如 `//"逆转裁判"` 会被提取为 `"逆转裁判"`；无注释则为 `null`。 |

## 手动执行

```bash
python3 NGA-BBSCODE-SMILES/scripts/parse_smiles.py

# 可选：自定义输入/输出路径
python3 NGA-BBSCODE-SMILES/scripts/parse_smiles.py \
  --input path/to/bbscode.js \
  --output-dir path/to/output
```

## GitHub Actions

工作流文件：`.github/workflows/smiles-sync.yml`

- **触发条件**：
  - `push` 到 `main` 且变更了 `NGA-OFFICIAL-JS/data/bbscode.js`
  - 手动触发（`workflow_dispatch`）
- **不做定时触发**（本模块依赖上游文件变更信号即可）
- **Git 身份**：`bbscode-smiles-bot <41898282+github-actions[bot]@users.noreply.github.com>`
- **Commit 前缀**：`bbscode-smiles:`（遵循仓库 AGENTS.md 约定）
- **无变化自动跳过**：`groups.json` 和 `groups.md` 均无 diff 时不产生空 commit
