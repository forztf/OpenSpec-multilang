# 向 OpenSpec CLI 添加差异命令

## 为什么

开发人员需要轻松查看提议的规范变更与当前规范之间的差异，而无需手动比较文件。

## 什么变化

- 添加 `openspec diff [change-name]` 命令，显示变更规范与当前规范之间的差异
- 比较 `changes/[change-name]/specs/` 中的文件与 `specs/` 中的对应文件
- 显示统一差异输出，显示添加/删除/修改的行
- 支持彩色输出以提高可读性

## 影响

- 受影响的规范：将添加新功能 `cli-diff`
- 受影响的代码：
  - `src/cli/index.ts` - 添加差异命令
  - `src/core/diff.ts` - 新文件包含差异逻辑（约 80 行）