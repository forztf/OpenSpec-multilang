# 为 OpenSpec 变更采用未来状态存储

## 为什么

当前将规范变更存储为差异文件（`.spec.md.diff`）的方式对人类和 AI 都造成了困扰。带有 `+` 和 `-` 前缀的差异语法使规范难以阅读，AI 工具在理解未来状态时难以处理这种格式，GitHub 也无法在不同文件夹中的当前和提议规范之间显示良好的比较。

## 什么变化

- 从存储差异（`patches/[capability]/spec.md.diff`）改为存储完整未来状态（`specs/[capability]/spec.md`）
- 更新所有文档以反映新的存储格式
- 将现有的 `add-init-command` 变更迁移到新格式
- 添加新的 `openspec-conventions` 能力来记录这些约定

## 影响

- 受影响的规范：新的 `openspec-conventions` 能力
- 受影响的代码：
  - openspec/README.md（第 85-108 行）
  - docs/PRD.md（第 376-382 行，778-783 行）
  - docs/openspec-walkthrough.md（第 58-62 行，112-126 行）
  - openspec/changes/add-init-command/（需要迁移）