## 为什么
- Windsurf 将"工作流"作为类似斜杠的自动化载体：保存在 `.windsurf/workflows/` 下的 Markdown 文件，Cascade 在工作区中发现这些文件（包括子目录和 git 根目录），然后在用户输入 `/workflow-name` 时执行。这些文件可以由团队编写，必须保持在 12k 字符以下，并且可以调用其他工作流，使其成为为 Windsurf 用户发布 OpenSpec 指导的自然场所。\
  ([Windsurf 工作流文档](https://docs.windsurf.com/windsurf/cascade/workflows))
- Wave 12 变更日志重申工作流通过斜杠命令调用，Windsurf 将它们存储在 `.windsurf/workflows` 中，因此 OpenSpec CLI 只需在那里生成 Markdown 即可参与 Windsurf 的命令调色板。\
  ("自定义工作流"部分, [Windsurf 变更日志](https://windsurf.com/changelog))
- OpenSpec 已经为提案/应用/归档提供了共享命令主体，并使用标记使命令保持最新。将相同的模板扩展到 Windsurf 使行为与 Claude、Cursor 和 OpenCode 保持一致，而无需发明新的内容流程。

## 变更内容
- 在 CLI 工具选择器（`openspec init`）和斜杠命令注册表中添加 Windsurf，以便选择它时搭建 `.windsurf/workflows/openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md`，并带有标记管理的主体。
- 为每个 Windsurf 工作流塑造简短的标题/描述，加上包装在标记中的现有 OpenSpec 防护/步骤，确保总有效载荷远低于 12,000 字符限制。
- 确保 `openspec update` 刷新现有的 Windsurf 工作流（仅刷新已存在的工作流），镜像当前对其他编辑器的行为。
- 扩展初始化/更新的单元测试以覆盖 Windsurf 生成和更新，并更新 README/工具文档以宣传 Windsurf 支持。

## 影响
- 规范：`cli-init`、`cli-update`
- 代码：`src/core/configurators/slash/*`、`src/core/templates/slash-command-templates.ts`、CLI 提示、README
- 测试：Windsurf 工作流的初始化/更新集成覆盖