## 为什么需要
手动设置新变更会导致规范增量中的格式错误，并减慢必须为每个提案重新创建相同文件骨架的代理速度。内置的scaffold命令将生成合规的模板，使助手可以专注于变更内容而不是结构。

## 变更内容
- 添加一个`openspec scaffold <change-id>` CLI命令，创建一个具有验证的`proposal.md`、`tasks.md`和规范增量模板的变更目录。
- 更新CLI文档和快速参考指南，以便代理在手动起草文件之前发现scaffold工作流程。
- 添加自动化覆盖（单元/集成测试）以确保命令尊重现有的命名规则，并且生成的Markdown通过验证。

## 影响范围
- 受影响的规范：`specs/cli-scaffold`
- 受影响的代码：`src/cli/index.ts`、`src/commands`、`docs/`