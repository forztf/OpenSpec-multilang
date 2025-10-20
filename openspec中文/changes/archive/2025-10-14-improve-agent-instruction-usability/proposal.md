## 为什么
代理在提案格式化方面表现笨拙，因为基本的 Markdown 模板和格式化规则被埋在文档中部。重新组织 `openspec/AGENTS.md`，在工作流散文之前以显著的快速参考和嵌入式示例呈现，将帮助助手在没有猜测的情况下遵循流程。

## 变更内容
- 重新构建 `openspec/AGENTS.md`，使文件格式和脚手架模板在工作流散文之前出现在顶层快速参考部分。
- 在工作流步骤内嵌入 `proposal.md`、`tasks.md`、`design.md` 和规范增量的复制/粘贴模板以及内联示例。
- 添加预验证检查清单，在运行 `openspec validate` 之前突出显示最常见的格式化陷阱。
- 将内容分为初学者与高级部分，以渐进式披露复杂性，同时保持高级指导的可访问性。

## 影响
- 受影响的规范：`specs/docs-agent-instructions`
- 受影响的代码：`openspec/AGENTS.md`、`docs/`