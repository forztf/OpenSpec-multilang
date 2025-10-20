# @fission-ai/openspec

## 0.12.0

### 次要变更

- 082abb4: 为斜杠命令和非交互式初始化选项添加工厂函数支持

  此版本包括两个新功能：

  - **斜杠命令的工厂函数支持**：斜杠命令现在可以定义为返回命令对象的函数，实现动态命令配置
  - **非交互式初始化选项**：为 `openspec init` 添加了 `--tools`、`--all-tools` 和 `--skip-tools` CLI 标志，用于在 CI/CD 管道中进行自动化初始化，同时保持与交互模式的向后兼容性

## 0.11.0

### 次要变更

- 312e1d6: 添加 Amazon Q Developer CLI 集成。OpenSpec 现在支持 Amazon Q Developer，在 `.amazonq/prompts/` 目录中自动生成提示，允许您使用 Amazon Q 的 @-语法与 OpenSpec 斜杠命令。

## 0.10.0

### 次要变更

- d7e0ce8: 改进初始化向导 Enter 键行为，允许更自然地通过提示

## 0.9.2

### 补丁变更

- 2ae0484: 修复跨平台路径处理问题。此版本包括对 joinPath 行为和斜杠命令路径解析的修复，以确保 OpenSpec 在所有平台上正确工作。

## 0.9.1

### 补丁变更

- 8210970: 修复在 Windows 上选择 Codex 集成时 OpenSpec 无法工作的问题。此版本包括跨平台路径处理和标准化的修复，以确保 OpenSpec 在 Windows 系统上正确工作。

## 0.9.0

### 次要变更

- efbbf3b: 添加对 Codex 和 GitHub Copilot 斜杠命令的支持，包括 YAML frontmatter 和 $ARGUMENTS

## 未发布

### 次要变更

- 添加 GitHub Copilot 斜杠命令支持。OpenSpec 现在将提示写入 `.github/prompts/openspec-{proposal,apply,archive}.prompt.md`，包含 YAML frontmatter 和 `$ARGUMENTS` 占位符，并在 `openspec update` 时刷新它们。

## 0.8.1

### 补丁变更

- d070d08: 修复 CLI 版本不匹配问题，并添加发布保护，通过 `openspec --version` 验证打包的 tarball 打印与 package.json 相同的版本。

## 0.8.0

### 次要变更

- c29b06d: 添加 Windsurf 支持。
- 添加 Codex 斜杠命令支持。OpenSpec 现在直接将提示写入 Codex 的全局目录（`~/.codex/prompts` 或 `$CODEX_HOME/prompts`）并在 `openspec update` 时刷新它们。

## 0.7.0

### 次要变更

- 添加原生 Kilo Code 工作流集成，使 `openspec init` 和 `openspec update` 管理 `.kilocode/workflows/openspec-*.md` 文件。
- 始终搭建托管的根 `AGENTS.md` 交接存根，并在初始化/更新期间重新分组 AI 工具提示以保持指令一致性。

## 0.6.0

### 次要变更

- 将生成的根代理指令精简为托管的交接存根，并更新初始化/更新流程以安全地刷新它。

## 0.5.0

### 次要变更

- feat: 实现第 1 阶段端到端测试，包括跨平台 CI 矩阵

  - 在 test/helpers/run-cli.ts 中添加共享的 runCLI 助手用于 spawn 测试
  - 创建 test/cli-e2e/basic.test.ts 覆盖帮助、版本、验证流程
  - 将现有的 CLI exec 测试迁移到使用 runCLI 助手
  - 将 CI 矩阵扩展到 bash（Linux/macOS）和 pwsh（Windows）
  - 为优化反馈拆分 PR 和主要工作流

### 补丁变更

- 使应用指令更具体

  改进代理模板和斜杠命令模板，提供更具体和可操作的应用指令。

- docs: 改进文档和清理

  - 记录归档命令的非交互式标志
  - 替换 README 中的 Discord 徽章
  - 归档已完成的变更以更好地组织

## 0.4.0

### 次要变更

- 为 CLI 改进和增强用户体验添加 OpenSpec 变更提案
- 为 AI 驱动开发工作流添加 Opencode 斜杠命令支持

### 补丁变更

- 添加文档改进，包括归档命令模板的 --yes 标志和 Discord 徽章
- 修复 markdown 解析器中的规范化行尾以正确处理 CRLF 文件

## 0.3.0

### 次要变更

- 通过扩展模式、多工具选择和交互式 `AGENTS.md` 配置器增强 `openspec init`。

## 0.2.0

### 次要变更

- ce5cead: - 添加 `openspec view` 仪表板，一目了然地汇总规范计数和变更进度
  - 生成和更新 AI 斜杠命令以及重命名的 `openspec/AGENTS.md` 指令文件
  - 移除已弃用的 `openspec diff` 命令并将用户引导到 `openspec show`

## 0.1.0

### 次要变更

- 24b4866: 初始发布