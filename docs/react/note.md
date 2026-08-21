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

## StrictMode

`StrictMode` 用于辅助开发过程中发现组件中的一些问题。

`StrictMode` 的作⽤：

- **识别一些不安全的生命周期**，比如 `UNSAFE_componentWillMount`、`UNSAFE_componentWillReceiveProps`、`UNSAFE_componentWillUpdate` 等旧版本类组件生命周期。
- **检测意外的副作用**，比如修改了 `props` 数据、`useEffect` 缺少清理函数等。
- **检测过时的 API**，比如旧版本生命周期 API 等。

通常在项目入口 `main.tsx` 中包裹根组件：

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

:::tip
- `StrictMode` 只在**开发环境**中执行额外检查，不会影响生产环境。
- 启用 `StrictMode` 后，开发环境中有的日志可能会打印两次，因为 React 会额外渲染一次组件，检查渲染过程是否包含副作用，但生产环境不会因此额外渲染。
:::

## 样式模块化

### .module.css

将样式⽂件命名为 `xxx.module.css` 即可。

CSS Modules 会创建 `[filename]_[classname]__[hash]` 格式的唯⼀类名，让样式只作用于当前组件，避免不同组件之间的类名冲突，导致样式污染。

```jsx
import styles from "./card.module.css";

function Card() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>学习计划</h2>
      <p>每天学习 React 30 分钟。</p>
    </div>
  );
}
```

### 预处理器

可以创建 `.scss` 文件，如果要同时使用 CSS Modules，也可以将文件命名为 `xxx.module.scss`。

:::code-group

```jsx [Card.jsx]
import "./Card.scss";

function Card() {
  return (
    <div className="card">
      <h2 className="title">学习计划</h2>
      <p>每天学习 React 30 分钟。</p>
    </div>
  );
}
```

```scss [Card.scss]
$primary-color: #4f46e5;

.card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;

  .title {
    color: $primary-color;
    font-size: 20px;
  }

  &:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  }
}
```

:::

## 组件的生命周期

生命周期主要可以分为初始化阶段（初次挂载）、更新阶段、卸载阶段，每个阶段都有对应的钩子函数。

### 类组件

:::code-group

```text [初始化阶段]
constructor() -> render() -> componentDidMount()
```

```text [更新阶段]
// 组件内部调用 setState() 触发
shouldComponentUpdate() -> render() -> componentDidUpdate()

// 组件内部调用 forceUpdate() 触发
render() -> componentDidUpdate()

// 父组件重新 render 触发
getDerivedStateFromProps ->
shouldComponentUpdate() -> render() -> componentDidUpdate()
```

```text [卸载阶段]
componentWillUnmount()
```

:::

### shouldComponentUpdate

`shouldComponentUpdate` 返回一个布尔值，来决定组件是否需要更新。如果返回 `false`，组件就不会更新。

`shouldComponentUpdate` 接收两个参数：`nextProps` 和 `nextState`，分别表示组件即将接收到的新属性和新状态。可以在这个钩子函数中比较组件当前的属性和状态和即将接收的新的属性和状态，返回一个布尔值，来决定是否要更新组件。

```jsx
import { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
  };

  shouldComponentUpdate(nextProps, nextState) {
    // 比较新的 count 和当前的 count，发生变化时才重新渲染
    return nextState.count !== this.state.count;
  }

  handleIncrease = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <button onClick={this.handleIncrease}>
        数量：{this.state.count}
      </button>
    );
  }
}
```

现在一般不需要手动编写 `shouldComponentUpdate`：

- 类组件：可以使用 `PureComponent`。
- 函数组件：可以使用 `React.memo` 或 `useMemo`。

### PureComponent

`React.PureComponent` 与 `React.Component` 基本类似，区别在于：

- `Component`：默认不会自动比较新旧 `props` 和 `state`，需要手动调用 `shouldComponentUpdate` 来控制组件是否更新。
- `PureComponent`：自动对新旧 `props` 和 `state` 进行**浅比较**，没有变化时组件不会重新渲染。

```jsx
import { PureComponent } from "react";

class User extends PureComponent {
  render() {
    // 当父组件重新渲染，但传进来的 name 没有变化，那么 User 组件不会重新渲染
    return <p>姓名：{this.props.name}</p>;
  }
}
```

#### setState 的两个不合理之处

1. `setState` ⽆论是否真的更新了 state，组件都会重新渲染。
2. 如果⽗组件更新了，⽆论⼦组件有没有⽤到⽗组件的数据，子组件也都会重新渲染。

解决方案：普通类组件可以使用 `shouldComponentUpdate` 来控制是否需要更新，而 `PureComponent` 会自动浅比较新旧 `props` 和 `state` 来决定是否需要更新。

#### 浅比较

`React.PureComponent` 只进行**浅层比较**。

