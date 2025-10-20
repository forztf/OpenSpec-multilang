## 1. 防护回归
- [x] 1.1 添加一个单元测试，将 CRLF 变更文档输入到 `MarkdownParser.parseChange` 并断言检测到 `Why`/`What Changes`。
- [x] 1.2 添加一个 CLI 启动/端到端测试，写入 CRLF 变更，运行 `openspec validate`，并期望成功。

## 2. 规范化解析
- [x] 2.1 在构建 `MarkdownParser` 时规范化行尾，使标题和内容比较忽略 `\r`。
- [x] 2.2 确保所有 CLI 入口点（验证、查看、规范转换）重用规范化解析器路径。

## 3. 记录和验证
- [x] 3.1 使用涵盖 CRLF 行尾的场景更新 `cli-validate` 规范。
- [x] 3.2 运行解析器和 CLI 测试套件（`pnpm test`，相关启动测试）以确认修复。