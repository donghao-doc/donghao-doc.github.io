# Cursor

## 插件

- Chinese (Simplified) Language Pack for VS Code
- WebStorm New UI Theme
- GitLens — Supercharge Git in VS Code

## MCP 配置

- `playwright`：用于自动化测试和网页爬取的服务器，支持网页导航、截图、点击、填写表单、执行 JavaScript 等操作，可模拟用户与网页的交互行为。
- `filesystem`：提供文件系统访问能力，可以读写指定目录下的文件，支持文件创建、读取、编辑、移动、搜索以及目录操作等功能。
- `mysql`：MySQL 数据库连接服务，用于执行数据库操作，包括查询、插入、更新、删除数据以及获取表结构信息等。
- `mcp-server-commands`：提供命令行工具的执行能力，允许运行系统命令和脚本，实现与操作系统的交互。
- `github`：用于与 GitHub 交互的服务，通过配置的个人访问令牌进行认证。
- `edgeone-pages-mcp-server`：腾讯的 EdgeOne Pages 相关功能的服务，可将本地文件部署到腾讯云的 EdgeOne Pages 上。
- `notionApi`：提供 Notion API 访问服务，用于操作 Notion。

:::warning

以下代码中的部分配置项，需根据实际情况进行修改。

:::

```json
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
        "/Users/edy/Desktop" // 路径需根据实际情况修改
      ]
    },
    "mysql": {
      "command": "npx",
      "args": ["-y", "@f4ww4z/mcp-mysql-server"],
      // env 需根据实际情况修改
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
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@smithery-ai/github",
        "--config",
        // token 需根据实际情况修改
        "{\"githubPersonalAccessToken\":\"xxxxxx\"}"
      ]
    },
    "edgeone-pages-mcp-server": {
      "command": "npx",
      "args": ["edgeone-pages-mcp"]
    },
    "notionApi": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      // env 需根据实际情况修改
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer ntn_xxxxxx\", \"Notion-Version\": \"2022-06-28\" }"
      }
    }
  }
}
```
