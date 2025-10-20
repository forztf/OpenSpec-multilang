## 新增要求
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