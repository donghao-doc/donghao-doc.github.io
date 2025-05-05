# useCallback

`useCallback` ⽤于缓存函数，避免组件在每次渲染时都创建新的函数实例。

`useCallback` 接收两个参数：

- 第一个参数：需要缓存的函数。
- 第二个参数：依赖项数组，当依赖项变化时，才会重新创建函数。依赖项不变时，即使组件重新渲染，函数引用也保持不变。

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## 依赖项数组

- 如果不传第二个参数：每次渲染都会重新创建函数，失去了缓存的意义。
- 如果传空数组 `[]`：函数只会在组件首次渲染时创建，之后一直使用这个缓存的版本。这可能导致函数内部无法访问到最新的 props 或 state。

```jsx
// 不传依赖项 - 每次渲染都会重新创建
const callback1 = useCallback(() => {
  console.log(count);
});

// 空依赖数组 - 只在首次渲染时创建
const callback2 = useCallback(() => {
  console.log(count);  // 永远访问到的是首次渲染时的 count 值
}, []);

// 正确做法 - 依赖项包含所有在回调中使用的变量
const callback3 = useCallback(() => {
  console.log(count);
}, [count]);
```

因此，建议始终将函数内部使用到的所有 props 和 state 添加到依赖项数组中，以确保函数能够访问到最新的值。

## 使用场景

当父组件传递回调给子组件时，可以在父组件中使用 `useCallback` 缓存回调函数，避免子组件在每次父组件渲染时重新渲染。

:::tip

`useCallback` 需要配合 `React.memo` 使用才能发挥作用。

因为如果子组件本身没有使用 `React.memo` 进行缓存，即使使用 `useCallback` 缓存了函数，子组件还是会在每次父组件渲染时重新渲染。

:::

```jsx
import React, { useCallback, useState } from "react";
import Child from "./Child";

const MyChild = React.memo(Child);

function App() {
  let [count, setCount] = useState(0);
  let [num, setNum] = useState(0);

  let fn = () => {
    return 123;
  };

  let myFn = useCallback(fn, [num]);

  return (
    <div>
      <MyChild fn={myFn} />
      <button onClick={() => setCount(count + 1)}>改变{count}</button>
      <button onClick={() => setNum(100)}>改num{num}</button>
    </div>
  );
}

export default App;
```

## 注意事项

- 避免过度优化：不要在所有函数上都使用 `useCallback`，只在需要的地方使用它，比如传递给使用了 `React.memo` 的子组件的回调函数。
- 性能权衡：`useCallback` 本身也需要额外的内存来存储函数，并且需要进行依赖项的比较，这些都会带来一定的性能开销。
- 合理使用：如果子组件经常重新渲染，且回调函数比较复杂，这时使用 `useCallback` 才更有意义。

## 与 useMemo 的比较

`useCallback` 的⽤法与 `useMemo` 类似，区别在于 `useCallback` 缓存的是函数，⽽ `useMemo` 缓存的是值。

- `useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。
- `useMemo` 主要是⽤来缓存值，⽽ `useCallback` 主要⽤来缓存函数。
