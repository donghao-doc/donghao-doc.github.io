# TypeScript

TS 是 JS 的**超集**，它提供了类型系统，可以进行**静态类型检查**，帮助我们编写更健壮的代码。

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

## TS 的数据类型

TS 是 JS 的超集，所以 JS 中的数据类型，TS 都支持。

TS 的六个新类型：`any`、`unknown`、`never`、`void`、`tuple`、`enum`。

TS 的两个用于自定义类型的方式：`type`、`interface`。
