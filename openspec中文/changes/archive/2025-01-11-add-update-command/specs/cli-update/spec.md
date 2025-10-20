# 更新命令规范

## 目的

作为使用 OpenSpec 的开发人员，我希望在发布新版本时更新项目中的 OpenSpec 指令，以便我能从 AI 代理指令的改进中受益。

## 核心要求

### 更新行为

更新命令应将 OpenSpec 指令文件更新为最新模板。

当用户运行 `openspec update` 时，命令应：
- 检查 `openspec` 目录是否存在
- 用最新模板替换 `openspec/README.md`（完全替换）
- 使用标记更新 `CLAUDE.md` 中的 OpenSpec 管理块
  - 保留标记外的用户内容
  - 如果缺少则创建 `CLAUDE.md`
- 显示 ASCII 安全的成功消息："Updated OpenSpec instructions"

### 先决条件

命令应要求：
- 存在 `openspec` 目录（由 `openspec init` 创建）

如果 `openspec` 目录不存在则：
- 显示错误："No OpenSpec directory found. Run 'openspec init' first."
- 以代码 1 退出

### 文件处理

更新命令应：
- 用最新模板完全替换 `openspec/README.md`
- 仅使用标记更新 `CLAUDE.md` 中的 OpenSpec 管理块
- 使用默认目录名 `openspec`
- 幂等（重复运行无额外效果）

## 边缘情况

### 文件权限

如果文件写入失败则让错误自然冒泡并显示文件路径。

### 缺少 CLAUDE.md

如果 CLAUDE.md 不存在则创建包含模板内容的文件。

### 自定义目录名

此变更不支持。应使用默认目录名 `openspec`。

## 成功标准

用户应能够：
- 通过单个命令更新 OpenSpec 指令
- 获取最新的 AI 代理指令
- 看到清晰的更新确认

更新过程应：
- 简单快速（无版本检查）
- 可预测（每次结果相同）
- 自包含（无需网络）