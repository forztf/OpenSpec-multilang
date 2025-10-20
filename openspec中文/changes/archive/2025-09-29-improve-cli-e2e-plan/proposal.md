## 为什么
最近 `openspec` 命令的跨shell回归揭示了我们现有的单元/集成测试没有练习打包的CLI或shell特定行为。之前的Vitest启动测试尝试因为将e2e覆盖与 `pnpm pack` 安装耦合而停滞，这在网络受限环境中失败。结合这些发现，我们现在需要一个批准的计划来重新对齐工作。

## 变更内容
- 采用分阶段策略，首先使用轻量级夹具和共享 `runCLI` 助手稳定构建CLI（`node dist/cli/index.js`）的直接启动测试。
- 一旦启动工具稳定，扩展覆盖范围，保持初始矩阵专注于Linux/macOS的bash作业和Windows的 `pwsh`，同时练习直接 `node dist/cli/index.js` 调用和带有非TTY默认值和捕获诊断的bin垫片。
- 将打包/安装验证视为可选的CI保障：当运行器有注册表访问权限时，运行简单的基于pnpm的打包→安装→冒烟测试流程；否则将其记录为超出范围，同时关闭剩余的强化项目。
- 完成剩余的跨shell强化项目：确保 `.gitattributes` 覆盖打包资产，在CI期间为CLI垫片强制执行可执行位，并完成待处理的SIGINT处理改进。

## 影响
- 测试：添加 `test/cli-e2e` 启动套件，创建共享 `runCLI` 助手，并根据需要调整 `vitest.setup.ts`。
- 工具：使用上述轻量级矩阵更新GitHub Actions工作流，并（可选）在网络可用时添加打包安装检查。
- 文档：在本提案（或相关规范）中记录阶段进度和任何限制，以便未来阶段有清晰的上下文。

## 第一阶段状态
- 共享 `test/helpers/run-cli.ts` 保证CLI捆绑包在启动前存在，并为每次调用强制执行非TTY默认值。
- 新的 `test/cli-e2e/basic.test.ts` 覆盖 `--help`、`--version`、成功的 `validate --all --json` 和针对 `tmp-init` 夹具副本的未知项目错误路径。
- 遗留的顶层 `validate` 执行测试现在依赖 `runCLI`，避免手动 `execSync` 使用，同时保持其夹具创作完整。
- CI矩阵基础工作已就位（Linux/macOS上的bash，Windows上的pwsh），因此启动套件以与助手相同的方式在支持的shell中运行。