## 修改后的要求
### 要求：AI 工具配置
命令应根据用户选择配置 AI 编码助手与 OpenSpec 指令。

#### 场景：提示选择 AI 工具

- **当** 运行时
- **则** 提示用户选择要配置的 AI 工具：
  - Claude Code（✅ OpenSpec 自定义斜杠命令可用）
  - Cursor（✅ OpenSpec 自定义斜杠命令可用）
  - AGENTS.md（适用于 Codex、Amp、Copilot、…）

### 要求：AI 工具配置详情
命令应使用标记系统正确配置选定的 AI 工具与 OpenSpec 特定指令。

#### 场景：配置 Claude Code

- **当** 选择 Claude Code 时
- **则** 在项目根目录（不在 openspec/ 内）创建或更新 `CLAUDE.md`

#### 场景：配置 AGENTS 标准

- **当** 选择 AGENTS.md 标准时
- **则** 在项目根目录（不在 openspec/ 内）创建或更新 `AGENTS.md`

#### 场景：创建新的 CLAUDE.md

- **当** CLAUDE.md 不存在时
- **则** 创建包含用标记包装的 OpenSpec 内容的新文件：
```markdown
<!-- OPENSPEC:START -->
# OpenSpec 项目

本文档为 AI 编码助手提供如何使用 OpenSpec 约定进行规范驱动开发的指令。在处理 OpenSpec 启用的项目时，请精确遵循这些规则。

此项目使用 OpenSpec 进行规范驱动开发。规范是真相的来源。

参见 @openspec/AGENTS.md 获取详细的约定和指南。
<!-- OPENSPEC:END -->
```

#### 场景：创建新的 AGENTS.md

- **当** 项目根目录中不存在 AGENTS.md 时
- **则** 使用与 CLAUDE.md 相同的模板创建包含用标记包装的 OpenSpec 内容的新文件

#### 场景：更新现有的 CLAUDE.md

- **当** CLAUDE.md 已存在时
- **则** 保留所有现有内容
- **并且** 使用标记在文件开头插入 OpenSpec 内容
- **并且** 确保标记在已存在时不重复

#### 场景：更新现有的 AGENTS.md

- **当** 项目根目录中已存在 AGENTS.md 时
- **则** 保留所有现有内容
- **并且** 确保文件开头的 OpenSpec 受管块被刷新而不重复标记

#### 场景：使用标记管理内容

- **当** 使用标记系统时
- **则** 使用 `<!-- OPENSPEC:START -->` 标记受管内容的开始
- **并且** 使用 `<!-- OPENSPEC:END -->` 标记受管内容的结束
- **并且** 允许 OpenSpec 更新其内容而不影响用户自定义
- **并且** 完整保留标记外的所有内容

为什么使用标记：
- 用户可能有他们想要保留的现有 CLAUDE.md 或 AGENTS.md 指令
- OpenSpec 可以在未来的版本中更新其指令
- OpenSpec 受管内容和用户受管内容之间的清晰边界