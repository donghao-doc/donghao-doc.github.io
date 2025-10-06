# package.json

`package.json` 是 Node.js 项目必不可少的文件，用于描述项目的基本信息和依赖管理。

## bin

`bin` 字段用于定义命令行工具的可执行文件。

如以下示例，当用户全局安装 `fastgen` 后，会创建一个名为 `fastgen` 的命令，指向 `bin/cli.js` 文件。

```json
"bin": {
  "fastgen": "bin/cli.js"
}
```

## files

`files` 字段用于指定发布到 npm 的文件和目录。

如以下示例，只有 `bin/` 目录和 `README.md` 文件会被打包发布。

```json
"files": [
  "bin/",
  "README.md"
]
```

:::tip
`package.json`（必须）文件和 `LICENSE`（如果有）文件会被默认一起打包发布。
:::

## engines

`engines` 字段用于指定项目运行所需的 Node.js 版本，npm 在安装时会检查版本兼容性。

如以下示例，要求 Node.js 版本 18.0.0 或更高。

```json
"engines": {
  "node": ">=18.0.0"
}
```

## packageManager

`packageManager` 字段用于指定推荐的包管理器和版本。

如以下示例，推荐使用 pnpm 10.12.4 版本管理依赖，一些工具（如 Corepack）会据此自动使用指定的包管理器。

```json
"packageManager": "pnpm@10.12.4"
```
