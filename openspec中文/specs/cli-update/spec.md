# 更新命令规范

## 目的

作为使用 OpenSpec 的开发人员，我希望在新版本发布时更新项目中的 OpenSpec 指令，以便能够受益于 AI 代理指令的改进。

## 要求
### 要求：更新行为

更新命令应以团队友好的方式将 OpenSpec 指令文件更新到最新模板。

#### 场景：运行更新命令

- **当** 用户运行 `openspec update` 时
- **则** 用最新模板替换 `openspec/AGENTS.md`
- **并** 如果存在根级别存根（`AGENTS.md`/`CLAUDE.md`），则刷新它以指向 `@/openspec/AGENTS.md`

### 要求：先决条件

命令应在允许更新之前需要现有的 OpenSpec 结构。

#### 场景：检查先决条件

- **假设** 命令需要现有的 `openspec` 目录（由 `openspec init` 创建）
- **当** `openspec` 目录不存在时
- **则** 显示错误："未找到 OpenSpec 目录。请先运行 'openspec init'。"
- **并** 以代码 1 退出

### 要求：文件处理

更新命令应以可预测且安全的方式处理文件更新。

#### 场景：更新文件

- **当** 更新文件时
- **则** 用最新模板完全替换 `openspec/AGENTS.md`
- **并** 如果存在根级别存根，则更新托管块内容，使其继续指导团队成员到 `@/openspec/AGENTS.md`

### 要求：工具无关的更新

更新命令应以可预测的方式刷新 OpenSpec 托管文件，同时尊重每个团队选择的工具。

#### 场景：更新文件

- **当** 更新文件时
- **则** 用最新模板完全替换 `openspec/AGENTS.md`
- **并** 使用托管标记块创建或刷新根级别 `AGENTS.md` 存根，即使文件以前不存在
- **并** 仅更新现有 AI 工具文件中的 OpenSpec 托管部分，保留用户编写的内容不变
- **并** 避免创建新的原生工具配置文件（斜杠命令、CLAUDE.md 等），除非它们已经存在

### 要求：始终更新核心文件

更新命令应始终更新核心 OpenSpec 文件并显示 ASCII 安全成功消息。

#### 场景：成功更新

- **当** 更新成功完成时
- **则** 用最新模板替换 `openspec/AGENTS.md`
- **并** 如果存在根级别存根，则刷新它，使其仍然指导贡献者到 `@/openspec/AGENTS.md`

### 要求：斜杠命令更新

更新命令应刷新已配置工具的现有斜杠命令文件，而不创建新文件。

#### 场景：更新 Claude Code 的斜杠命令

- **当** `.claude/commands/openspec/` 包含 `proposal.md`、`apply.md` 和 `archive.md` 时
- **则** 使用共享模板刷新每个文件
- **并** 确保模板包含相关工作流程阶段的指令

#### 场景：更新 Cursor 的斜杠命令

- **当** `.cursor/commands/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md` 时
- **则** 使用共享模板刷新每个文件
- **并** 确保模板包含相关工作流程阶段的指令

#### 场景：更新 OpenCode 的斜杠命令

- **当** `.opencode/command/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md` 时
- **则** 使用共享模板刷新每个文件
- **并** 确保模板包含相关工作流程阶段的指令

#### 场景：更新 Windsurf 的斜杠命令

- **当** `.windsurf/workflows/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md` 时
- **则** 使用用 OpenSpec 标记包装的共享模板刷新每个文件
- **并** 确保模板包含相关工作流程阶段的指令
- **并** 跳过创建缺失文件（更新命令仅刷新已存在的内容）

#### 场景：更新 Kilo Code 的斜杠命令

- **当** `.kilocode/workflows/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md` 时
- **则** 使用用 OpenSpec 标记包装的共享模板刷新每个文件
- **并** 确保模板包含相关工作流程阶段的指令
- **并** 跳过创建缺失文件（更新命令仅刷新已存在的内容）

#### 场景：更新 Codex 的斜杠命令

- **假设** 全局 Codex 提示目录包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md`
- **当** 用户运行 `openspec update` 时
- **则** 使用共享斜杠命令模板（包括占位符指导）刷新每个文件
- **并** 保留 OpenSpec 标记块之外的任何非托管内容
- **并** 当 Codex 提示文件缺失时跳过创建

#### 场景：更新 GitHub Copilot 的斜杠命令

- **当** `.github/prompts/` 包含 `openspec-proposal.prompt.md`、`openspec-apply.prompt.md` 和 `openspec-archive.prompt.md` 时
- **则** 使用共享模板刷新每个文件，同时保留 YAML 前端元数据
- **并** 仅更新标记之间的 OpenSpec 托管块
- **并** 确保模板包含相关工作流程阶段的指令

#### 场景：缺失斜杠命令文件

- **当** 工具缺少斜杠命令文件时
- **则** 在更新期间不创建新文件

## 边缘情况

### 要求：错误处理

命令应优雅地处理边缘情况。

#### 场景：文件权限错误

- **当** 文件写入失败时
- **则** 让错误自然冒泡并显示文件路径

#### 场景：缺失 AI 工具文件

- **当** AI 工具配置文件不存在时
- **则** 跳过更新该文件
- **并** 不创建它

#### 场景：自定义目录名称

- **当** 考虑自定义目录名称时
- **则** 此变更不支持
- **并** 应使用默认目录名称 `openspec`

## 成功标准

用户应能够：
- 使用单个命令更新 OpenSpec 指令
- 获取最新的 AI 代理指令
- 看到清晰的更新确认

更新过程应：
- 简单快速（无版本检查）
- 可预测（每次结果相同）
- 自包含（无需网络）