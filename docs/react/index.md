# React 核心

## Hooks

### 使用规则

React 要求所有的 Hook（包括自定义 Hook）都必须在函数组件的顶层调用，不能在条件判断、循环或嵌套函数中调用。

这是因为 React 是通过 Hook 的**调用顺序**来管理 Hook 和组件的状态，如果在条件判断、循环或嵌套函数中调用 Hook，那么在组件的多次渲染中，Hook 的调用顺序可能会改变，导致 React 无法正确匹配状态和对应的 Hook。

```jsx
// ❌ 错误示例：在条件语句中调用 Hook
function MyComponent() {
  if (someCondition) {
    const [state, setState] = useState(); // 可能破坏 Hook 的顺序
  }
  // ...
}
```

```jsx
// ✅ 正确示例：在顶层调用 Hook
function MyComponent() {
  const [state, setState] = useState();
  // ...
}
```

在自定义 Hook 中调用其他 Hook 时，也要遵循顶层规则。

```jsx
// ✅ 正确示例：自定义 Hook 内部调用其他 Hook
function useCustomHook() {
  const [value, setValue] = useState();
  return value;
}
```

### 底层原理

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

当我们在组件中多次调用 Hook 时，React 会按照调用顺序将这些状态存储在数组中。

这就是为什么 Hook 必须在组件顶层调用的原因：如果将 Hook 放在条件语句中，当条件变化时，Hook 的调用顺序可能会改变，这会导致 React 无法正确匹配数组中已存储的状态值，从而引发错误。

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

## 组件

## 状态管理

## 路由

## 数据请求

## React 周边

- [React 官方中文文档](https://zh-hans.react.dev/)
- [Create React App 中文文档](https://create-react-app.bootcss.com/)
- [React Router](https://reactrouter.com/home)
- [Redux 中文官网](https://cn.redux.js.org/)

- [Ant Design](https://ant.design/index-cn)
- [React Hook Form](https://react-hook-form.com/)：高性能、灵活、可扩展的表单，且具有易于使用的校验。
- [Reaviz](https://reaviz.dev/)：React 数据可视化组件库，利用 d3.js 的强大功能和 Framer Motion 的流畅动画能力，让数据栩栩如生。
