# 实现任务（基础阶段）

## 1. 核心模式
- [x] 1.1 将 zod 依赖添加到 package.json
- [x] 1.2 创建 src/core/schemas/base.schema.ts，包含 ScenarioSchema 和 RequirementSchema
- [x] 1.3 创建 src/core/schemas/spec.schema.ts，包含 SpecSchema
- [x] 1.4 创建 src/core/schemas/change.schema.ts，包含 DeltaSchema 和 ChangeSchema
- [x] 1.5 创建 src/core/schemas/index.ts 以导出所有模式

## 2. 解析器实现
- [x] 2.1 创建 src/core/parsers/markdown-parser.ts
- [x] 2.2 实现标题提取（##、###、####）
- [x] 2.3 实现标题间内容捕获
- [x] 2.4 为解析器边缘情况添加测试

## 3. 验证基础设施
- [x] 3.1 创建 src/core/validation/types.ts，包含 ValidationLevel、ValidationIssue、ValidationReport 类型
- [x] 3.2 创建 src/core/validation/constants.ts，包含验证规则和阈值
- [x] 3.3 创建 src/core/validation/validator.ts，包含 SpecValidator 和 ChangeValidator 类

## 4. 增强验证规则
- [x] 4.1 添加 RequirementValidation 细化（必须有场景，必须包含 SHALL）
- [x] 4.2 添加 SpecValidation 细化（必须有要求）
- [x] 4.3 添加 ChangeValidation 细化（必须有增量，why 部分长度）
- [x] 4.4 为每个规则实现自定义错误消息

## 5. JSON 转换器
- [x] 5.1 创建 src/core/converters/json-converter.ts
- [x] 5.2 实现规范到 JSON 转换
- [x] 5.3 实现变更到 JSON 转换
- [x] 5.4 添加元数据字段（版本、格式、源路径）

## 6. 归档命令增强
- [x] 6.1 使用新验证器添加归档前验证检查
- [x] 6.2 添加 --no-validate 标志，带必需确认提示和警告消息："⚠️  警告：跳过验证可能归档无效规范。继续？(y/N)"
- [x] 6.3 在中止前显示验证错误
- [x] 6.4 将所有 --no-validate 使用记录到控制台，带时间戳和受影响文件
- [x] 6.5 为验证场景添加测试，包括 --no-validate 确认流程

## 7. 差异命令增强
- [x] 7.1 使用新验证器添加差异前验证检查
- [x] 7.2 显示验证警告（非阻塞）
- [x] 7.3 即使存在警告也继续差异

## 8. 测试
- [x] 8.1 所有模式的单元测试
- [x] 8.2 解析器的单元测试
- [x] 8.3 验证规则的单元测试
- [x] 8.4 验证报告的集成测试
- [x] 8.5 测试各种无效规范/变更格式
- [x] 8.6 测试严格模式行为
- [x] 8.7 测试归档前验证
- [x] 8.8 测试验证报告 JSON 输出

## 9. 文档
- [x] 9.1 记录模式结构和验证规则（openspec/VALIDATION.md）
- [x] 9.2 更新归档的 CLI 帮助（记录 --no-validate 标志及其警告）
- [x] 9.3 更新差异的 CLI 帮助（记录验证警告行为）
- [x] 9.4 为未来命令集成创建迁移指南（openspec/MIGRATION.md）