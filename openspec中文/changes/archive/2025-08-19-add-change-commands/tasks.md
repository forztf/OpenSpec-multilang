# 实现任务（第二阶段：基于 add-zod-validation）

## 1. 命令实现
- [x] 1.1 创建 src/commands/change.ts
- [x] 1.2 从 src/core/schemas/change.schema.ts 导入 ChangeSchema 和 DeltaSchema
- [x] 1.3 从 src/core/parsers/markdown-parser.ts 导入 markdown 解析器
- [x] 1.4 从 src/core/validation/validator.ts 导入 ChangeValidator
- [x] 1.5 从 src/core/converters/json-converter.ts 导入 JSON 转换器
- [x] 1.6 使用现有转换器实现带 JSON 输出的 show 子命令
- [x] 1.7 实现 list 子命令
- [x] 1.8 使用现有 ChangeValidator 实现 validate 子命令
- [x] 1.9 添加 --requirements-only 过滤选项
- [x] 1.10 添加 --strict 模式支持（利用现有验证基础设施）
- [x] 1.11 为验证报告添加 --json 标志

## 2. 变更特定的解析器扩展
- [x] 2.1 创建 src/core/parsers/change-parser.ts（扩展基础 markdown 解析器）
- [x] 2.2 解析提案结构（Why, What Changes 部分）
- [x] 2.3 提取 ADDED/MODIFIED/REMOVED/RENAMED 部分
- [x] 2.4 解析每个部分内的差异操作
- [x] 2.5 为变更解析器添加测试

## 3. 向后兼容性
- [x] 3.1 更新 src/core/list.ts 以添加弃用通知
- [x] 3.2 确保现有的 list 命令继续工作
- [x] 3.3 为已弃用命令的使用添加控制台警告

## 4. 集成
- [x] 4.1 在 src/cli/index.ts 中注册变更命令
- [ ] 4.2 为所有子命令添加集成测试
- [x] 4.3 测试变更的 JSON 输出
- [x] 4.4 测试向后兼容性
- [x] 4.5 测试严格模式下的验证
- [x] 4.6 更新 CLI 帮助文档（在主帮助中添加 'change' 命令，记录子命令：show, list, validate）