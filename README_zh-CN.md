<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec">
    <picture>
      <source srcset="assets/openspec_pixel_dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="assets/openspec_pixel_light.svg" media="(prefers-color-scheme: light)">
      <img src="assets/openspec_pixel_light.svg" alt="OpenSpec logo" height="64">
    </picture>
  </a>

</p>
<p align="center">面向 AI 编程助手的规范驱动开发框架。</p>
<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/@fission-ai/openspec"><img alt="npm version" src="https://img.shields.io/npm/v/@fission-ai/openspec?style=flat-square" /></a>
  <a href="https://nodejs.org/"><img alt="node version" src="https://img.shields.io/node/v/@fission-ai/openspec?style=flat-square" /></a>
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" /></a>
  <a href="https://conventionalcommits.org"><img alt="Conventional Commits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square" /></a>
  <a href="https://discord.gg/YctCnvvshC"><img alt="Discord" src="https://img.shields.io/badge/Discord-Join%20the%20community-5865F2?logo=discord&logoColor=white&style=flat-square" /></a>
</p>

<p align="center">
  <img src="assets/openspec_dashboard.png" alt="OpenSpec dashboard preview" width="90%">
</p>

<p align="center">
  关注 <a href="https://x.com/0xTab">@0xTab on X</a> 获取更新 · 加入 <a href="https://discord.gg/YctCnvvshC">OpenSpec Discord</a> 获取帮助和解答问题
</p>

# OpenSpec

OpenSpec 通过规范驱动开发来协调人类和 AI 编程助手，确保在编写任何代码之前就达成一致的构建目标。**无需 API 密钥。**

## 为什么选择 OpenSpec？

当需求分散在聊天记录中时，AI 编程助手虽然强大但难以预测。OpenSpec 添加了一个轻量级的规范工作流，在实施之前锁定意图，为您提供确定性的、可审查的输出。

关键成果：
- 人类和 AI 利益相关者在工作开始前就规范达成一致
- 结构化的变更文件夹（提案、任务和规范更新）保持范围明确且可审计
- 共享可见性，了解哪些内容被提议、活跃或已归档
- 与您已使用的 AI 工具配合使用：在支持的平台上使用自定义斜杠命令，在其他地方使用上下文规则

## OpenSpec 对比概览

- **轻量级**：简单的工作流，无需 API 密钥，最小化设置
- **面向现有项目**：在 0→1 之外表现优异。OpenSpec 将事实来源与提案分开：`openspec/specs/`（当前事实）和 `openspec/changes/`（提议的更新）。这使得跨功能的差异明确且易于管理
- **变更跟踪**：提案、任务和规范差异共存；归档将批准的更新合并回规范中
- **与 spec-kit & Kiro 对比**：这些工具在全新功能（0→1）方面表现出色。OpenSpec 在修改现有行为（1→n）方面同样出色，特别是在更新涉及多个规范时

