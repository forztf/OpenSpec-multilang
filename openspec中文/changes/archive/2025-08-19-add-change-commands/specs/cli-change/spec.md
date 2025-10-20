## 新增要求

### 要求：变更命令

系统应提供带有子命令的 `change` 命令，用于显示、列出和验证变更提议。

#### 场景：以 JSON 显示变更

- **当** 执行 `openspec change show update-error --json`
- **则** 解析 markdown 变更文件
- **并且** 提取变更结构和差异
- **并且** 向 stdout 输出有效的 JSON

#### 场景：列出所有变更

- **当** 执行 `openspec change list`
- **则** 扫描 openspec/changes 目录
- **并且** 返回所有待处理变更的列表
- **并且** 支持使用 `--json` 标志输出 JSON

#### 场景：仅显示要求变更

- **当** 执行 `openspec change show update-error --requirements-only`
- **则** 仅显示要求变更（ADDED/MODIFIED/REMOVED/RENAMED）
- **并且** 排除 why 和 what changes 部分

#### 场景：验证变更结构

- **当** 执行 `openspec change validate update-error`
- **则** 解析变更文件
- **并且** 验证 Zod 模式
- **并且** 确保差异格式正确

### 要求：向后兼容性

系统应在显示弃用通知的同时保持与现有 `list` 命令的向后兼容性。

#### 场景：旧版列表命令

- **当** 执行 `openspec list`
- **则** 显示当前变更列表（现有行为）
- **并且** 显示弃用通知："Note: 'openspec list' is deprecated. Use 'openspec change list' instead."

#### 场景：带 --all 标志的旧版列表

- **当** 执行 `openspec list --all`
- **则** 显示所有变更（现有行为）
- **并且** 显示相同的弃用通知