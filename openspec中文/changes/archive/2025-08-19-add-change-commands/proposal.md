# 变更：添加带 JSON 输出的变更命令

## 为什么

OpenSpec 变更提案目前只能作为 markdown 文件查看，这与规范一样存在程序化访问限制。此外，当前的 `openspec list` 命令只能列出变更，这与新的基于资源的命令结构不一致。

## 什么变化

- **cli-change:** 添加用于管理变更提案的新命令，包含 show、list 和 validate 子命令
- **cli-list:** 为旧的 list 命令添加弃用通知，引导用户使用新的变更列表命令

## 影响

- **受影响的规范**: cli-list（修改以添加弃用通知）
- **受影响的代码**:
  - src/cli/index.ts（注册新命令）
  - src/core/list.ts（添加弃用通知）