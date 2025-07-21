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
