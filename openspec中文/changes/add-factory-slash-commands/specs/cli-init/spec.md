## 修改的需求
### 需求：斜杠命令配置
init命令应使用共享模板为支持的编辑器生成斜杠命令文件。

#### 场景：为Claude Code生成斜杠命令
- **当** 用户在初始化期间选择Claude Code
- **那么** 创建 `.claude/commands/openspec/proposal.md`、`.claude/commands/openspec/apply.md` 和 `.claude/commands/openspec/archive.md`
- **并且** 从共享模板填充每个文件，使命令文本与其他工具匹配
- **并且** 每个模板包含相关工作流程阶段的说明

#### 场景：为Cursor生成斜杠命令
- **当** 用户在初始化期间选择Cursor
- **那么** 创建 `.cursor/commands/openspec-proposal.md`、`.cursor/commands/openspec-apply.md` 和 `.cursor/commands/openspec-archive.md`
- **并且** 从共享模板填充每个文件，使命令文本与其他工具匹配
- **并且** 每个模板包含相关工作流程阶段的说明

#### 场景：为Factory Droid生成斜杠命令
- **当** 用户在初始化期间选择Factory Droid
- **那么** 创建 `.factory/commands/openspec-proposal.md`、`.factory/commands/openspec-apply.md` 和 `.factory/commands/openspec-archive.md`
- **并且** 从包含Factory兼容YAML前置数据的共享模板填充每个文件，用于`description`和`argument-hint`字段
- **并且** 在模板主体中包含`$ARGUMENTS`占位符，以便droid接收任何用户提供的输入
- **并且** 将生成的内容包装在OpenSpec托管标记中，以便`openspec update`可以安全地刷新命令

#### 场景：为OpenCode生成斜杠命令
- **当** 用户在初始化期间选择OpenCode
- **那么** 创建 `.opencode/commands/openspec-proposal.md`、`.opencode/commands/openspec-apply.md` 和 `.opencode/commands/openspec-archive.md`
- **并且** 从共享模板填充每个文件，使命令文本与其他工具匹配
- **并且** 每个模板包含相关工作流程阶段的说明

#### 场景：为Windsurf生成斜杠命令
- **当** 用户在初始化期间选择Windsurf
- **那么** 创建 `.windsurf/workflows/openspec-proposal.md`、`.windsurf/workflows/openspec-apply.md` 和 `.windsurf/workflows/openspec-archive.md`
- **并且** 从共享模板（包装在OpenSpec标记中）填充每个文件，使工作流程文本与其他工具匹配
- **并且** 每个模板包含相关工作流程阶段的说明

#### 场景：为Kilo Code生成斜杠命令
- **当** 用户在初始化期间选择Kilo Code
- **那么** 创建 `.kilocode/workflows/openspec-proposal.md`、`.kilocode/workflows/openspec-apply.md` 和 `.kilocode/workflows/openspec-archive.md`
- **并且** 从共享模板（包装在OpenSpec标记中）填充每个文件，使工作流程文本与其他工具匹配
- **并且** 每个模板包含相关工作流程阶段的说明

#### 场景：为Codex生成斜杠命令
- **当** 用户在初始化期间选择Codex
- **那么** 在`~/.codex/prompts/`创建全局提示文件`openspec-proposal.md`、`openspec-apply.md`和`openspec-archive.md`（或如果设置了`$CODEX_HOME/prompts`则在该目录下）
- **并且** 从共享模板填充每个文件，将第一个编号占位符（`$1`）映射到主要用户输入（例如，变更标识符或问题文本）
- **并且** 将生成的内容包装在OpenSpec标记中，以便`openspec update`可以刷新提示而不触及周围的自定义注释

#### 场景：为GitHub Copilot生成斜杠命令
- **当** 用户在初始化期间选择GitHub Copilot
- **那么** 创建 `.github/prompts/openspec-proposal.prompt.md`、`.github/prompts/openspec-apply.prompt.md`和`.github/prompts/openspec-archive.prompt.md`
- **并且** 使用包含`description`字段的YAML前置数据填充每个文件，该字段总结了工作流程阶段
- **并且** 包含`$ARGUMENTS`占位符以捕获用户输入
- **并且** 使用OpenSpec标记包装共享模板主体，以便`openspec update`可以刷新内容
- **并且** 每个模板包含相关工作流程阶段的说明