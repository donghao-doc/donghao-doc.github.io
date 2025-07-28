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

## 类型声明和类型推导

```ts
// 变量的类型声明
let a: string;
let b: number;
let c: boolean;

// 函数的参数和返回值的类型声明
function fn(x: number, y: number): number {
  return x + y;
}

// 类型推导
let d = 123; // TS 会推断变量 d 的类型是数字
```

## TS 的数据类型

TS 是 JS 的超集，所以 JS 中的数据类型，TS 都支持。

TS 的六个新类型：`any`、`unknown`、`never`、`void`、`tuple`、`enum`。

TS 的两个用于自定义类型的方式：`type`、`interface`。

### any

`any` 表示任意类型。

`any` 可以赋值给其他类型，其他类型也可以赋值给 `any`，相当于关闭了类型检查。

### unknown

`unknown` 表示未知类型，适用于：起初不确定数据的具体类型，要后期才能确定。

其他类型可以赋值给 `unknown`，但 `unknown` 不能赋值给其他类型。如果要将 `unknown` 赋值给其他类型，需要进行类型断言。

`unknown` 可以理解为一个类型安全的 `any`。

```ts
let a: unknown;
let b: string;

// 类型判断
if (typeof a === 'string') {
  b = a;
}

// 类型断言
b = a as string;
b = <string>a;
(a as string).toUpperCase();
```
