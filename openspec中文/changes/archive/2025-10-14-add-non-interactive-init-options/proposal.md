## 为什么
当前的 `openspec init` 命令需要交互式提示，阻止了 CI/CD 管道和脚本设置中的自动化。添加非交互选项将为自动化工作流启用程序化初始化，同时将现有的交互体验保持为默认设置。

## 变更内容
- 用接受 `all`、`none` 或逗号分隔的工具 ID 列表的单个 `--tools` 选项替换多个标志设计
- 更新 InitCommand，当提供 `--tools` 时绕过交互式提示并应用单标志验证规则
- 通过 CLI 初始化规范增量记录非交互行为（`all`、`none`、列表解析和无效条目的场景）
- 从 `AI_TOOLS` 动态生成 CLI 帮助文本，使支持的工具保持同步

## 影响
- 受影响的规范：`specs/cli-init/spec.md`
- 受影响的代码：`src/cli/index.ts`、`src/core/init.ts`