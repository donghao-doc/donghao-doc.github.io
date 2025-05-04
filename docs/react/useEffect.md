# useEffect

`useEffect` 用于处理组件的副作用，如数据获取、订阅、手动修改 DOM 等。

`useEffect` 接收两个参数：回调函数和依赖数组。
- 回调函数中的代码相当于 `componentDidMount` 和 `componentDidUpdate` ，在组件挂载和更新时执行此回调。
- 回调函数可以返回一个清理函数，相当于 `componentWillUnmount`。

```jsx
useEffect(
  // 相当于 componentDidMount、componentDidUpdate
  () => {
    return () => {
      // return 是可选项，相当于 componentWillUnmount
    };
  },
  [] // 依赖项
);
```

## 依赖数组

- 不传第二个参数：任何数据变化都会触发 `useEffect` 重新执行（值相同则不会运行）。
- 空数组 `[]`：相当于不监听任何依赖，只在组件挂载时执行一次。
- 含有依赖项的数组（如 `[count]`）：只在指定的依赖项发生变化时执行。

## 清理函数

清理函数的执行时机：
- 组件卸载时执行。
- 依赖项变化导致 effect 重新执行前执行，用于清理上一次 effect 产生的副作用。

## 注意事项

应该避免在没有依赖数组的情况下使用 `useEffect`，以防止无限循环。
