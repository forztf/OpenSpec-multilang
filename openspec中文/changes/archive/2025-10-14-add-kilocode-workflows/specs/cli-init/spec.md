## 修改后的要求
### 要求：AI 工具配置
命令应使用标记系统配置 AI 编码助手与 OpenSpec 指令。
#### 场景：提示选择 AI 工具
- **当** 交互式运行时
- **则** 使用多选菜单提示用户"您使用哪些 AI 工具？"
- **并且** 列出每个可用工具并带有复选框：
  - Claude Code（创建或刷新 CLAUDE.md 和斜杠命令）
  - Cursor（创建或刷新 `.cursor/commands/*` 斜杠命令）
  - OpenCode（创建或刷新 `.opencode/command/openspec-*.md` 斜杠命令）
  - Windsurf（创建或刷新 `.windsurf/workflows/openspec-*.md` 工作流）
  - Kilo Code（创建或刷新 `.kilocode/workflows/openspec-*.md` 工作流）
  - AGENTS.md 标准（创建或刷新带有 OpenSpec 标记的 AGENTS.md）
- **并且** 在已存在受管文件的工具旁边显示"(已配置)"，以便用户理解选择将刷新内容
- **并且** 将禁用的工具视为"即将推出"并保持其不可选择
- **并且** 允许在选择一个或多个工具后按回车键确认

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

#### 场景：为 Kilo Code 生成斜杠命令
- **当** 用户在初始化期间选择 Kilo Code 时
- **则** 创建 `.kilocode/workflows/openspec-proposal.md`、`.kilocode/workflows/openspec-apply.md` 和 `.kilocode/workflows/openspec-archive.md`
- **并且** 从共享模板（包装在 OpenSpec 标记中）填充每个文件，使工作流文本与其他工具匹配
- **并且** 每个模板包含相关 OpenSpec 工作流阶段的指令