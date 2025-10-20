## 1. 第一阶段 – 稳定本地启动覆盖
- [x] 1.1 添加 `test/helpers/run-cli.ts` 确保构建运行一次并使用非TTY默认值执行 `node dist/cli/index.js`；更新 `vitest.setup.ts` 以重用共享构建步骤。
- [x] 1.2 使用最小夹具集（`tmp-init` 或副本）播种 `test/cli-e2e` 以覆盖帮助/版本、快乐路径 `validate` 和通过新助手的代表性错误流。
- [x] 1.3 将最高价值的现有 CLI 执行测试（例如，validate）迁移到 `runCLI` 并在此提案中总结第一阶段覆盖以供下一阶段使用。

## 2. 第二阶段 – 扩展跨Shell验证
- [x] 2.1 在启动套件中练习两个入口点（`node dist/cli/index.js`、`bin/openspec.js`）并为shell/OS上下文添加诊断。
- [x] 2.2 扩展 GitHub Actions 以在 Linux/macOS 的 bash 作业和 Windows 的 `pwsh` 作业上运行启动套件；捕获 shell/OS 诊断并记录后续的其他 shell。