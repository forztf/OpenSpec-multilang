#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil
from pathlib import Path

# 定义翻译映射表
translation_map = {
    # 标题和常用词
    "Technical Design": "技术设计",
    "Architecture Decisions": "架构决策",
    "Implementation": "实现",
    "Why": "原因",
    "What Changes": "变更内容",
    "Impact": "影响",
    "Out of Scope": "范围外",
    "Implementation Tasks": "实现任务",
    "Core Implementation": "核心实现",
    "Error Handling": "错误处理",
    "Testing": "测试",
    "Documentation": "文档",
    "Add": "添加",
    "Update": "更新",
    "Command": "命令",
    "CLI": "CLI",
    "directory": "目录",
    "file": "文件",
    "template": "模板",
    "marker": "标记",
    "task": "任务",
    "tasks": "任务",
    "proposal": "提案",
    "design": "设计",
    "spec": "规范",
    "specs": "规范",
    "validation": "验证",
    "validate": "验证",
    "archive": "归档",
    "init": "初始化",
    "list": "列表",
    "show": "显示",
    "diff": "差异",
    "view": "查看",
    "apply": "应用",
    "change": "变更",
    "changes": "变更",
    "agent": "智能体",
    "agents": "智能体",
    "instruction": "指令",
    "instructions": "指令",
    "workflow": "工作流",
    "workflows": "工作流",
    
    # 动词
    "add": "添加",
    "update": "更新",
    "implement": "实现",
    "implementing": "实现",
    "create": "创建",
    "display": "显示",
    "show": "显示",
    "verify": "验证",
    "test": "测试",
    "handle": "处理",
    "register": "注册",
    "connect": "连接",
    "format": "格式化",
    "scan": "扫描",
    "count": "计数",
    "skip": "跳过",
    "focus": "聚焦",
    "exclude": "排除",
    "include": "包含",
    "manage": "管理",
    "replace": "替换",
    "preserve": "保留",
    "alter": "更改",
    "run": "运行",
    "execute": "执行",
    "fail": "失败",
    "bubble": "冒泡",
    "integrate": "集成",
    "document": "记录",
    "describe": "描述",
    "support": "支持",
    "enable": "启用",
    "disable": "禁用",
    "improve": "改进",
    "enhance": "增强",
    "adopt": "采用",
    "remove": "移除",
    "delete": "删除",
    "modify": "修改",
    "configure": "配置",
    "generate": "生成",
    "capture": "捕获",
    "sort": "排序",
    "select": "选择",
    "parse": "解析",
    "load": "加载",
    "save": "保存",
    "write": "写入",
    "read": "读取",
    
    # 技术术语
    "idempotent": "幂等",
    "atomic": "原子",
    "async": "异步",
    "synchronous": "同步",
    "utility": "工具类",
    "utilities": "工具类",
    "function": "函数",
    "functions": "函数",
    "class": "类",
    "classes": "类",
    "method": "方法",
    "methods": "方法",
    "property": "属性",
    "properties": "属性",
    "variable": "变量",
    "variables": "变量",
    "parameter": "参数",
    "parameters": "参数",
    "argument": "参数",
    "arguments": "参数",
    "return": "返回",
    "error": "错误",
    "errors": "错误",
    "exception": "异常",
    "exceptions": "异常",
    "message": "消息",
    "messages": "消息",
    "output": "输出",
    "input": "输入",
    "data": "数据",
    "configuration": "配置",
    "settings": "设置",
    "options": "选项",
    "option": "选项",
    "flag": "标志",
    "flags": "标志",
    "path": "路径",
    "paths": "路径",
    "url": "URL",
    "uri": "URI",
    "api": "API",
    "json": "JSON",
    "yaml": "YAML",
    "markdown": "Markdown",
    "html": "HTML",
    "css": "CSS",
    "javascript": "JavaScript",
    "typescript": "TypeScript",
    "python": "Python",
    "java": "Java",
    "go": "Go",
    "rust": "Rust",
    "terminal": "终端",
    "console": "控制台",
    "command line": "命令行",
    "shell": "Shell",
    "bash": "Bash",
    "zsh": "Zsh",
    "git": "Git",
    "github": "GitHub",
    "repository": "仓库",
    "repositories": "仓库",
    "branch": "分支",
    "branches": "分支",
    "commit": "提交",
    "commits": "提交",
    "push": "推送",
    "pull": "拉取",
    "merge": "合并",
    "rebase": "变基",
    "clone": "克隆",
    "fork": "派生",
    "pull request": "拉取请求",
    "issue": "问题",
    "issues": "问题",
    "release": "发布",
    "releases": "发布",
    "version": "版本",
    "versions": "版本",
    "tag": "标签",
    "tags": "标签",
    "build": "构建",
    "deploy": "部署",
    "deployment": "部署",
    "server": "服务器",
    "client": "客户端",
    "frontend": "前端",
    "backend": "后端",
    "database": "数据库",
    "cache": "缓存",
    "memory": "内存",
    "disk": "磁盘",
    "network": "网络",
    "http": "HTTP",
    "https": "HTTPS",
    "tcp": "TCP",
    "udp": "UDP",
    "ip": "IP",
    "dns": "DNS",
    "ssl": "SSL",
    "tls": "TLS",
    "authentication": "认证",
    "authorization": "授权",
    "encryption": "加密",
    "decryption": "解密",
    "hash": "哈希",
    "salt": "盐值",
    "token": "令牌",
    "session": "会话",
    "cookie": "Cookie",
    "header": "头部",
    "headers": "头部",
    "body": "主体",
    "payload": "载荷",
    "response": "响应",
    "request": "请求",
    "status": "状态",
    "code": "代码",
    "codes": "代码",
    "log": "日志",
    "logs": "日志",
    "debug": "调试",
    "trace": "追踪",
    "profile": "性能分析",
    "monitor": "监控",
    "alert": "告警",
    "notification": "通知",
    "backup": "备份",
    "restore": "恢复",
    "migrate": "迁移",
    "scale": "扩展",
    "performance": "性能",
    "security": "安全",
    "privacy": "隐私",
    "compliance": "合规",
    "license": "许可证",
    "copyright": "版权",
    "patent": "专利",
    "trademark": "商标",
    "open source": "开源",
    "proprietary": "专有",
    "commercial": "商业",
    "enterprise": "企业",
    "cloud": "云",
    "aws": "AWS",
    "azure": "Azure",
    "gcp": "GCP",
    "docker": "Docker",
    "kubernetes": "Kubernetes",
    "container": "容器",
    "containers": "容器",
    "orchestration": "编排",
    "microservice": "微服务",
    "microservices": "微服务",
    "api gateway": "API网关",
    "load balancer": "负载均衡器",
    "cdn": "CDN",
    "cdn": "内容分发网络",
    "cdn": "内容交付网络",
}