基本类型的数据可以直接比较，但对象和数组，比较的是**引用地址是否发生变化**，所以不能直接修改原对象或原数组，而是要创建新对象或数组，`PureComponent` 才能正确检测到更新。

### 函数组件

函数组件没有生命周期，但可以使用 `useEffect` Hook 来代替。

### useEffect

`useEffect` 用于在组件渲染后执行一些**副作用操作**，比如请求数据、添加事件监听、启动定时器等。

#### 基本语法

`useEffect` 接收两个参数：

1. Effect 函数：需要执行的副作用代码。
2. 依赖项数组：决定 Effect 函数什么时候执行。

```jsx
import { useEffect } from "react";

useEffect(() => {
  // 要执行的 Effect 代码
  // 相当于 componentDidMount、componentDidUpdate
  console.log('hello')

  // return 是可选的，相当于 componentWillUnmount
  // 用于清理副作用，如清除定时器、移除事件监听
  return () => {
    console.log('componentWillUnmount')
  };
}, [依赖项]);
```

#### 执行时机

默认情况下，任何数据的变化都会导致 `useEffect` 重新执行（如果数据改变前后值⼀样，那么就不会执行）。

| 写法                             | 执行时机                                     |
|--------------------------------|------------------------------------------|
| 不传依赖数组：`useEffect(fn)`         | 组件每次渲染后都会执行                              |
| 传入空数组：`useEffect(fn, [])`      | 只在组件首次挂载后执行，常用于初始化操作，例如首次请求数据、添加全局事件监听等。 |
| 指定依赖项：`useEffect(fn, [count])` | 首次挂载后执行，并在 `count` 变化后重新执行               |

### React.memo

函数组件本身没有识别 `props` 是否变化的能⼒，每次⽗组件更新都会给⼦组件传递⼀个新的 `props`，导致子组件跟着一起重新渲染。如果 `props` 没有发生变化，那么子组件的这种重新渲染是没有必要的。

`React.memo` 用于缓存函数组件，它可以检查 `props` 是否发生变化。如果传递给子组件的 `props` 没有变化，那么父组件重新渲染时，子组件不会重新渲染。

```jsx
import { memo, useState } from "react";

const Child = memo(function Child(props) {
  return <p>子组件：{props.name}</p>;
});

function App() {
  const [count, setCount] = useState(0);

  function handleIncrease() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>父组件：{count}</p>
      <button onClick={handleIncrease}>+1</button>
      <Child name="小明" />
    </div>
  );
}
```

:::tip
`React.memo` 适合那些渲染开销大，并且经常因为父组件更新而导致无意义的重新渲染的组件，不需要给所有组件都加 `React.memo`。
:::

### useMemo

`useMemo` 用于**缓存函数的计算结果**或**缓存组件**。

```jsx
const value = useMemo(() => {
  return 计算结果/组件;
}, [依赖项]);
```

当组件重新渲染，若依赖项没有变化，就直接使用上一次缓存的结果，避免重复计算。

`useMemo` 是同步的，不能执行副作用操作，⽐如⽹络请求、操作 DOM、添加事件监听等。

:::code-group

```jsx [缓存计算结果]
import { useMemo, useState } from "react";

function App() {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(100);
  const [color, setColor] = useState("红色");

  const total = useMemo(() => {
    return count * price;
  }, [count, price]); // 只有当 count 或 price 改变，才会重新计算 total

  function handleColor() {
    // color 改变，组件重新渲染，但不会重新计算 total
    setColor("蓝色");
  }

  return (
    <div>
      <p>总价：{total}</p>
      <p>颜色：{color}</p>
      <button onClick={handleColor}>修改颜色</button>
    </div>
  );
}
```

```jsx [缓存组件]
import { useMemo, useState } from "react";

function Child(props) {
  return <p>数量：{props.count}</p>;
}

function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("红色");

  const child = useMemo(() => {
    return <Child count={count} />;
  }, [count]); // 只有依赖项变化时，才会重新创建 Child 组件

  function handleColor() {
    // color 改变，App 组件重新渲染，但 child 继续使用缓存的组件
    setColor("蓝色");
  }

  return (
    <div>
      <p>颜色：{color}</p>
      <button onClick={handleColor}>修改颜色</button>
      {child}
    </div>
  );
}
```

:::

#### useMemo 和 React.memo 的区别

- `React.memo` 用于缓存组件，当 props 变化时，组件重新渲染。
- `useMemo` 用于缓存函数的计算结果或组件，当依赖项变化时，重新计算结果或重新渲染组件。

#### 使用场景

`useMemo` 更主要用于缓存计算结果，缓存组件更推荐使用 `React.memo`。

```text
React.memo  → 优化组件
useMemo     → 优化组件内部的计算结果
```

