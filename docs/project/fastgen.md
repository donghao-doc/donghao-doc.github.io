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
     "files": [
       // 指定发布的目录和文件
       "bin/",
       "README.md"
     ],
     "license": "MIT" // 许可证
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

## Commander.js

Commander.js 是一个轻量级的命令行解析库，用于解析命令行参数、定义子命令、生成帮助信息等，常用于构建命令行工具。

示例：

```ts
import { Command } from 'commander';
import { join } from 'path';
import { readFileSync } from 'fs';

// 创建命令行工具
const program = new Command();

// 读取 package.json 信息
const packageJsonPath = join(__dirname, '../package.json');
const packageInfo = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

program
  .name(packageInfo.name)
  .description(packageInfo.description)
  .version(packageInfo.version)
  .action(() => {
    console.log('Hello, world!');
  });

// 解析命令行参数
program.parse();
```

## Inquirer.js

Inquirer.js 是一个交互式命令行用户界面库，用于创建交互式命令行用户界面，提供多种提示类型（输入、选择、确认等），常用于构建命令行工具。

示例：

```ts
import inquirer from 'inquirer';

// 提示用户输入项目名称
const nameAnswer = await inquirer.prompt([
  {
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称:',
    validate: (input: string) => {
      if (!input.trim()) {
        return '项目名称不能为空';
      }
      if (!/^[a-zA-Z0-9_-]+$/.test(input.trim())) {
        return '项目名称只能包含字母、数字、下划线和连字符';
      }
      return true;
    },
  },
]);

// 提示用户选择技术栈
const techStackAnswer = await inquirer.prompt([
  {
    type: 'list',
    name: 'techStack',
    message: '请选择技术栈:',
    choices: [
      { name: 'Vue', value: 'vue' },
      { name: 'React', value: 'react' },
      { name: 'uni-app', value: 'uni-app' },
    ],
  },
]);
```

## Chalk

Chalk 是一个用于为终端输出添加颜色和样式的库，支持彩色文本、背景色、加粗、下划线等。

示例：

```ts
import chalk from 'chalk';

console.log(chalk.blue('🚀 欢迎使用 FastGen！'));
console.log(chalk.red('❌ 错误信息'));
console.log(chalk.green('🎉 成功信息'));
```

## Download-git-repo

Download-git-repo 是一个用于从 Git 仓库下载代码的库，支持 GitHub、GitLab 等平台。

示例：

```ts
import download from 'download-git-repo';

// 将 GitHub URL 转换为 download-git-repo 支持的格式（owner/repo）
function formatRepoUrl(repoUrl: string): string {
  if (repoUrl.startsWith('https://github.com/')) {
    const match = repoUrl.match(
      /https:\/\/github\.com\/([^\/]+\/[^\/]+)(\.git)?/,
    );
    if (match) {
      return match[1].replace('.git', '');
    }
  }
  // 如果已经是 owner/repo 格式，直接返回
  return repoUrl;
}

const formattedRepo = formatRepoUrl(selectedTemplate.repo);

/**
 * formattedRepo 格式为 owner/repo，如 donghao-doc/fastgen-cli
 * projectPath 为项目路径，如 ./fastgen-cli
 * clone 为是否克隆仓库，为 false 时，只下载代码，不克隆仓库
 */
await new Promise<void>((resolve, reject) => {
  download(
    formattedRepo,
    projectPath,
    { clone: false },
    (err: Error | null) => {
      if (err) {
        console.log(chalk.red(`❌ 下载失败：${err.message}`));
        reject(err);
      } else {
        console.log(chalk.green(`🎉 项目模板下载完成，你可以开始开发了！`));
        console.log(chalk.green(`   cd ${projectName}`));
        resolve();
      }
    },
  );
});
```

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

## process.exit()

`process.exit()` 用于立即终止 Node.js 进程，参数是退出码：

- `process.exit(0)`：正常退出，表示成功。
- `process.exit(1)`：异常退出，表示发生错误。
- `process.exit(其他非零值)`：不同类型的错误。

## SIGINT 信号

`SIGINT`（中断）信号是当用户按下 `Ctrl+C` 时，会触发该信号，通常用于退出进程。

```js
// 处理 SIGINT 信号，退出进程
process.on('SIGINT', () => {
  process.exit(0);
});
```
