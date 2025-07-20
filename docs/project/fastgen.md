# FastGen CLI

FastGen 是一个开源的命令行工具，通过交互式命令行界面，拉取社区高质量项目模板，助力开发者快速开始项目。

项目地址：[GitHub](https://github.com/donghao-doc/fastgen-cli)

## 安装

```bash
npm install -g fastgen
```

## 使用示例

```bash
$ fastgen

🚀 欢迎使用 FastGen！
? 请输入项目名称: my-vue-admin
? 请选择项目类型: 管理后台
? 请选择技术栈: Vue
? 请选择项目模板: Vben Admin - 基于 Vue3、Pinia、Vue Router、TypeScript 等最新技术栈的管理后台模板

==================================================
📋 项目配置确认：
📁 项目名称：my-vue-admin
🎯 项目类型：管理后台
⚡ 技术栈：Vue
🎨 项目模板：Vben Admin
   基于 Vue3、Pinia、Vue Router、TypeScript 等最新技术栈的管理后台模板
==================================================

🔽 正在下载项目模板...
🎉 项目模板下载完成，你可以开始开发了！
   cd my-vue-admin
```

## 脚手架开发流程

1. `pnpm init`，生成 package.json。

2. 创建源码目录及文件（如 src/index.ts）、打包后的目录及文件（如 lib/cli.js）。

3. package.json 中配置 `bin` 字段，指定 cli 命令及可执行文件，本地通过 `npm link` 链接到全局，就可以使用 `fastgen` 命令。

    ```json
    "bin": {
      "fastgen": "bin/cli.js"
    },
    ```

4. 创建 scripts/build.js 配置 esbuild，打包源码到 bin/cli.js 中，并添加 [Shebang](#shebang)。

5. 配置 package.json 的 `files` 字段，指定发布到 npm 的目录和文件。

    ```json
    {
      "main": "bin/cli.js", // 入口文件
      "files": [ // 指定发布的目录和文件
        "bin/",
        "README.md"
      ],
      "license": "MIT", // 许可证
    }
    ```

6. 发布到 npm。

    ```bash
    # 登录 npm（首次发布需要登录）
    npm login

    # 发布 npm 包
    npm publish
    ```

7. 使用 Commander.js、Inquirer.js 实现命令行交互，Chalk 实现彩色输出，Download-git-repo 下载模板代码。

## Badge

<style>
  a > img {
    display: inline-block;
  }
</style>

markdown 中可以添加 badge，它是用来显示项目状态和信息的标识符。

示例：

```markdown
<!-- 显示当前发布到 npm 的版本号，点击可跳转到 npm 包页面 -->
[![npm version](https://badge.fury.io/js/fastgen.svg)](https://www.npmjs.com/package/fastgen)

<!-- 显示项目采用的开源协议，点击可查看协议文件 -->
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/donghao-doc/fastgen-cli/blob/main/LICENSE)

<!-- 显示项目要求的 Node.js 最低版本，点击可跳转到 Node.js 官网 -->
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
```

效果：

[![npm version](https://badge.fury.io/js/fastgen.svg)](https://www.npmjs.com/package/fastgen)&nbsp;
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/donghao-doc/fastgen-cli/blob/main/LICENSE)&nbsp;
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

也可以通过 [shields.io](https://shields.io/)、[badge.fury.io](https://badge.fury.io/) 等网站生成 badge。

## Shebang

Shebang 是可执行文件的第一行的特殊注释，以 `#!` 开始，用于告诉系统使用哪个解释器来执行该脚本。

```bash
#!/usr/bin/env node
```

不同的 Shebang 类型：

- `#!/usr/bin/env node`：使用环境变量中的 node 命令。
- `#!/usr/bin/node`：使用固定路径的 node（不推荐）。
- `#!/bin/bash`：使用 bash 解释器。
- `#!/usr/bin/env python3`：使用 Python3 解释器。
