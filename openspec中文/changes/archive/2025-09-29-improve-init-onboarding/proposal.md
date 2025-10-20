## 为什么
当前的 `openspec init` 流程假设单个助手选择，并在 OpenSpec 结构已存在时停止。这使得入门感觉僵化：团队无法在一次运行中配置多个工具，他们不会了解哪些文件被刷新，成功副本总是引用 Claude，即使涉及其他助手。

## 变更内容
- 允许在 `openspec init` 期间选择多个助手，包括在单次运行中刷新现有配置。
- 提供更丰富的入门副本，总结哪些工具文件被创建或刷新，并指导用户每个助手的下一步操作。
- 对齐生成的 AI 指令内容和规范，使 CLAUDE.md 和 AGENTS.md 共享相同的 OpenSpec 指导。
- 更新规范和测试以覆盖多选提示、改进的摘要和扩展模式协调。

## 影响
- 规范：`cli-init`
- 代码：`src/core/init.ts`、`src/core/config.ts`、`src/core/templates/*`、`src/core/configurators/*`
- 测试：`test/core/init.test.ts`、`test/core/update.test.ts`