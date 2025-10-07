# TypeScript

## 编译器

TS 要编译成 JS 才能运行，TS 的编译器是 `tsc`。

```sh
# 安装
npm install -g typescript

# 检查是否安装成功
tsc -v

# 编译 ts 文件，-w 表示监听文件变化，自动编译
tsc app.ts
tsc app.ts -w
```

## tsconfig.json

`tsconfig.json` 是 TS 的配置文件，用于定义 TS 的编译规则，供 `tsc` 编译器使用。

```sh
# 生成 tsconfig.json 文件
tsc --init
```

常用配置：

- `target`：指定编译的 JS 版本，如 `ES5`、`ES6`、`ESNext` 等。
- `module`：指定模块化规范，如 `CommonJS`、`ESNext` 等。
- `strict`：启用严格模式。
- `esModuleInterop`：兼容 ES6 模块。
- `outDir`：输出目录。
- `include`：指定要编译的文件，若未设置，会包含当前目录及子目录下的所有 TS 文件。
- `exclude`：指定不编译的文件，若未设置，会自动排除 `node_modules` 目录。
- `noImplicitAny`：禁止隐式 any 类型。
