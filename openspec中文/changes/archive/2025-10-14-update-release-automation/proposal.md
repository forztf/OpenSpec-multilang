## 为什么
当前流程要求维护者合并 Changesets PR、手动创建标签并起草 GitHub 发布。npm 发布在我们现有的工作流在 GitHub 发布后运行。人工干预步骤（版本控制、标签管理、发布说明）拖慢了我们的速度，并可能导致 npm、标签和变更日志之间的不一致。

## 变更内容
- 使用单一的 `changesets/action` 在推送到 `main` 分支时，要么打开发布/更新版本 PR，要么在发布 PR 合并时自动使用仓库密钥运行我们的发布命令
- 添加一个 `release` 脚本，构建并运行 `changeset publish`，使 action 能够端到端地处理版本更新、变更日志提交、npm 发布和 GitHub 发布
- 启用 `createGithubReleases: true`，以便在发布后立即从 changeset 数据创建 GitHub 发布
- 记录自动化流程、所需的密钥、保护措施和恢复步骤（回滚、热修复）

## 两阶段部署（两个 PR）
1) 阶段 1 — 干运行（不发布）
   - 更新现有的 `release-prepare.yml`，使用 `createGithubReleases: true` 连接 `changesets/action`，并设置无操作的 `publish` 命令（例如 `echo 'dry run'`）
   - 保持 `.github/workflows/release-publish.yml` 不变。这避免在我们验证版本 PR 行为和权限正确性时更改发布路径
   - 添加仓库保护（`if: github.repository == 'Fission-AI/OpenSpec'`）和并发组以确保安全

2) 阶段 2 — 启用发布并整合
   - 向 `package.json` 添加 `"release": "pnpm run build && pnpm exec changeset publish"`
   - 更改 `release-prepare.yml` 使用 `with: publish: pnpm run release` 和 `env: NPM_TOKEN: \\${{ secrets.NPM_TOKEN }}` 加上默认的 `GITHUB_TOKEN`
   - 移除 `.github/workflows/release-publish.yml` 以避免重复发布。发布现在在版本 PR 合并时发生

## 保护措施
- 并发性：在工作流上设置 `concurrency: { group: release-\\${{ github.ref }}, cancel-in-progress: false }` 以序列化发布
- 仓库/分支保护：仅在上游 `main` 分支上运行发布逻辑（`if: github.repository == 'Fission-AI/OpenSpec' && github.ref == 'refs/heads/main'`）
- 权限：确保 `contents: write` 和 `pull-requests: write` 用于打开/更新版本 PR；`packages: read` 可选

## 回滚和热修复
- 回滚：撤销发布 PR 合并（这会撤销版本更新/变更日志）；如果创建了标签或 GitHub 发布，删除标签和发布；必要时弃用 npm 版本（`npm deprecate @fission-ai/openspec@x.y.z 'reason'`）
- 热修复（紧急，无待处理 changesets）：为修复创建 changeset 并合并发布 PR；在紧急情况下，运行手动更新/发布，但通过与 Changesets 协调，通过添加后续 changeset 来对齐版本

## 所需密钥
- 具有 `@fission-ai` 范围发布权限的 `NPM_TOKEN`
- 默认的 `GITHUB_TOKEN`（由 GitHub 提供），用于打开/更新版本 PR 和创建 GitHub 发布

## 维护者流程变更
| 步骤 | 当前流程 | 未来流程 |
| --- | --- | --- |
| 准备发布 | 合并 changeset PR，然后手动起草发布说明和标签 | 合并发布 PR；action 自动更新版本和处理变更日志 |
| 发布 npm 包 | 在 GitHub 发布后自动发生 | 通过 action 调用的 `changeset publish` 自动发生 |
| GitHub 发布 | 手动起草并与变更日志同步 | Action 从 changeset 数据创建 GitHub 发布 |
| 文档/流程 | 遵循手动标签/发布步骤 | 文档描述自动化流程 + 恢复和热修复路径 |

## 影响
- 自动化：重用 `.github/workflows/release-prepare.yml`（阶段 1：干运行，阶段 2：发布）并在阶段 2 移除 `.github/workflows/release-publish.yml`
- 包元数据：向 `package.json` 添加 `release` 脚本
- 文档：更新 README 或 `/docs` 以显示自动化流程、密钥、保护措施和恢复步骤

## 验收标准
- 阶段 1：合并到 `main` 分支打开/更新版本 PR；合并时，action 的 `publish` 步骤是无操作的；不发生 npm 发布；日志确认预期行为；GitHub 发布创建已连接但由于无发布而无效
- 阶段 2：合并到 `main` 分支从 action 运行 `pnpm run release`；npm 包成功发布；GitHub 发布自动创建；`.github/workflows/release-publish.yml` 被移除；不发生重复发布