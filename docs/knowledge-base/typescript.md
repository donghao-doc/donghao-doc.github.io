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

## tsconfig.json

`tsconfig.json` 是 TS 的配置文件，用于定义 TS 的编译规则，供 `tsc` 编译器使用。

```sh
# 生成 tsconfig.json 文件
tsc --init
```

常用配置：

- `target`：指定编译后的 JS 版本，可选值有 `ES5`、`ES6`、`ES2016`、`ESNext` 等。
- `module`：指定模块化规范，可选值有 `CommonJS`、`UMD`、`AMD`、`ES2015`、`ESNext` 等。
- `outDir`：指定编译后的 JS 文件的输出目录。
- `rootDir`：指定编译时的根目录。
- `strict`：启用所有严格类型检查选项。
- `noImplicitAny`：禁止隐式 any 类型。
- `noEmitOnError`：在有错误时，不生成 `.js` 文件。
- `include`：指定要编译的文件，若未设置，会包含当前目录及子目录下的所有 TS 文件。
- `exclude`：指定不编译的文件，若未设置，会自动排除 `node_modules` 目录。
- `files`：手动指定要编译的文件，忽略 `include` 和 `exclude` 的配置。

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

- 数组：所有元素类型相同，长度不固定。
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

### 对象、数组、函数

:::code-group

```ts [对象]
const person: {
  name: string;
  age: number;
  gender?: string; // 可选属性
  readonly id: number; // 只读属性
  [key: string]: any; // 任意属性
} = {
  name: '张三',
  age: 18,
  id: 1,
  skills: ['游泳', '跑步'],
};

// 错误：无法修改只读属性
person.id = 2;
```

```ts [数组]
const arr: string[] = ['a', 'b'];

// 泛型数组
const arr: Array<string> = ['a', 'b'];

// 二维数组
const arr: string[][] = [
  ['a', 'b'],
  ['c', 'd'],
];

// 对象数组
const arr: { name: string; age: number }[] = [
  { name: '张三', age: 18 },
  { name: '李四', age: 20 },
];
```

```ts [函数]
// 指定参数、返回值类型
function fn(a: number, b: string): string {
  return a + b;
}

// void 表示没有返回值
function fn(a: number, b: string): void {
  console.log(a + b);
}

// 可选参数
// 可选参数必须放在必选参数后面
function fn(a: number, b: string, c?: number): string {
  return a + b + c;
}

// 默认参数
function fn(a: number, b: string, c: number = 10): string {
  return a + b + c;
}

// 剩余参数
function fn(a: number, b: string, ...rest: number[]): string {
  return a + b + rest.reduce((acc, curr) => acc + curr, 0);
}
```

:::

### type

type 用于定义类型别名，即给现有类型起一个新的名字。

:::code-group

```ts [基本使用]
type A = string | number | boolean;

type B = (a: number, b: string) => string;

type C = A | B;

type Person = {
  name: string;
  age: number;
};

type Persons = Person[];
```

```ts [type 不能重名]
type Person = {
  name: string;
  age: number;
};

// 错误：type 不能重名
type Person = {
  name: string;
  age: number;
};
```

:::

### interface

interface（接口）通常用于定义对象的类型。

:::code-group

```ts [基本使用]
interface Person {
  readonly id: number; // 只读属性
  name: string;
  age: number;
  gender?: string; // 可选属性
  [key: string]: any; // 任意属性
}

const persons: Person[] = [
  { name: '张三', age: 18, id: 1 },
  { name: '李四', age: 20, id: 2 },
];
```

```ts [接口继承]
interface Person {
  name: string;
  age: number;
}

// 使用 extends 实现继承
interface Student extends Person {
  grade: number;
}

// 继承多个接口
interface Student extends Person, Person2 {
  grade: number;
}
```

```ts [接口合并]
interface Person {
  name: string;
  age: number;
}

// 同名的接口会自动合并
interface Person {
  gender: string;
}

// 等价于：
interface Person {
  name: string;
  age: number;
  gender: string;
}
```

:::

## 联合类型、交叉类型

- 联合类型（`|`）：取值可以是多种类型中的任意一种。
- 交叉类型（`&`）：将多个类型合并成一个类型。

:::code-group

```ts [联合类型]
const a: string | number | boolean;
const b: (number | string)[] = [1, 'string'];
```

```ts [交叉类型]
type Person = { name: string, age: number };
type Student = { grade: number };

const obj: Person & Student = { name: '张三', age: 18, grade: 1 };
```

:::
