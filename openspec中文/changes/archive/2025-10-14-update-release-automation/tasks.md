## 1. 发布工作流自动化
- [x] 1.1 添加 `.github/workflows/release.yml`，在推送到 `main` 分支时运行，设置 pnpm + Node 20，安装依赖项，并使用 `publish: pnpm run release` 调用 `changesets/action@v1`
- [x] 1.2 配置 action 使用 `createGithubReleases: true`，并记录所需的密钥（`NPM_TOKEN`，默认 `GITHUB_TOKEN`）以及建议的并发保护措施
- [x] 1.3 使用 `act` 或干运行推送验证工作流，确认 action 在存在 changesets 时打开发布 PR，并在发布 PR 合并时发布

## 2. 包发布脚本
- [x] 2.1 向 `package.json` 添加 `release` 脚本，构建项目并使用 pnpm 运行 `changeset publish`
- [x] 2.2 确保脚本尊重现有的 `prepare`/`prepublishOnly` 钩子以避免重复构建，并根据需要更新文档或脚本

## 3. 文档和恢复步骤
- [x] 3.1 更新维护者文档（例如 README 或 `/docs`），包含端到端的自动化发布流程，明确删除不再需要的手动标签/发布步骤，并解释 changesets 如何驱动发布 PR
- [x] 3.2 记录发布失败时的回退步骤（重新运行工作流，手动发布）以及在没有待处理 changesets 时需要发布时的热修复路径