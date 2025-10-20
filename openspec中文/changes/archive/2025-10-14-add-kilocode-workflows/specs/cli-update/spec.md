## 修改后的要求
### 要求：斜杠命令更新
更新命令应为配置的工具刷新现有的斜杠命令文件，而不创建新的文件。

#### 场景：为 Claude Code 更新斜杠命令
- **当** `.claude/commands/openspec/` 包含 `proposal.md`、`apply.md` 和 `archive.md` 时
- **则** 使用共享模板刷新每个文件
- **并且** 确保模板包含相关工作流阶段的指令

#### 场景：为 Cursor 更新斜杠命令
- **当** `.cursor/commands/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md` 时
- **则** 使用共享模板刷新每个文件
- **并且** 确保模板包含相关工作流阶段的指令

#### 场景：为 OpenCode 更新斜杠命令
- **当** `.opencode/command/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md` 时
- **则** 使用共享模板刷新每个文件
- **并且** 确保模板包含相关工作流阶段的指令

#### 场景：为 Kilo Code 更新斜杠命令
- **当** `.kilocode/workflows/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md` 时
- **则** 使用包装在 OpenSpec 标记中的共享模板刷新每个文件
- **并且** 确保模板包含相关工作流阶段的指令

#### 场景：缺少斜杠命令文件
- **当** 工具缺少斜杠命令文件时
- **则** 在更新期间不创建新文件