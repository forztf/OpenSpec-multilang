## 为什么需要
当前验证在没有规范增量的变更上会报错，即使变更故意只是提案或工具相关。这会产生误报和嘈杂的CI。

## 变更内容
- 使变更验证具有范围感知：只验证存在的工件。
- 只有在规范增量文件存在但解析为零增量时才报错"No deltas found"。
- 保持归档更严格：如果规范存在但解析为零增量，失败；允许`--skip-specs`用于仅工具变更。

## 影响范围
- 受影响的规范：cli-validate
- 受影响的代码：`src/commands/validate.ts`、`src/core/validation/validator.ts`