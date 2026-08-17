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

函数组件接收一个 `props` 对象，用于接收组件外部传入的数据。

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

## 组件状态

### useState

`useState` 用于在函数组件中定义状态，它接收初始值作为参数，返回当前状态和修改状态的方法。

:::tip
当 `state` 更新时，组件会重新渲染以更新⻚⾯。
:::

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrease() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleIncrease}>
      数量：{count}
    </button>
  );
}
```

### 状态的更新是异步的

`useState` 返回的更新状态的⽅法是异步的，要在下次重绘才能获取新值。

```jsx
const [count, setCount] = useState(0);

function handleIncrease() {
  setCount(count + 1);

  // 仍然获取到旧值
  console.log(count);
}
```

### 状态的批量更新

React 会对同一个事件处理函数中的多个状态更新进行批量处理。

```jsx
const [count, setCount] = useState(0);

function handleIncrease() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
```

以上代码，三次更新获取到的 `count` 都是 `0`，相当于执行了三次 `setCount(0 + 1)`，所以最终 `count` 的值为 `1`，而不是 `3`。

如果要根据上一次更新结果继续计算，可以向 `setState()` 传入一个更新函数。

```jsx
const [count, setCount] = useState(0);

function handleIncrease() {
  // prevCount 为上一次更新后的状态
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
}
```

React 会按顺序处理这些更新函数，并将上一次计算结果传给下一次，因此 `count` 最终是 `3`。

这并不是取消了批量更新，而是在批量更新中正确地基于前一次状态计算新状态。

### 修改数组和对象

数组和对象不能直接修改原数据，应通过 `setState` 设置新数组或新对象。

```jsx
const [users, setUsers] = useState(["小明"]);
const [profile, setProfile] = useState({
  name: "小红",
  age: 10,
});

function handleUpdate() {
  // 使用新数组替换原数组
  setUsers([...users, "小刚"]);

  // 使用新对象替换原对象
  setProfile({
    ...profile,
    age: 11,
  });
}
```

### useState 的调用规则

`useState` 必须在函数组件或自定义 Hook 的**顶层**调用，不能放在条件判断、循环语句、嵌套函数中，因为 React 会按照 Hook 的**调用顺序**来保存和读取状态。

假设第一次渲染时，Hook 的调用顺序是：

```text
第 1 个 Hook：name
第 2 个 Hook：age
第 3 个 Hook：gender
```

如果下一次渲染时，Hook 的调用顺序不一致：

```text
第 1 个 Hook：name
第 2 个 Hook：gender
```

那么 React 就无法正确匹配状态。

:::code-group

```jsx [错误写法]
function UserInfo({ showAge }) {
  const [name, setName] = useState("小明");

  if (showAge) {
    // 条件变化时，这个 Hook 可能不会执行
    const [age, setAge] = useState(18);
  }

  const [gender, setGender] = useState("男");

  return <p>{name}</p>;
}
```

```jsx [正确写法]
function UserInfo({ showAge }) {
  // 所有 Hook 都在组件顶层调用
  const [name, setName] = useState("小明");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("男");

  return (
    <div>
      <p>姓名：{name}</p>
      {/* 通过条件控制内容是否显示 */}
      {showAge && <p>年龄：{age}</p>}
      <p>性别：{gender}</p>
    </div>
  );
}
```

:::

:::tip
可以简单记为：**组件每次渲染时，Hook 都必须以相同的顺序和数量执行。**
:::

## 条件渲染

可以通过 `if` 语句、`&&` 和三元运算符来选择性地渲染 JSX。

如果要在条件不成⽴时什么都不展示，可以返回 `null`。

```jsx
function UserPanel(props) {
  // 使用 if...else
  if (props.isVisible) {
    return (
      <div>
        {/* 使用 && */}
        {props.hasMessage && <p>你有一条新消息</p>}

        {/* 使用三元运算符 */}
        <button>
          {props.isLoggedIn ? "退出登录" : "立即登录"}
        </button>
      </div>
    );
  } else {
    // 条件不成立时，不渲染任何内容
    return null;
  }
}
```

## 列表渲染

使用数组的 `map()` 方法，将数组中的每一项转换成 JSX。

```jsx
function Week() {
  const days = [
    { id: 1, name: "星期一" },
    { id: 2, name: "星期二" },
    { id: 3, name: "星期三" },
  ];
  
  const listItems = days.map((day) => (
    <li key={day.id}>{day.name}</li>
  ));

  return <ul>{listItems}</ul>;
}
```

### key 的作用

`key` 用于给列表中的每⼀项做标记，当列表发生新增、删除或排序时，React 会根据 `key` 只更新变化的部分，不变的部分就不更新。

:::tip
- `key` 要在列表中是唯一的，通常使用 `id` 作为 `key`，不要⽤数组索引、随机数作为 `key`。
- 如果列表内容固定，不会新增、删除或排序时，也可以使用索引作为 `key`。
:::

## Hooks

### useRef

通过 ref 可以获取 DOM 元素或组件实例，从而操作 DOM 元素或访问组件中的数据和方法。

由于函数组件没有实例，所以函数组件不能使⽤ ref，但函数组件可以使用 `useRef`。

`useRef` 用于在函数组件中创建⼀个引⽤（ref）对象。

#### useRef 常见用途

- **访问 DOM 元素**：⽐如获取输⼊框的值、输入框聚焦、测量 DOM 元素尺⼨等。
- **保存可变数据**：保存一个值，并且修改这个值时不会触发组件重新渲染。

:::code-group

```jsx [访问 DOM 元素]
import { useRef } from "react";

function App() {
  const inputRef = useRef(null);

  function handleFocus() {
    // inputRef.current 指向真实的 <input> DOM 元素
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleFocus}>获取焦点</button>
    </div>
  );
}
```

```jsx [保存可变数据]
import { useRef } from "react";

function Counter() {
  const countRef = useRef(0);

  function handleIncrease() {
    // 修改 countRef.current，不会触发组件重新渲染
    countRef.current += 1;
  }

  return (
    <>
      {/* 所以页面不会随着点击进行更新 */}
      <p>{countRef.current}</p>
      <button onClick={handleIncrease}>+1</button>
    </>
  )
}
```

:::

#### useRef 特性

- **持久性**：`useRef` 创建的 ref 对象在组件的整个⽣命周期中都是持久的，React 会保留同一个 ref 对象直到组件卸载，也不会在组件每次渲染时创建新的 ref 对象。
- **不会触发重新渲染**：`useState` 的状态改变时，组件会重新渲染；⽽ `useRef` 的 `.current` 属性改变时，组件不会重新渲染。

:::tip
`useRef` 适合保存“只需要记住数据的变化，但不需要更新页面”的数据。
:::

#### useRef 和 createRef 的区别

- `createRef` 在组件每次渲染时都会重新创建 ref 对象。
- `useRef` 只会在组件⾸次渲染时创建 ref 对象，后续多次更新渲染时会保持同一个 ref 对象。

:::tip
函数组件推荐使用 `useRef`，`createRef` 主要用于类组件。
:::
