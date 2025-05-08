# useEffect

`useEffect` 用于处理组件的副作用，如数据获取、订阅、操作 DOM 等。

`useEffect` 接收两个参数：回调函数和依赖项数组。

**回调函数：**

- 回调函数相当于 `componentDidMount` 和 `componentDidUpdate`，在组件挂载和更新时执行。
- 回调函数可以返回一个清理函数，相当于 `componentWillUnmount`，在组件卸载时执行。

**依赖项数组：**

- 含有依赖项的数组（如 `[count]`）：在指定的依赖项发生变化时重新执行 `useEffect`。
- 空数组 `[]`：不监听任何依赖，只在组件挂载时执行一次，组件更新时不会执行。
- 不传依赖项数组（默认）：组件的任何数据变化都会触发 `useEffect` 重新执行（值相同则不会执行）。

```jsx
useEffect(
  // 相当于 componentDidMount、componentDidUpdate
  () => {
    return () => {
      // return 是可选项，相当于 componentWillUnmount
    };
  },
  [] // 依赖项数组
);
```

:::warning

应该避免在没有依赖数组的情况下使用 `useEffect`，以防止无限循环。

:::