完整对比请参见 [OpenSpec 对比](#openspec-对比)。

## 工作原理

```
┌────────────────────┐
│ 起草变更提案         │
└────────┬───────────┘
         │ 与您的 AI 共享意图
         ▼
┌────────────────────┐
│ 审查与对齐           │
│ (编辑规范/任务)      │◀──── 反馈循环 ──────────┐
└────────┬───────────┘                        │
         │ 批准的计划                           │
         ▼                                    │
┌────────────────────┐                        │
│ 实施任务            │────────────────────────┘
│ (AI 编写代码)       │
└────────┬───────────┘
         │ 交付变更
         ▼
┌────────────────────┐
│ 归档与更新规范       │
│ (事实来源)          │
└────────────────────┘

1. 起草一个变更提案，捕获您想要的规范更新
2. 与您的 AI 助手一起审查提案，直到所有人达成一致
3. 实施引用已达成一致的规范的任务
4. 归档变更，将批准的更新合并回事实来源规范中
```

## 快速开始

### 支持的 AI 工具

#### 原生斜杠命令
这些工具具有内置的 OpenSpec 命令。在提示时选择 OpenSpec 集成。

| 工具 | 命令 |
|------|----------|
| **Claude Code** | `/openspec:proposal`, `/openspec:apply`, `/openspec:archive` |
| **Cursor** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| **Factory Droid** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.factory/commands/`) |
| **OpenCode** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| **Kilo Code** | `/openspec-proposal.md`, `/openspec-apply.md`, `/openspec-archive.md` (`.kilocode/workflows/`) |
| **Windsurf** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.windsurf/workflows/`) |
| **Codex** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (全局: `~/.codex/prompts`, 自动安装) |
| **GitHub Copilot** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.github/prompts/`) |
| **Amazon Q Developer** | `@openspec-proposal`, `@openspec-apply`, `@openspec-archive` (`.amazonq/prompts/`) |

Kilo Code 自动发现团队工作流。将生成的文件保存在 `.kilocode/workflows/` 下，并通过 `/openspec-proposal.md`、`/openspec-apply.md` 或 `/openspec-archive.md` 从命令面板触发它们。

#### AGENTS.md 兼容
这些工具自动从 `openspec/AGENTS.md` 读取工作流指令。如果它们需要提醒，请要求它们遵循 OpenSpec 工作流。了解更多关于 [AGENTS.md 约定](https://agents.md/)。

| 工具 |
|-------|
| Amp • Jules • Gemini CLI • 其他 |

### 安装与初始化

#### 先决条件
- **Node.js >= 20.19.0** - 使用 `node --version` 检查您的版本

#### 步骤 1：全局安装 CLI

```bash
npm install -g @fission-ai/openspec@latest
```

验证安装：
```bash
openspec --version
```

#### 步骤 2：在您的项目中初始化 OpenSpec

导航到您的项目目录：
```bash
cd my-project
```

运行初始化：
```bash
openspec init
```

**初始化期间会发生什么：**
- 您将被提示选择任何原生支持的 AI 工具（Claude Code、Cursor、OpenCode 等）；其他助手始终依赖于共享的 `AGENTS.md` 存根
- OpenSpec 自动为您选择的工具配置斜杠命令，并始终在项目根目录写入托管的 `AGENTS.md` 交接文件
- 在您的项目中创建新的 `openspec/` 目录结构

**设置完成后：**
- 主要 AI 工具可以在没有额外配置的情况下触发 `/openspec` 工作流
- 运行 `openspec list` 验证设置并查看任何活跃的变更
- 如果您的编程助手没有立即显示新的斜杠命令，请重新启动它。斜杠命令在启动时加载，因此重新启动可确保它们出现

### 创建您的第一个变更

这是一个完整的 OpenSpec 工作流的真实示例。这适用于任何 AI 工具。具有原生斜杠命令的工具将自动识别快捷方式。

#### 1. 起草提案
首先要求您的 AI 创建一个变更提案：

```text
您：创建一个 OpenSpec 变更提案，用于添加按角色和团队筛选的配置文件搜索功能
     （对于具有斜杠命令的工具的快捷方式：/openspec:proposal 添加配置文件搜索筛选器）

AI：我将为配置文件筛选器创建一个 OpenSpec 变更提案。
     *搭建 openspec/changes/add-profile-filters/ 包含 proposal.md、tasks.md、规范差异*
```

#### 2. 验证与审查
检查变更是否正确创建并审查提案：

```bash
$ openspec list                             # 确认变更文件夹存在
$ openspec validate add-profile-filters     # 验证规范格式
$ openspec show add-profile-filters         # 审查提案、任务和规范差异
```

#### 3. 完善规范
迭代规范直到它们符合您的需求：

```text
您：您能为角色和团队筛选器添加验收标准吗？

AI：我将使用角色和团队筛选器的场景更新规范差异。
     *编辑 openspec/changes/add-profile-filters/specs/profile/spec.md 和 tasks.md*
```

#### 4. 实施变更
一旦规范看起来良好，开始实施：

```text
您：规范看起来不错。让我们实施这个变更。
     （对于具有斜杠命令的工具的快捷方式：/openspec:apply add-profile-filters）

AI：我将处理 add-profile-filters 变更中的任务。
     *实施来自 openspec/changes/add-profile-filters/tasks.md 的任务*
     *标记任务完成：任务 1.1 ✓, 任务 1.2 ✓, 任务 2.1 ✓...*
```

#### 5. 归档已完成的变更
实施完成后，归档变更：

```text
AI：所有任务已完成。实施已准备就绪。

您：请归档变更
     （对于具有斜杠命令的工具的快捷方式：/openspec:archive add-profile-filters）

AI：我将归档 add-profile-filters 变更。
    *运行：openspec archive add-profile-filters --yes*
     ✓ 变更已成功归档。规范已更新。准备下一个功能！
