# 实现任务

## 1. CLI 行为和帮助
- [x] 1.1 取消顶级 `openspec list` 的弃用；将 `change list` 标记为已弃用，并带有指向 `openspec list` 的警告
- [x] 1.2 添加通过 `openspec list --specs` 列出规范的支持，并保持 `--changes` 为默认值
- [x] 1.3 更新命令描述和 `--help` 输出以强调动词-名词模式
- [x] 1.4 保持 `openspec spec ...` 和 `openspec change ...` 命令工作，但打印弃用通知

## 2. 核心列表逻辑
- [x] 2.1 扩展 `src/core/list.ts` 以接受模式：`changes`（默认）或 `specs`
- [x] 2.2 实现 `specs` 列表：扫描 `openspec/specs/*/spec.md`，通过解析器计算要求计数，一致地格式化输出
- [x] 2.3 共享两种模式的输出结构；保留当前文本表格；确保 JSON 在未来变更中的对等性

## 3. 规范和约定
- [x] 3.1 更新 `openspec/specs/cli-list/spec.md` 以记录 `--specs`（并默认为变更）
- [x] 3.2 更新 `openspec/specs/openspec-conventions/spec.md`，添加动词-名词 CLI 设计要求和弃用指导

## 4. 测试和文档
- [x] 4.1 更新测试：确保 `openspec list` 适用于变更和规范；保持 `change list` 测试但断言警告
- [ ] 4.2 更新 README 和任何使用文档以显示新的主要命令
- [ ] 4.3 在仓库 CHANGELOG 或 README 中添加迁移说明

## 5. 后续（可选，不在此变更中）
- [ ] 5.1 考虑 `openspec show --specs/--changes` 用于无 ID 的发现
- [ ] 5.2 考虑带 `--json` 的 `openspec list` JSON 输出，适用于两种模式