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
type Person = { name: string; age: number };
type Student = { grade: number };

const obj: Person & Student = { name: '张三', age: 18, grade: 1 };
```

:::

## typeof、keyof

- `typeof` 用于返回一个值的类型。
- `keyof` 用于返回一个对象的键名组成的联合类型。

:::code-group

```ts [typeof]
const person = {
  name: '张三',
  age: 18,
};

type Person = typeof person; // { name: string, age: number }
type Name = typeof person.name; // string
```

```ts [keyof]
const person = {
  name: '张三',
  age: 18,
};

type PersonKeys = keyof Person; // 'name' | 'age'
```

:::

## 类型推导

如果没有明确指定类型，TS 会根据赋值语句、函数参数等上下文，自动推导出变量的类型。

```ts
let a = 123;

a = 'hello'; // 报错：类型 'string' 不能赋值给类型 'number'
```

如果声明时没有赋值，则会被推导为 `any` 类型。

```ts
let a;

// 正确
a = 123;
a = 'hello';

// a 的类型被推导为 any
function fn(a, b: string) {
  return a + b;
}
```

## 类型断言

- **类型断言**：用于明确告诉 TS 编译器一个值的类型。
- **非空断言**：用于告诉 TS 编译器某个值一定存在。
- **双重断言（不推荐使用）**：通过先将一个类型断言为 `any` 或 `unknown`，再断言为目标类型，绕过类型检查的限制。适用于类型系统无法直接转换但你确信安全的场景，但容易导致运行时错误，应谨慎使用。

:::code-group

```ts [类型断言]
function fn(m: string | number) {
  (m as string).substring(1);
}
```

```ts [非空断言]
function fn(m: string | undefined) {
  m!.substring(1);
}
```

```ts [双重断言]
const num: number = 123;

// 报错：属性 'length' 在类型 'number' 上不存在
num.length;

// 报错：类型 'number' 转换为类型 'string' 可能是一个错误
// 如果这是故意的，请先将表达式转换为 'unknown'
(num as string).length;

// 正确
(num as unknown as string).length;
```

:::

:::warning

类型断言可以解决类型检查时的报错，但不能避免运行时错误，使用时需谨慎。

:::

## 映射类型

映射类型：基于旧类型创建新类型（对象类型）。

`in` 后⾯跟的是联合类型，也可以是通过 `keyof` ⽣成的联合类型。

:::code-group

```ts [基本使用]
type Key = 'name' | 'age';

type Person = {
  [K in Key]: string;
};

// 等价于：
// type Person = {
//   name: string;
//   age: string;
// };
```

```ts [配合 keyof 使用]
type Person = {
  name: string;
  age: number;
};

type Person2 = {
  [K in keyof Person]: Person[K];
};

// 等价于：
// type Person2 = {
//   name: string;
//   age: number;
// };
```

```ts [可选属性]
type Person = {
  name: string;
  age: number;
};

type Person2 = {
  [K in keyof Person]?: Person[K];
};

// 等价于：
// type Person2 = {
//   name?: string;
//   age?: number;
// };
```

```ts [只读属性]
type Person = {
  name: string;
  age: number;
};

type Person2 = {
  readonly [K in keyof Person]: Person[K];
};

// 等价于：
// type Person2 = {
//   readonly name: string;
//   readonly age: number;
// };
```

:::

## 模块

任何包含 `import` 或 `export` 的文件，都被视为一个模块，相反，没有 `import` 或 `export` 的文件，都被视为一个全局文件。

模块本身就是一个作用域，模块内部定义的变量、函数、类等，外部无法访问，但可以通过导出、导入的方式让外部访问。

:::code-group

```ts [导出]
export interface Person = {
  name: string;
  age: number;
};

export default type Student = Person & {
  grade: number;
};

export { Person, Student };
export { type Person, type Student };
export type { Person, Student };

export type { Person, Student } from './a';
export * from './a';
```

```ts [导入]
import { Person, Student } from './person';
import { type Person, type Student } from './person';
import type { Person, Student } from './person';
```

:::

## namespace

namespace 用于定义一个命名空间，用于组织代码，避免命名冲突。

官方不再推荐使用 namespace，而是推荐使用模块。

```ts
namespace Utils {
  export const a = 1; // 如果不加 export，则默认为私有的，外部无法访问
  export type B = string;
  export function fn(a: string): string {
    return a;
  }
}

// 访问 namespace 内部的变量、类型、函数
console.log(Utils.a);
console.log(Utils.B);
console.log(Utils.fn('hello'));
```

## declare

`declare` 用于告诉 TS 编译器某个类型是存在的，可以直接使用，不需要再重复声明。

`declare` 一般在 `.d.ts` 文件（类型声明文件）中使用。

```ts
declare type A = string;
declare function fn(a: string): string;
declare class Person {
  name: string;
  age: number;
}

// 声明外部模块的类型
// 外部模块指的是通过 import 或 export 导入的模块，如项目中的 JS/TS 文件，或第三方库
declare module 'a' {
  export const a: number;
  export function fn(a: string): string;
  export class Person {
    name: string;
    age: number;
  }
}
```

### .d.ts 文件的加载机制

#### 同名引入

对于你⾃⼰写的模块，TS 会默认引⼊与该⽂件同名的 `.d.ts` ⽂件。

#### 自动引入

对于第三⽅库（如 lodash），如果你安装了对应的类型声明（如 `npm install @types/lodash`），TS 会⾃动识别 `node_modules/@types` 的声明⽂件，⽆需显式引⼊它们。

#### 通过 tsconfig.json 配置自动加载

```json
{
  "include": ["src/**/*"]
}
```

`src/**/*` 表示包含 src ⽬录下的所有⽂件和⼦⽬录中的所有⽂件，⽆论⽂件的扩展名是什么，都应该纳⼊ TypeScript 编译的范围。

如果 tsconfig.json 不做任何特殊设置，默认会加载项目中所有的 `.d.ts` ⽂件。

#### 三斜线指令

在⽂件顶部添加如下指令，显式告诉 TS 引⼊特定的 `.d.ts` 文件。

```ts
/// <reference path="xxx.d.ts" />
```

### 第三方库的类型声明

很多第三⽅库默认都⾃带类型声明⽂件，如果没有⾃带，TS 社区基本也提供了它们的类型⽂件。

这些类型声明⽂件都会作为⼀个单独的库，发布到 npm 的 `@types` 名称空间之下。

⽐如，jQuery 的类型声明⽂件就发布成 `@types/jquery` 这个库，使⽤时安装这个库就可以了。

```sh
npm install @types/jquery --save-dev
```