```

或者自己在终端中运行命令：
```bash
$ openspec archive add-profile-filters --yes  # 无需提示归档已完成的变更
```

**注意：** 具有原生斜杠命令的工具（Claude Code、Cursor、Codex）可以使用显示的快捷方式。所有其他工具都可以使用自然语言请求来"创建 OpenSpec 提案"、"应用 OpenSpec 变更"或"归档变更"。

## 命令参考

```bash
openspec list               # 查看活跃的变更文件夹
openspec view               # 规范和变更的交互式仪表板
openspec show <change>      # 显示变更详情（提案、任务、规范更新）
openspec validate <change>  # 检查规范格式和结构
openspec archive <change> [--yes|-y]   # 将已完成的变更移动到 archive/（使用 --yes 为非交互式）
```

## 示例：AI 如何创建 OpenSpec 文件

当您要求您的 AI 助手"添加双因素认证"时，它会创建：

```
openspec/
├── specs/
│   └── auth/
│       └── spec.md           # 当前认证规范（如果存在）
└── changes/
    └── add-2fa/              # AI 创建整个结构
        ├── proposal.md       # 为什么和什么变更
        ├── tasks.md          # 实施清单
        ├── design.md         # 技术决策（可选）
        └── specs/
            └── auth/
                └── spec.md   # 显示添加内容的差异
```

### AI 生成的规范（在 `openspec/specs/auth/spec.md` 中创建）：

```markdown
# 认证规范

## 目的
认证和会话管理。

## 要求
### 要求：用户认证
系统应在成功登录时颁发 JWT。

#### 场景：有效凭据
- 当用户提交有效凭据时
- 然后返回 JWT
```

### AI 生成的变更差异（在 `openspec/changes/add-2fa/specs/auth/spec.md` 中创建）：

```markdown
# 认证变更差异

## 新增要求
### 要求：双因素认证
系统必须在登录期间要求第二个因素。

#### 场景：需要 OTP
- 当用户提交有效凭据时
- 然后需要 OTP 挑战
```

### AI 生成的任务（在 `openspec/changes/add-2fa/tasks.md` 中创建）：

```markdown
## 1. 数据库设置
- [ ] 1.1 向用户表添加 OTP 密钥列
- [ ] 1.2 创建 OTP 验证日志表

## 2. 后端实现
- [ ] 2.1 添加 OTP 生成端点
- [ ] 2.2 修改登录流程以要求 OTP
- [ ] 2.3 添加 OTP 验证端点

## 3. 前端更新
- [ ] 3.1 创建 OTP 输入组件
- [ ] 3.2 更新登录流程 UI
```

**重要：** 您不需要手动创建这些文件。您的 AI 助手根据您的需求和现有代码库生成它们。

## 理解 OpenSpec 文件

### 差异格式

差异是显示规范如何变化的"补丁"：

- **`## 新增要求`** - 新功能
- **`## 修改的要求`** - 更改的行为（包含完整的更新文本）
- **`## 删除的要求`** - 已弃用的功能

**格式要求：**
- 使用 `### 要求：<名称>` 作为标题
- 每个要求至少需要一个 `#### 场景：` 块
- 在要求文本中使用 SHALL/MUST

## OpenSpec 对比

### 与 spec-kit 对比
OpenSpec 的双文件夹模型（`openspec/specs/` 用于当前事实，`openspec/changes/` 用于提议的更新）保持状态和差异分离。这在您修改现有功能或涉及多个规范时具有扩展性。spec-kit 在全新项目/0→1 方面很强，但对于跨规范更新和演进功能提供的结构较少。

### 与 Kiro.dev 对比
OpenSpec 将每个功能的变更分组在一个文件夹中（`openspec/changes/功能名称/`），使得跟踪相关规范、任务和设计变得容易。Kiro 将更新分散在多个规范文件夹中，这可能使功能跟踪更加困难。

### 与无规范对比
没有规范的情况下，AI 编程助手根据模糊提示生成代码，经常遗漏需求或添加不需要的功能。OpenSpec 通过在编写任何代码之前就期望行为达成一致来带来可预测性。

## 团队采用

1. **初始化 OpenSpec** – 在您的仓库中运行 `openspec init`
2. **从新功能开始** – 要求您的 AI 将即将进行的工作捕获为变更提案
3. **逐步增长** – 每个变更都归档到记录您系统的活动规范中
4. **保持灵活性** – 不同的团队成员可以使用 Claude Code、Cursor 或任何 AGENTS.md 兼容的工具，同时共享相同的规范

每当有人切换工具时运行 `openspec update`，以便您的代理获取最新的指令和斜杠命令绑定。

## 更新 OpenSpec

1. **升级包**
   ```bash
   npm install -g @fission-ai/openspec@latest
   ```
2. **刷新代理指令**
   - 在每个项目内运行 `openspec update` 以重新生成 AI 指导并确保最新的斜杠命令处于活动状态

## 贡献

- 安装依赖：`pnpm install`
- 构建：`pnpm run build`
- 测试：`pnpm test`
- 本地开发 CLI：`pnpm run dev` 或 `pnpm run dev:cli`
- 常规提交（单行）：`type(scope): subject`

## 许可证

MIT