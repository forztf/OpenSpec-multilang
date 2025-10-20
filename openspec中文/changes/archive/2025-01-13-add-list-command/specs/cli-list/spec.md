# 列表命令规范

## 目的

`openspec list` 命令应为开发人员提供项目中所有活跃变更的快速概览，显示其名称和任务完成状态。

## 行为

### 命令执行

当执行 `openspec list` 时
则扫描 `openspec/changes/` 目录以查找变更目录
并从结果中排除 `archive/` 子目录
并解析每个变更的 `tasks.md` 文件以计算任务完成情况

### 任务计数

当解析 `tasks.md` 文件时
则计算匹配这些模式的任务：
- 已完成：包含 `- [x]` 的行
- 未完成：包含 `- [ ]` 的行
并计算总任务数为已完成和未完成任务的总和

### 输出格式

当显示列表时
则显示包含以下列的表格：
- 变更名称（目录名）
- 任务进度（例如，"3/5 tasks" 或 "✓ Complete"）
- 状态指示器：
  - `✓` 表示完全完成的变更（所有任务完成）
  - 进度分数表示部分完成

示例输出：
```
Changes:
  add-auth-feature     3/5 tasks
  update-api-docs      ✓ Complete
  fix-validation       0/2 tasks
  add-list-command     1/4 tasks
```

### 空状态

当不存在活跃变更时（仅有 archive/ 或空的 changes/）
则显示："No active changes found."

### 错误处理

如果变更目录没有 `tasks.md` 文件
则显示该变更并标记为 "No tasks" 状态

如果 `openspec/changes/` 目录不存在
则显示错误："No OpenSpec changes directory found. Run 'openspec init' first."
并以代码 1 退出

### 排序

变更应按变更名称的字母顺序显示以保持一致性。

## 为什么

开发人员需要一种快速方式来：
- 查看正在进行的变更
- 识别哪些变更已准备好归档
- 了解整体项目演进状态
- 无需打开多个文件即可获得鸟瞰视图

该命令以最小的努力提供这种可见性，遵循 OpenSpec 的简单性和清晰性理念。