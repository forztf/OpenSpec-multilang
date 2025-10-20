# 改进验证错误消息

## 为什么

开发人员难以解决验证失败，因为当前错误缺乏可操作的指导。常见问题包括：缺失增量、缺失必需部分，以及被静默忽略的格式错误场景。没有明确的补救步骤，用户无法快速纠正结构或格式，导致挫败感和返工。通过具体的修复、文件/部分提示和建议命令改进错误消息将显著减少达到绿色状态的时间并使 OpenSpec 更易于使用。

## 变更内容

- 验证错误应包含具体的补救步骤（要更改什么和在哪里）。
- "未找到增量"错误应指导用户创建带有适当增量标题的 `specs/` 并建议调试命令。
- 缺少必需部分（规范：Purpose/Requirements；变更：Why/What Changes）应包含期望的标题名称和最小骨架示例。
- 可能格式错误的场景（项目符号 WHEN/THEN/AND）应发出定向警告，解释 `#### Scenario:` 格式并显示转换模板。
- 所有报告的问题应包含源文件路径和结构化位置（例如，`deltas[0].requirements[0]`）。
- 无效时，非 JSON 输出应在末尾包含简短的"下一步"页脚。

## 影响

- 受影响的 CLI：validate
- 受影响的代码：
  - `src/commands/validate.ts`
  - `src/core/validation/validator.ts`
  - `src/core/validation/constants.ts`
  - `src/core/parsers/*`（用更丰富上下文包装抛出的错误）