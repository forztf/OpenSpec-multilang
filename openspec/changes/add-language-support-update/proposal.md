# 为 Update 命令添加语言支持

## Why

当前的 `openspec update` 命令在更新模板文件时总是使用英文版本，这会导致以下问题：

1. **语言不一致性**：如果开发者使用 `openspec init --language zh-CN` 初始化了中文项目，后续执行 `openspec update` 时会将所有模板文件覆盖为英文版本，破坏了项目的语言一致性。

2. **用户体验差**：中文开发者需要在每次更新后手动恢复中文内容，增加了维护成本。

3. **自动化流程受阻**：在 CI/CD 或自动化工作流中，无法保持项目的语言设置，影响了规格驱动开发的连续性。

添加语言支持将确保 `openspec update` 能够智能检测并保持项目的语言设置，提供一致的多语言体验。

## What Changes

### 语言检测机制
- 实现智能语言检测，按以下优先级确定使用的语言：
  1. **命令行参数**：`openspec update --language zh-CN` 或 `--language zh-cn`（最高优先级）
  2. **现有文件推断**：检查 `openspec/AGENTS.md` 文件内容，识别中文字符
  3. **环境变量**：检查系统 `LANG` 环境变量（如 `zh_CN.UTF-8`、`zh_cn.UTF-8`）
  4. **默认回退**：使用英文作为默认语言

### 核心功能增强
- 在 `UpdateCommand` 中添加语言参数支持
- 根据检测到的语言选择相应的模板（中文或英文）
- 确保所有更新的文件（AGENTS.md、slash commands）都使用一致的语言
- 添加 `--language` 命令行选项，与 `init` 命令保持一致

### 技术实现
- 创建 `LanguageDetector` 类，支持多种中文语言代码格式：
  - 标准格式：`zh-CN`、`en-US`
  - 小写格式：`zh-cn`、`en-us`
  - 简化格式：`zh`、`en`
  - 环境变量格式：`zh_CN.UTF-8`、`zh_cn.UTF-8`
- 修改 `TemplateManager` 以支持语言参数传递
- 更新 CLI 参数解析，添加 `--language` 选项
- 确保向后兼容性，默认行为保持不变

## Impact

### 受影响的规格
- `specs/cli-update/spec.md` - 需要添加语言支持的规格说明

### 受影响的代码
- `src/core/update.ts` - 添加语言检测和参数支持
- `src/cli/index.ts` - 添加 `--language` 命令行选项
- `src/core/templates/index.ts` - 确保模板管理器支持语言参数

### 新增文件
- `src/utils/language-detector.ts` - 语言检测工具类

### 向后兼容性
- 默认行为保持不变（使用英文）
- 现有的 `openspec update` 命令继续正常工作
- 只有在明确指定语言或检测到中文项目时才使用中文模板

### 用户体验改进
- 中文项目在更新后保持中文
- 支持显式语言覆盖
- 与 `init` 命令的语言选项保持一致