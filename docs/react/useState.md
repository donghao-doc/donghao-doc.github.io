# useState

`useState` 用于在函数组件中提供状态管理。

```jsx
// 接收一个初始值，返回当前状态值和更新函数
const [state, setState] = useState(initialState);
```

当需要基于之前的状态进行更新时，可以使用**函数式更新**，即给 setState 传递一个函数。

```jsx
// 接收之前的 state，返回更新后的 state
setState((prevState) => {
  return prevState + 1;
});
```

## 定义多个状态

可以多次调用 `useState` 来定义多个状态。

```jsx
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState("banana");
const [todos, setTodos] = useState([{ text: "学习 Hook" }]);
```

## 状态的更新是异步的

状态的更新是异步的，新的状态要在下次重绘时才能获取。

```jsx
const [count, setCount] = useState(0);

setCount(1);
console.log(count); // 输出 0，而不是 1
```

## 批量更新

出于性能考虑，连续的状态修改会被合并，只执行最后一次更新操作。

```jsx
function Example() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }; // count 最终值为 1
}
```

连续的函数式更新，不会像普通的状态更新那样被合并，而是会按照顺序依次执行，每次更新都会基于前一次的结果。

```jsx
function App() {
  const [count, setCount] = useState(0);

  const change = () => {
    setCount((preCount) => {  // preCount: 0
      return preCount + 1;
    });
    setCount((preCount) => {  // preCount: 1
      return preCount + 1;
    });
    setCount((preCount) => {  // preCount: 2
      return preCount + 1;
    }); // count 最终值为 3
  };
}
```

## 修改数组和对象

修改数组和对象时，必须传入新的数据副本，不要直接对对象和数组进行赋值，否则 React 检测不到状态变化。

```jsx
function Example() {
  const [count, setCount] = useState({ value: 0 });
  const [arr, setArr] = useState([1, 2, 3]);

  const handleClick1 = () => {
    setCount((prevCount) => ({ ...prevCount, value: prevCount.value + 1 }));
  };
  const handleClick2 = () => {
    setArr((prevArr) => [...prevArr, 4]);
  };
}
```

## 顶层调用

`useState` 只能在函数组件的顶层使用，不能在条件判断、循环或嵌套函数中使用。

```jsx
// ❌ 错误示例
function WrongComponent() {
  if (someCondition) {
    const [state, setState] = useState(initialState); // Hook 在条件语句中，这是错误的
  }
  return <div>{state}</div>;
}

// ✅ 正确示例
function CorrectComponent() {
  const [state, setState] = useState(initialState); // Hook 在组件顶层

  if (someCondition) {
    return <div>{state}</div>;
  }

  return <div>Default content</div>;
}
```

## useState 底层原理

React Hook 的内部实现依赖于数组数据结构。每个组件实例都会维护一个 Hooks 数组，用于存储所有的 Hook 状态。

```jsx
// React 内部的简化实现
let hooks = [];
let currentHook = 0;

function useState(initialState) {
  const hook = hooks[currentHook];
  if (hook) {
    // 不是第一次渲染
    currentHook++;
    return hook;
  }

  // 第一次渲染
  hooks[currentHook] = [initialState, setState];
  currentHook++;
  return hooks[currentHook - 1];
}
```

当我们在组件中多次调用 `useState` 时，React 会按照调用顺序将这些状态存储在数组中。这就是为什么 Hook 必须在组件顶层调用的原因：

- 如果将 `useState` 放在条件语句中，当条件变化时，Hook 的调用顺序可能会改变
- 这会导致 React 无法正确匹配数组中已存储的状态值，从而引发错误

举例说明状态错位的情况：

```jsx
function Example(props) {
  // 第一次渲染：condition 为 true
  // hooks = [[name, setName], [age, setAge]]

  if (props.condition) {
    const [name, setName] = useState("John");
  }
  const [age, setAge] = useState(20);

  // 第二次渲染：condition 为 false
  // React 期望的顺序：name, age
  // 实际获得的顺序：age
  // 导致 age 的值错误地被赋给了 name
}
```

所以 React 强制要求 Hook 的调用顺序必须保持稳定，这样才能确保状态值能够正确地被追踪和更新。
