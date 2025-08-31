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

### any、unknown

`any`、`unknown` 是 TS 的顶层类型，可以赋值给其他任意类型。

- `any` 表示**任意类型**，相当于关闭了类型检查。
- `unknown` 表示**未知类型**，赋值给其他类型时，需要进行类型收缩。

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
```

:::tip

unknown 可以理解为**类型安全的 any**。

:::

### void、never

`void` 表示**空值**，通常用于表示函数没有返回值。

`never` 是 TS 的底层类型，表示**不可能存在的值**，通常用于表示函数抛出错误，或者永远不会有返回值。

```ts
function fn(): never {
  throw new Error('error');
}
```

### tuple（元组）

元组与数组的区别：

- 数组：元素类型相同，长度不固定。
- 元组：每个位置的元素类型可以不同但已知，长度固定。

```ts
// 数组
const arr: string[] = ['a', 'b'];

// 元组
const arr: [string, number, boolean] = ['hello', 123, true];
```

### enum（枚举）

枚举用于定义一组常量，当一个元素有几个固定的可选值时，就可以使用枚举。

:::code-group

```ts [数字枚举]
enum Gender {
  Male = 1,
  Female,
}

// 数字枚举的值会自动递增
// 等价于：
// enum Gender {
//   Male = 1,
//   Female = 2,
// }
```

```ts [字符串枚举]
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

:::

获取枚举值：

```ts
const gender = Gender.Male;
const direction = Direction['Up'];
```
