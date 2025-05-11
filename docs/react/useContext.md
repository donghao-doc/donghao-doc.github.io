# useContext

`useContext` 用于读取 context 的值和订阅 context 的变化，简化了在组件中获取上下文数据的方式。

但仍然需要在上层组件树中使⽤ `<MyContext.Provider>` 来为下层组件提供 context。

完整代码示例：

::: code-group

```jsx [context.js]
import { createContext } from "react";

const MyContext = createContext("默认值");

export default MyContext;
```

```jsx [Parent.jsx]
import { useState } from "react";
import MyContext from "./context";
import Child from "./Child";

function Parent() {
  const [value, setValue] = useState("父组件数据");

  return (
    <MyContext.Provider value={value}> {/* [!code highlight] */}
      <Child />
    </MyContext.Provider>
  );
}
```

```jsx [Child.jsx]
import GrandChild from "./GrandChild";

function Child() {
  return <GrandChild />;
}
```

```jsx [GrandChild.jsx]
import { useContext } from "react";
import MyContext from "./context";

function GrandChild() {
  const value = useContext(MyContext); // [!code highlight]

  return <div>我是孙子组件 {value}</div>;
}
```

:::
