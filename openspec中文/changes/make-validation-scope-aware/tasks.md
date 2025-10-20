## 1. 验证器变更
- [ ] 1.1 修改 `validateChangeDeltaSpecs`，仅在 `specs/` 目录存在且包含至少一个 `*/spec.md` 文件但解析得到的 delta 总数为 0 时，发出 "Change must have at least one delta" 错误
- [ ] 1.2 当 `specs/` 目录不存在或没有 `spec.md` 文件时，返回验证通过（无错误）

## 2. CLI 变更
- [ ] 2.1 在批量验证中保持当前行为（调用 delta 验证器）。在 1.1 修改后行为仍然正确
- [ ] 2.2 在人类可读模式下，当变更没有 `specs/` 目录时添加简短的 INFO 日志（可选）

## 3. 文档
- [ ] 3.1 更新 README 和模板："验证仅检查现有工件。仅包含提案的变更在没有 spec delta 的情况下是有效的。"

## 4. 测试
- [ ] 4.1 添加测试：仅包含提案的变更在没有 delta 的情况下通过验证
- [ ] 4.2 添加测试：specs 存在但解析得到的 delta 为 0 → 错误
- [ ] 4.3 添加测试：specs 存在且包含正确的 delta → 验证通过