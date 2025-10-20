## 1. CLI scaffolding命令
- [ ] 1.1 在CLI入口点注册一个`openspec scaffold`命令，包含`change-id`参数验证。
- [ ] 1.2 实现生成器逻辑，创建变更目录结构以及默认的`proposal.md`、`tasks.md`和增量规范骨架，而不覆盖现有的填充文件。

## 2. 模板和文档
- [ ] 2.1 在顶级快速参考`openspec/AGENTS.md`中展示复制/粘贴模板和scaffold用法。
- [ ] 2.2 刷新其他CLI文档（`docs/`、README）以提及scaffold工作流程并链接到说明。

## 3. 测试覆盖
- [ ] 3.1 添加单元测试，涵盖名称验证、文件生成和幂等重新运行。
- [ ] 3.2 添加集成覆盖，确保生成的文件在无需手动编辑的情况下通过`openspec validate --strict`。