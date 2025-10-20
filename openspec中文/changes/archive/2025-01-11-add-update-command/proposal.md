# 添加更新命令

## 为什么

用户需要一种方式来更新他们的本地 OpenSpec 指令（README.md 和 CLAUDE.md），当 OpenSpec 包发布新版本时，这些指令可能包含改进的 AI 代理指令或结构约定。

## 什么变化

- 添加新的 `openspec update` CLI 命令来更新 OpenSpec 指令
- 用最新模板替换 `openspec/README.md`
  - 安全，因为此文件完全由 OpenSpec 管理
- 仅使用标记更新 `CLAUDE.md` 中的 OpenSpec 管理块
  - 保留标记外的所有用户内容
  - 如果 `CLAUDE.md` 丢失，则创建包含管理块的文件
- 更新后显示成功消息（ASCII 安全）："Updated OpenSpec instructions"
  - 当终端支持时，可能会显示前导复选标记
  - 操作是幂等的（重新运行产生相同结果）

## 影响

- 受影响的规范：`cli-update`（新功能）
- 受影响的代码：
  - `src/core/update.ts`（新命令类，镜像 `InitCommand` 位置）
  - `src/cli/index.ts`（注册新命令）
  - 使用现有的模板通过 `TemplateManager` 和 `readmeTemplate`

## 范围外

- 此更改不引入 `.openspec/config.json`。使用默认目录名 `openspec`。