:::tip
`useMemo` 主要适合缓存**计算开销较大的结果**，如果计算非常简单，通常没必要使用 `useMemo`。
:::

## Context

`Context` 用于在组件树中共享数据，以避免数据在多层组件中使用 `props` 层层传递。

:::code-group

```jsx [1. 创建 Context]
import { createContext } from "react";

const UserContext = createContext("");

// 也可以设置默认值
// const UserContext = createContext("默认用户");

export default UserContext;
```

```jsx [2. 上层组件提供 Context 数据]
import UserContext from "./UserContext";
import Child from "./Child";

function App() {
  const name = "小明";

  return (
    <UserContext.Provider value={name}>
      <Child />
    </UserContext.Provider>
  );
}
```

```jsx [3. 使用 useContext 获取数据]
import { useContext } from "react";
import UserContext from "./UserContext";

function GrandChild() {
  const name = useContext(UserContext);

  return <p>当前用户：{name}</p>;
}
```

:::

`useContext` 可以读取 Context 的值以及订阅 Context 的变化，当 Context 中的值发生变化，读取该 Context 的组件也会重新渲染。

## 高阶组件（HOC）

高阶组件是 React 中用于**组件逻辑复用**的一种方式，它本质上是一个函数，接收一个组件，为组件增加公共逻辑（增强组件功能），返回处理后的新组件。

常见可复用的逻辑：权限判断、登录状态处理、公共行为封装等。

HOC 基本规则：

- HOC 应当是纯函数，⽆副作⽤。
- 不要在 HOC 内部修改原组件，⽽是要返回⼀个新组件。
- HOC 的命名通常以 `with` 开头，表示它是为组件提供附加功能的，例如 `withAuth`、`withLoading`。
- HOC 主要负责增强组件功能，而不是直接负责 UI 渲染。

```jsx
function withPermission(Component) {
  return function NewComponent(props) {
    const canEdit = props.role === "admin";

    // HOC 只增强功能：注入 canEdit
    return <Component {...props} canEdit={canEdit} />;
  };
}

function UserPanel(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      {props.canEdit && <button>编辑资料</button>}
    </div>
  );
}

const UserPanelWithPermission = withPermission(UserPanel);

function App() {
  return (
    <UserPanelWithPermission
      name="小明"
      role="admin"
    />
  );
}
```

## 跨域代理

如果前端直接请求其他域名的接口，浏览器可能会产生跨域问题。

解决方案：在项目根目录的 `vite.config.js` 中为本地开发服务器配置 `proxy`，将前端请求转发到目标服务器。

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // /api：需要代理的请求前缀
      "/api": {
        // target：真正的后端服务器地址
        target: "https://api.example.com",
        // changeOrigin：是否把请求头中的 Host 修改为目标服务器的地址
        changeOrigin: true,
        // rewrite：重写请求路径，这里会删除开头的 /api
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

      // 也可以配置多个代理
      "/user-api": {
        target: "https://user.example.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user-api/, ""),
      },
    },
  },
});
```

这样一来，前端代码中的请求路径就可以写成 `/api/recipe/search` 形式。

前端的请求会发送到本地开发服务器，由本地开发服务器再转发到真正的后端服务器。

:::tip
Vite 的 `server.proxy` **只作用于本地开发环境**，项目部署后通常使用 Nginx 配置反向代理。
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

### useCallback

`useCallback` 用于**缓存函数**，避免组件在每次渲染时都创建新的函数。

```jsx
const handleClick = useCallback(() => {
  // 执行逻辑
}, [依赖项]);
```

只有依赖项发生变化时，React 才会重新创建函数。如果依赖项不变，即使组件重新渲染，回调函数的引⽤也会保持不变。

#### 为什么需要 useCallback

函数组件每次重新渲染时，函数都会被重新创建，函数的引用地址被更新。如果函数通过 `props` 传给了子组件，即使子组件使用了 `React.memo` 进行缓存，但由于传入的函数引用地址发生变化，导致子组件仍然会重新渲染。

:::tip
`useCallback` 需要配合 `React.memo` 使⽤，因为如果组件⾃身不缓存，就算把函数缓存了，组件也还是会重新渲染。
:::

```jsx
import { memo, useCallback, useState } from "react";

const Child = memo(function Child(props) {
  return <button onClick={props.onAdd}>+1</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("红色");

  const handleAdd = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  function handleColor() {
    setColor("蓝色");
  }

  return (
    <div>
      <p>数量：{count}</p>
      <p>颜色：{color}</p>

      <Child onAdd={handleAdd} />

      <button onClick={handleColor}>
        修改颜色
      </button>
    </div>
  );
}
```

#### useCallback 与 useMemo

`useCallback` 用于缓存函数引用，`useMemo` 用于缓存计算结果。

```jsx
useCallback(fn, deps);

// 相当于
useMemo(() => fn, deps);
```
