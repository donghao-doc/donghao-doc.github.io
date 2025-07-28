# TypeScript

TypeScript 是 JavaScript 的**超集**，它提供了类型系统，可以进行**静态类型检查**和**类型推断**，帮助我们编写更健壮的代码。

## 编译 TypeScript

TS 需要编译成 JS 才能在浏览器或其他环境中运行。

### 命令行编译

1. 全局安装 TypeScript。

```bash
npm i typescript -g
```

2. 使用 `tsc` 命令编译 `.ts` 文件。

```bash
tsc demo.ts
```

### 自动化编译

1. 创建 TypeScript 编译配置文件。

```bash
tsc --init
```

以上代码，会在项目中生成一个 `tsconfig.json` 配置文件，其中包含很多编译时的配置。

2. 监视目录中所有的 `.ts` 文件变化，并自动编译。

```bash
tsc --watch

# OR
tsc -w
```

3. 当编译出错时不生成 `.js` 文件。

```bash
tsc --noEmitOnError --watch
```

或修改 `tsconfig.json` 中的 `noEmitOnError` 配置。
