## 为什么

需要一个命令按照 OpenSpec 约定将已完成的变更归档到归档文件夹并正确添加日期前缀。目前变更必须手动移动和重命名。

## 什么变化

- 在 CLI 中添加新的 `archive` 命令，将变更移动到 `changes/archive/YYYY-MM-DD-[change-name]/`
- 在归档前检查未完成的任务并警告用户
- 允许交互式选择要归档的变更
- 如果目标目录已存在则防止归档
- 从变更的未来状态规范更新主规范（从 `changes/[name]/specs/` 复制到 `openspec/specs/`）
- 在更新规范前显示确认提示，显示将要创建/更新的规范
- 支持 `--yes` 标志以跳过自动化确认

## 影响

- 受影响的规范：cli-archive（新增）
- 受影响的代码：src/cli/index.ts, src/core/archive.ts（新增）