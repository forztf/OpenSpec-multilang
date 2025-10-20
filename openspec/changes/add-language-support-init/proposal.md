# 为 Init 命令添加语言支持

## Why

当前的 `openspec init` 命令只生成英文模板文件和指令，这对非英文开发者（特别是中文开发者）造成了使用障碍。许多开发团队更倾向于使用母语进行项目文档和规格编写，以提高团队协作效率和理解准确性。

添加语言支持将使 OpenSpec 能够服务更广泛的国际开发者社区，特别是中文开发者群体，让他们能够用熟悉的语言进行规格驱动开发。

## What Changes

- 在 `openspec init` 命令中添加语言选择功能
- 支持生成中文版本的模板文件（project.md、AGENTS.md、agents-root-stub）
- 添加 `--language` 或 `--lang` 命令行选项，支持 `en`（英文）和 `zh-CN`（中文）
- 在交互模式中添加语言选择提示
- 根据选择的语言生成相应的模板内容和指令文件
- 为 agents-root-stub 模板添加多语言支持，确保根目录的 AI 指令文件也能本地化
- 在 agents-root-stub 模板中明确指定 AI 助手的交流语言要求，确保 AI 使用正确的语言与开发者交流

## 影响

- 受影响的规格：`specs/cli-init/spec.md`
- 受影响的代码：
  - `src/core/init.ts` - 添加语言选择逻辑
  - `src/core/templates/` - 添加中文模板文件
  - `src/core/templates/agents-root-stub.ts` - 添加多语言支持
  - `src/cli/index.ts` - 添加语言命令行选项
- 新增文件：
  - 中文版本的模板文件
  - `src/core/templates/agents-root-stub-zh.ts` - 中文版 agents-root-stub 模板
- 向后兼容：默认保持英文，不影响现有用户体验