## 修改的需求
### 需求：斜杠命令更新
更新命令应刷新配置工具的现有斜杠命令文件而不创建新文件。

#### 场景：更新Claude Code的斜杠命令
- **当** `.claude/commands/openspec/` 包含 `proposal.md`、`apply.md` 和 `archive.md`
- **那么** 使用共享模板刷新每个文件
- **并且** 确保模板包含相关工作流程阶段的说明

#### 场景：更新Cursor的斜杠命令
- **当** `.cursor/commands/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md`
- **那么** 使用共享模板刷新每个文件
- **并且** 确保模板包含相关工作流程阶段的说明

#### 场景：更新Factory Droid的斜杠命令
- **当** `.factory/commands/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md`
- **那么** 使用包含YAML前置数据的共享Factory模板刷新每个文件，用于`description`和`argument-hint`字段
- **并且** 确保模板主体保留`$ARGUMENTS`占位符，以便用户输入继续流向droid
- **并且** 仅更新OpenSpec托管标记内的内容，保留任何未托管的注释不变
- **并且** 在更新期间跳过创建缺失的文件

#### 场景：更新OpenCode的斜杠命令
- **当** `.opencode/command/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md`
- **那么** 使用共享模板刷新每个文件
- **并且** 确保模板包含相关工作流程阶段的说明

#### 场景：更新Windsurf的斜杠命令
- **当** `.windsurf/workflows/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md`
- **那么** 使用包装在OpenSpec标记中的共享模板刷新每个文件
- **并且** 确保模板包含相关工作流程阶段的说明
- **并且** 跳过创建缺失的文件（更新命令仅刷新已存在的内容）

#### 场景：更新Kilo Code的斜杠命令
- **当** `.kilocode/workflows/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md`
- **那么** 使用包装在OpenSpec标记中的共享模板刷新每个文件
- **并且** 确保模板包含相关工作流程阶段的说明
- **并且** 跳过创建缺失的文件（更新命令仅刷新已存在的内容）

#### 场景：更新Codex的斜杠命令
- **给定** 全局Codex提示目录包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md`
- **当** 用户运行 `openspec update`
- **那么** 使用共享斜杠命令模板（包括占位符指导）刷新每个文件
- **并且** 保留OpenSpec标记块外的任何未托管内容
- **并且** 当Codex提示文件缺失时跳过创建

#### 场景：更新GitHub Copilot的斜杠命令
- **当** `.github/prompts/` 包含 `openspec-proposal.prompt.md`、`openspec-apply.prompt.md` 和 `openspec-archive.prompt.md`
- **那么** 使用共享模板刷新每个文件，同时保留YAML前置数据
- **并且** 仅更新标记之间的OpenSpec托管块
- **并且** 确保模板包含相关工作流程阶段的说明

#### 场景：缺失斜杠命令文件
- **当** 工具缺少斜杠命令文件时
- **那么** 在更新期间不创建新文件