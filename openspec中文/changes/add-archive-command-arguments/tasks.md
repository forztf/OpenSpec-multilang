# 实施任务

## 1. 更新OpenCode配置器
- [x] 1.1 在OpenCode归档前置数据中添加 `$ARGUMENTS` 占位符（匹配提案模式）
- [x] 1.2 将其格式化为 `<ChangeId>\n  $ARGUMENTS\n</ChangeId>` 或类似结构以保持清晰
- [x] 1.3 确保 `updateExisting` 重写归档前置数据/主体，使 `$ARGUMENTS` 在 `openspec update` 后持续存在

## 2. 更新斜杠命令模板
- [x] 2.1 修改归档步骤以在通过 `$ARGUMENTS` 提供参数时验证变更ID
- [x] 2.2 保持向后兼容性 - 允许在没有提供参数时从上下文推断
- [x] 2.3 在归档前添加步骤，使用 `openspec list` 验证变更ID是否存在

## 3. 更新文档
- [x] 3.1 更新AGENTS.md归档示例以显示参数用法
- [x] 3.2 记录OpenCode现在支持 `/openspec:archive <change-id>`

## 4. 验证和测试
- [ ] 4.1 运行 `openspec update` 重新生成OpenCode斜杠命令
- [ ] 4.2 使用OpenCode手动测试 `/openspec:archive <change-id>`
- [ ] 4.3 测试向后兼容性（不带参数的归档命令）
- [ ] 4.4 运行 `openspec validate --strict` 确保没有问题