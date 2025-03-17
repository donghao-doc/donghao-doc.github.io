---
title: Cursor
---

## 插件

- Chinese (Simplified) Language Pack for VS Code
- WebStorm New UI Theme
- GitLens — Supercharge Git in VS Code

## MCP

- playwright: 用于自动化测试和网页爬取的服务器，支持网页导航、截图、点击、填写表单、执行JavaScript等操作，可模拟用户与网页的交互行为。
- filesystem: 提供文件系统访问能力，可以读写指定目录下的文件，支持文件创建、读取、编辑、移动、搜索以及目录操作等功能。
- mysql: MySQL 数据库连接服务，用于执行数据库操作，包括查询、插入、更新、删除数据以及获取表结构信息等。
- mcp-server-commands: 提供命令行工具的执行能力，允许运行系统命令和脚本，实现与操作系统的交互。

```json title="配置"
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@executeautomation/playwright-mcp-server",
        "--config",
        "\"{}\""
      ]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/edy/Desktop"
      ]
    },
    "mysql": {
      "command": "npx",
      "args": ["-y", "@f4ww4z/mcp-mysql-server"],
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_USER": "fullstack_user",
        "MYSQL_PASSWORD": "123456",
        "MYSQL_DATABASE": "fullstack_db"
      }
    },
    "mcp-server-commands": {
      "command": "npx",
      "args": ["mcp-server-commands"]
    }
  }
}
```