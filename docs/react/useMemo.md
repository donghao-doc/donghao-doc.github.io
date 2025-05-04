# React.memo 与 useMemo

`React.memo` 与 `useMemo` 都可用于性能优化，它们的区别在于：

- `React.memo` 专注于组件的缓存，而 `useMemo` 可用于数据和组件的缓存。
- `React.memo` 基于 props 的变化判断是否重新渲染组件，而 `useMemo` 是基于依赖项变化。

## React.memo

函数组件本身没有识别 props 的能⼒，每次⽗组件的更新相当于是给⼦组件传递了⼀个新的 props，导致子组件重新渲染。

`React.memo` 是高阶组件，用于优化函数组件性能，让函数组件仅在 props 变化时重新渲染，避免因为⽗组件重新渲染导致的不必要的⼦组件渲染。

```jsx
import React, { useState, useEffect } from "react";
import Child from "./Child";

const MyChild = React.memo(Child);

function App() {
  const [data, setData] = useState("初始数据");
  const [b, setB] = useState(100);

  return (
    <div>
      <p onClick={() => setData("⽗组件数据")}>我是 App {data}</p>
      <MyChild b={b} />
    </div>
  );
}
```

## useMemo

`useMemo` 可用于缓存函数的计算结果，或缓存函数组件。

仅在依赖项改变时更新，避免在每次渲染时重复计算。

```jsx
useMemo(() => {
  return 值;
}, [依赖项]);
```

:::warning

`useMemo` 是同步的，不能用于网络请求等副作用操作。

:::

### 缓存函数计算结果

以下示例，修改颜色，组件重新渲染时，total 函数不会重新执行。

```jsx
import React, { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(100);
  const [color, setColor] = useState("红⾊");

  let total = () => {
    return count * price;
  };

  let myTotal = useMemo(total, [count, price]);

  return (
    <div>
      <h1>{myTotal}</h1>
      <button onClick={() => setColor("红⾊")}>改颜⾊</button>
      <button onClick={() => setPrice(200)}>改价格</button>
    </div>
  );
}
```

### 缓存组件

以下代码，修改颜色，子组件不会重新渲染。

```jsx
import React, { useState, useMemo } from "react";
import Child from "./Child";

function App() {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(100);
  const [color, setColor] = useState("蓝⾊");

  const MyChild = useMemo(() => {
    return <Child count={count} price={price} />;
  }, [count, price]);

  return (
    <div>
      <button onClick={() => setColor("红⾊")}>改颜⾊</button>
      <button onClick={() => setPrice(200)}>改价格</button>
      {MyChild}
    </div>
  );
}
```

## 注意事项

`React.memo` 和 `useMemo` 可以优化性能，但本身也存在额外的性能开销。建议在以下场景使用：

- 组件中有复杂的计算逻辑。
- 组件的重新渲染成本较高。

对于简单的组件，使用这些优化可能得不偿失。
