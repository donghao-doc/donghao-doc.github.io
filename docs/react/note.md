# React 学习笔记

## JSX

JSX 是 JavaScript 的语法扩展，允许在 JS 中编写 HTML 而无需加引号。

```jsx
const element = <h1>Hello, World!</h1>;

// 这段 JSX 会被编译成以下 JavaScript
const element = React.createElement("h1", null, "Hello, World!");
```

JSX 核心规则：

- 使用 `{}` 插入变量，`{}` 提供了 JS 的执行环境，大括号内可以写任意的 JS 表达式，但不能写语句（如 `if`、`for` 等）。
- 最外层只能有一个根元素。
- `class` 要写成 `className`。
- `style` 要写成对象形式（双大括号），外层大括号表示提供了一个 JS 环境，内层大括号表示这是一个样式对象。

```jsx
function UserCard() {
  const name = "小明";
  const score = 95;
  const isPassed = score >= 60;

  return (
    <div
      className="user-card"
      style={{ padding: "16px", fontSize: "18px" }}
    >
      <h2>{name}</h2>
      <p>分数：{score}</p>
      <p>结果：{isPassed ? "通过" : "未通过"}</p>
    </div>
  );
}
```

## Fragment

```jsx
function UserInfo() {
  return (
    <>
      <h2>小明</h2>
      <p>年龄：10 岁</p>
    </>
  );
}
```

这个空标签（`<>...</>`）是 Fragment 的简写形式。它可以包裹多个元素，但不会在 HTML 结构中生成额外节点。

## 组件

类组件已经过时，现在推荐使用**函数组件 + Hooks**。

### 函数组件

函数组件的组件名首字母必须⼤写，且必须返回 JSX。

```jsx
function Welcome() {
  return <h2>欢迎学习 React</h2>;
}
```

### props

`props` 是一个对象，用于接收组件外部传入的数据。

:::warning
单向数据流：`props` 是只读的，组件内部不能直接修改。如果要修改，应调用父组件传入的函数，由父组件更新数据。
:::

```jsx
import { useState } from "react";

// 实际开发中通常会直接解构 props
function Counter({ count, onIncrease }) {
  return (
    <button onClick={onIncrease}>
      数量：{count}
    </button>
  );
}

function App() {
  const [count, setCount] = useState(0);

  function handleIncrease() {
    setCount(count + 1);
  }

  return <Counter count={count} onIncrease={handleIncrease} />;
}
```

### 传入 JSX 元素

函数组件可以通过 `props.children` 或具名 `props` 传入 JSX 元素。

:::code-group

```jsx [props.children]
function Card(props) {
  return (
    <div className="card">
      {props.children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h2>学习计划</h2>
      <p>每天学习 React 30 分钟。</p>
    </Card>
  );
}
```

```jsx [具名 props]
function Card(props) {
  return (
    <div className="card">
      <header>{props.title}</header>
      <main>{props.content}</main>
      <footer>{props.footer}</footer>
    </div>
  );
}

function App() {
  return (
    <Card
      title={<h2>学习计划</h2>}
      content={<p>每天学习 React 30 分钟。</p>}
      footer={<button>查看详情</button>}
    />
  );
}
```

:::

:::warning
不建议通过索引来使用 `props.children`，一是因为语义不明显，二是因为内容顺序变化后容易出错。
:::
