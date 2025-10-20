# cli-change 规范

## 目的
待定 - 由归档变更 add-change-commands 创建。归档后更新目的。

## 要求
### 要求：变更命令

系统应提供带有子命令的 `change` 命令，用于显示、列出和验证变更提案。

#### 场景：以 JSON 格式显示变更

- **当** 执行 `openspec change show update-error --json` 时
- **则** 解析 Markdown 变更文件
- **并** 提取变更结构和增量
- **并** 将有效的 JSON 输出到标准输出

#### 场景：列出所有变更

- **当** 执行 `openspec change list` 时
- **则** 扫描 openspec/changes 目录
- **并** 返回所有待处理变更的列表
- **并** 支持使用 `--json` 标志的 JSON 输出

#### 场景：仅显示需求变更

- **当** 执行 `openspec change show update-error --requirements-only` 时
- **则** 仅显示需求变更（ADDED/MODIFIED/REMOVED/RENAMED）
- **并** 排除 why 和 what changes 部分

#### 场景：验证变更结构

- **当** 执行 `openspec change validate update-error` 时
- **则** 解析变更文件
- **并** 根据 Zod 模式进行验证
- **并** 确保增量格式正确

### 要求：向后兼容性

系统应在显示弃用通知的同时保持与现有 `list` 命令的向后兼容性。

#### 场景：传统的 list 命令

- **当** 执行 `openspec list` 时
- **则** 显示当前变更列表（现有行为）
- **并** 显示弃用通知："注意：'openspec list' 已弃用。请使用 'openspec change list' 替代。"

#### 场景：带有 --all 标志的传统 list 命令

- **当** 执行 `openspec list --all` 时
- **则** 显示所有变更（现有行为）
- **并** 显示相同的弃用通知

### 要求：交互式显示选择

变更显示命令应在未提供变更名称时支持交互式选择。

#### 场景：显示命令的交互式变更选择

- **当** 执行 `openspec change show` 不带参数时
- **则** 显示可用变更的交互式列表
- **并** 允许用户选择要显示的变更
- **并** 显示所选变更内容
- **并** 保持所有现有的显示选项（--json、--deltas-only）

#### 场景：非交互式回退保持当前行为

- **假设** 标准输入不是 TTY 或提供了 `--no-interactive` 或设置了环境变量 `OPEN_SPEC_INTERACTIVE=0`
- **当** 执行 `openspec change show` 不带变更名称时
- **则** 不进行交互式提示
- **并** 打印现有提示，包括可用的变更 ID
- **并** 设置 `process.exitCode = 1`

### 要求：交互式验证选择

变更验证命令应在未提供变更名称时支持交互式选择。

#### 场景：验证命令的交互式变更选择

- **当** 执行 `openspec change validate` 不带参数时
- **则** 显示可用变更的交互式列表
- **并** 允许用户选择要验证的变更
- **并** 验证所选变更

#### 场景：非交互式回退保持当前行为

- **假设** 标准输入不是 TTY 或提供了 `--no-interactive` 或设置了环境变量 `OPEN_SPEC_INTERACTIVE=0`
- **当** 执行 `openspec change validate` 不带变更名称时
- **则** 不进行交互式提示
- **并** 打印现有提示，包括可用的变更 ID
- **并** 设置 `process.exitCode = 1`