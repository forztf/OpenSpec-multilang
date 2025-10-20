# CLI 差异命令规范

## 目的

`openspec diff` 命令为开发人员提供提议的规范变更与当前部署规范之间的视觉比较。

## 命令语法

```bash
openspec diff [change-name]
```

## 行为

### 无参数时

当运行 `openspec diff` 无参数时
则列出 `changes/` 目录中的所有可用变更（排除归档）
并提示用户选择一个变更

### 带变更名称时

当运行 `openspec diff <change-name>` 时
则比较 `changes/<change-name>/specs/` 中的所有规范文件与 `specs/` 中的对应文件

### 差异输出

对于变更中的每个规范文件：
- 如果文件在两个位置都存在则显示统一差异
- 如果文件仅在变更中存在则显示为新文件（所有行带 +）
- 如果文件仅在当前规范中存在则显示为删除（所有行带 -）

### 显示格式

差异应使用标准统一差异格式：
- 带 `-` 前缀的行表示删除的内容
- 带 `+` 前缀的行表示添加的内容
- 无前缀的行表示未更改的上下文
- 显示被比较路径的文件头

### 颜色支持

当终端支持颜色时：
- 删除的行显示为红色
- 添加的行显示为绿色
- 文件头显示为粗体
- 上下文行显示为默认颜色

### 错误处理

当指定的变更不存在时则显示错误 "Change '<name>' not found"
当变更中无规范目录时则显示 "No spec changes found for '<name>'"
当变更目录不存在时则显示 "No OpenSpec changes directory found"

## 示例

```bash
# 查看特定变更的差异
$ openspec diff add-auth-feature

--- specs/user-auth/spec.md
+++ changes/add-auth-feature/specs/user-auth/spec.md
@@ -10,6 +10,8 @@
 Users SHALL authenticate with email and password.
 
+Users MAY authenticate with OAuth providers.
+
 WHEN credentials are valid THEN issue JWT token.

# 列出所有变更并选择
$ openspec diff
Available changes:
  1. add-auth-feature
  2. update-payment-flow
  3. add-status-command
Select a change (1-3): 
```