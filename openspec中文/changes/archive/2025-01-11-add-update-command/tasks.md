# 实现任务

## 1. 更新命令实现
- [x] 1.1 创建 `src/core/update.ts` 包含 `UpdateCommand` 类
- [x] 1.2 检查 `openspec` 目录是否存在 (使用 `FileSystemUtils.directoryExists`)
- [x] 1.3 使用 `FileSystemUtils.writeFile` 将 `readmeTemplate` 写入 `openspec/README.md`
- [x] 1.4 通过 `FileSystemUtils.updateFileWithMarkers` 和 `TemplateManager.getClaudeTemplate()` 使用标记更新 `CLAUDE.md`
- [x] 1.5 显示 ASCII 安全的成功消息: `Updated OpenSpec instructions`

## 2. CLI 集成
- [x] 2.1 在 `src/cli/index.ts` 中注册 `update` 命令
- [x] 2.2 添加命令描述: `Update OpenSpec instruction files`
- [x] 2.3 使用 `ora().fail(...)` 和退出代码 1 处理错误 (缺少 `openspec` 目录, 文件写入错误)

## 3. 测试
- [x] 3.1 验证 `openspec/README.md` 是否完全被最新模板替换
- [x] 3.2 验证 `CLAUDE.md` OpenSpec 块更新而不会改变标记外的用户内容
- [x] 3.3 验证幂等性 (运行两次产生相同文件, 无重复标记)
- [x] 3.4 验证缺少 `openspec` 目录时的错误和友好消息
- [x] 3.5 验证成功消息在仅 ASCII 终端中正确显示