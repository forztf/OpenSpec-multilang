# CLI Init 规格增量变更

## ADDED Requirements

### Requirement: 语言选择支持
命令 SHALL 支持为生成的模板文件和指令提供多种语言，以适应非英语开发者的需求。

#### Scenario: 交互式语言选择
- **WHEN** 在交互模式下运行 `openspec init`
- **THEN** 提示用户从可用选项中选择首选语言（英语、中文）
- **AND** 使用所选语言生成模板文件

#### Scenario: 非交互式语言指定
- **WHEN** 运行 `openspec init --language zh-CN` 或 `openspec init --lang zh-CN`
- **THEN** 使用中文生成所有模板文件和指令
- **AND** 跳过语言选择提示

#### Scenario: 默认语言行为
- **WHEN** 未指定语言
- **THEN** 默认使用英语 (en) 以保持向后兼容性
- **AND** 生成英文模板文件

#### Scenario: 无效语言指定
- **WHEN** 使用不支持的语言代码运行
- **THEN** 以退出代码 1 退出并显示可用语言选项
- **AND** 显示指示支持语言的错误消息

### Requirement: 本地化模板生成
命令 SHALL 生成适合所选语言的模板文件内容。

#### Scenario: 中文模板生成
- **WHEN** 选择中文语言
- **THEN** 生成带有中文标题和占位符文本的 `openspec/project.md`
- **AND** 生成带有中文 AI 助手指令的 `openspec/AGENTS.md`
- **AND** 生成带有中文 AI 助手指令的根目录 `AGENTS.md`
- **AND** 显示中文进度指示器和成功消息

#### Scenario: 英文模板生成（现有行为）
- **WHEN** 选择英语或未指定语言
- **THEN** 按照当前行为生成英文模板
- **AND** 保持现有的英文文本和指令

### Requirement: 语言感知的成功输出
命令 SHALL 使用所选语言显示成功消息和后续步骤。

#### Scenario: 中文成功输出
- **WHEN** 使用中文语言完成初始化
- **THEN** 使用中文显示成功消息和后续步骤
- **AND** 提供中文的 AI 助手交互提示

#### Scenario: 英文成功输出
- **WHEN** 使用英语完成初始化
- **THEN** 按照当前行为使用英文显示成功消息和后续步骤

### Requirement: 根目录 AI 指令本地化
命令 SHALL 在根目录生成语言适配的 AI 助手指令文件。

#### Scenario: 中文根目录指令
- **WHEN** 选择中文语言
- **THEN** 在项目根目录生成中文版本的 `AGENTS.md` 文件
- **AND** 包含中文的 AI 助手使用指南和项目上下文说明
- **AND** 明确指定 AI 助手应使用中文与开发者交流

#### Scenario: 英文根目录指令
- **WHEN** 选择英语或未指定语言
- **THEN** 在项目根目录生成英文版本的 `AGENTS.md` 文件
- **AND** 保持现有的英文指令内容
- **AND** 明确指定 AI 助手应使用英文与开发者交流

### Requirement: AI 交流语言明确性
命令 SHALL 在生成的 AI 指令文件中明确指定 AI 助手的交流语言。

#### Scenario: 中文交流语言指定
- **WHEN** 选择中文语言
- **THEN** 在根目录 `AGENTS.md` 中包含明确的中文交流指令
- **AND** 指示 AI 助手在所有交互中使用中文回应

#### Scenario: 英文交流语言指定
- **WHEN** 选择英语或未指定语言
- **THEN** 在根目录 `AGENTS.md` 中包含明确的英文交流指令
- **AND** 指示 AI 助手在所有交互中使用英文回应