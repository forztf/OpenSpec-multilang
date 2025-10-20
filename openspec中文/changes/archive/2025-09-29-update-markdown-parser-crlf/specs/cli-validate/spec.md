## 新增要求
### 要求：解析器应处理跨平台行尾
markdown 解析器应正确识别部分，无论行尾格式如何（LF、CRLF、CR）。

#### 场景：使用 CRLF 行尾解析必需部分
- **假设** 一个保存为 CRLF 行尾的变更提案 markdown
- **并且** 文档包含 `## Why` 和 `## What Changes`
- **当** 运行 `openspec validate <change-id>` 时
- **则** 验证应识别部分且不引发解析错误