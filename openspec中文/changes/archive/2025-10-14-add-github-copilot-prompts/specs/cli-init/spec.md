## 修改后的要求

### 要求：斜杠命令配置
初始化命令应使用共享模板为支持的编辑器生成斜杠命令文件。

#### 场景：为 Claude Code 生成斜杠命令
- **当** 用户在初始化期间选择 Claude Code 时
- **则** 创建 `.claude/commands/openspec/proposal.md`、`.claude/commands/openspec/apply.md` 和 `.claude/commands/openspec/archive.md`
- **并且** 从共享模板填充每个文件，使命令文本与其他工具匹配
- **并且** 每个模板包含相关 OpenSpec 工作流阶段的指令

#### 场景：为 Cursor 生成斜杠命令
- **当** 用户在初始化期间选择 Cursor 时
- **则** 创建 `.cursor/commands/openspec-proposal.md`、`.cursor/commands/openspec-apply.md` 和 `.cursor/commands/openspec-archive.md`
- **并且** 从共享模板填充每个文件，使命令文本与其他工具匹配
- **并且** 每个模板包含相关 OpenSpec 工作流阶段的指令

#### 场景：为 OpenCode 生成斜杠命令
- **当** 用户在初始化期间选择 OpenCode 时
- **则** 创建 `.opencode/commands/openspec-proposal.md`、`.opencode/commands/openspec-apply.md` 和 `.opencode/commands/openspec-archive.md`
- **并且** 从共享模板填充每个文件，使命令文本与其他工具匹配
- **并且** 每个模板包含相关 OpenSpec 工作流阶段的指令

#### 场景：为 Windsurf 生成斜杠命令
- **当** 用户在初始化期间选择 Windsurf 时
- **则** 创建 `.windsurf/workflows/openspec-proposal.md`、`.windsurf/workflows/openspec-apply.md` 和 `.windsurf/workflows/openspec-archive.md`
- **并且** 从共享模板（包装在 OpenSpec 标记中）填充每个文件，使工作流文本与其他工具匹配
- **并且** 每个模板包含相关 OpenSpec 工作流阶段的指令

#### 场景：为 Kilo Code 生成斜杠命令
- **当** 用户在初始化期间选择 Kilo Code 时
- **则** 创建 `.kilocode/workflows/openspec-proposal.md`、`.kilocode/workflows/openspec-apply.md` 和 `.kilocode/workflows/openspec-archive.md`
- **并且** 从共享模板（包装在 OpenSpec 标记中）填充每个文件，使工作流文本与其他工具匹配
- **并且** 每个模板包含相关 OpenSpec 工作流阶段的指令

#### 场景：为 Codex 生成斜杠命令
- **当** 用户在初始化期间选择 Codex 时
- **则** 在 `~/.codex/prompts/openspec-proposal.md`、`~/.codex/prompts/openspec-apply.md` 和 `~/.codex/prompts/openspec-archive.md`（或在设置 `$CODEX_HOME/prompts` 下）创建全局提示文件
- **并且** 从共享模板填充每个文件，将第一个编号占位符（`$1`）映射到主要用户输入（例如，变更标识符或问题文本）
- **并且** 将生成的内容包装在 OpenSpec 标记中，以便 `openspec update` 可以刷新提示而不触及周围的自定义注释

#### 场景：为 GitHub Copilot 生成斜杠命令
- **当** 用户在初始化期间选择 GitHub Copilot 时
- **则** 创建 `.github/prompts/openspec-proposal.prompt.md`、`.github/prompts/openspec-apply.prompt.md` 和 `.github/prompts/openspec-archive.prompt.md`
- **并且** 用包含总结工作流阶段的 `description` 字段的 YAML 前言填充每个文件
- **并且** 包含 `$ARGUMENTS` 占位符以捕获用户输入
- **并且** 用 OpenSpec 标记包装共享模板主体，以便 `openspec update` 可以刷新内容
- **并且** 每个模板包含相关 OpenSpec 工作流阶段的指令