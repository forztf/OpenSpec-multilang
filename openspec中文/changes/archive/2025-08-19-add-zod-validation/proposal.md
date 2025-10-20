# 变更：添加 Zod 运行时验证

## 为什么

虽然规范和变更命令可以输出 JSON，但它们目前不执行基本结构检查之外的严格运行时验证。这可能导致处理无效的规范或变更、缺少必需字段时的静默失败以及糟糕的错误消息。

## 变更内容

- 使用严格的 Zod 验证增强现有的 `spec validate` 和 `change validate` 命令
- 向归档命令添加验证，以确保在应用前变更有效
- 向差异命令添加验证，以确保变更格式良好
- 以 JSON 格式提供详细的验证报告
- 添加 `--strict` 模式，使警告失败

## 影响

- **受影响的规范**：cli-spec、cli-change、cli-archive、cli-diff
- **受影响的代码**：
  - src/commands/spec.ts（增强 validate 子命令）
  - src/commands/change.ts（增强 validate 子命令）
  - src/core/archive.ts（添加归档前验证）
  - src/core/diff.ts（添加验证检查）