def translate_text(text):
    """翻译文本，保持代码和格式不变"""
    # 对于包含代码的行，不进行翻译
    if any(code_indicator in text for code_indicator in ['`', '```', '    ', '\t']):
        return text
    
    # 对于标题行，只翻译标题文本部分
    if text.startswith('#'):
        # 分离井号和文本内容
        hash_part = ''
        content_part = text
        while content_part.startswith('#'):
            hash_part += '#'
            content_part = content_part[1:]
        
        # 保留空格
        while content_part.startswith(' '):
            hash_part += ' '
            content_part = content_part[1:]
            
        # 翻译内容部分
        translated_content = content_part
        for eng, chn in translation_map.items():
            translated_content = translated_content.replace(eng, chn)
        return hash_part + translated_content
    
    # 对于列表项，翻译冒号后的内容
    if text.strip().startswith('- ') and ':' in text:
        parts = text.split(':', 1)
        if len(parts) == 2:
            prefix, suffix = parts
            translated_suffix = suffix
            for eng, chn in translation_map.items():
                translated_suffix = translated_suffix.replace(eng, chn)
            return prefix + ':' + translated_suffix
    
    # 对于普通文本，进行翻译
    translated_text = text
    for eng, chn in translation_map.items():
        translated_text = translated_text.replace(eng, chn)
    
    return translated_text

def process_file(file_path):
    """处理单个文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.split('\n')
        translated_lines = []
        
        for line in lines:
            translated_line = translate_text(line)
            translated_lines.append(translated_line)
        
        translated_content = '\n'.join(translated_lines)
        
        # 写入到对应的中文目录
        relative_path = os.path.relpath(file_path, 'openspec/changes/archive')
        output_path = os.path.join('openspec中文/changes/archive', relative_path)
        
        # 确保输出目录存在
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(translated_content)
            
        print(f"已处理文件: {file_path}")
        return True
    except Exception as e:
        print(f"处理文件 {file_path} 时出错: {e}")
        return False

def main():
    """主函数"""
    # 获取所有需要翻译的文件
    source_dir = 'openspec/changes/archive'
    files_to_process = []
    
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                files_to_process.append(file_path)
    
    print(f"找到 {len(files_to_process)} 个文件需要处理")
    
    # 处理所有文件
    success_count = 0
    fail_count = 0
    
    for file_path in files_to_process:
        if process_file(file_path):
            success_count += 1
        else:
            fail_count += 1
    
    print(f"处理完成: {success_count} 个成功, {fail_count} 个失败")

if __name__ == "__main__":
    main()