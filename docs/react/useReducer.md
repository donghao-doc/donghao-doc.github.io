# useReducer

`useReducer` 可以作为 `useState` 的替代⽅案，处理更复杂的场景：

- 组件状态逻辑较复杂
- 涉及多个子值
- 下一个状态依赖于之前的状态

```jsx
const [state, dispatch] = useReducer(
  // 第⼀个参数是 reducer 函数，接收当前状态和行为对象，返回新状态
  (state, action) => {
    return newState;
  },
  // 第⼆个参数是 state 初始值
  initialArg,
  // 第三个参数是⽤于计算初始值的函数，可选
  init
);
```

## 计数器示例

```jsx
// 定义 reducer 函数处理 add 和 minus 行为

function myReducer(state, action) {
  if (action == "add") {
    return state + 1;
  } else if (action == "minus") {
    return state - 1;
  } else {
    return 0;
  }
}

export { myReducer };
```

```jsx
import React, { useReducer, useState } from "react";
import { myReducer } from "./reducers";

function App() {
  const [state, dispatch] = useReducer(myReducer, 0);

  return (
    <div>
      <h1>{state}</h1>

      {/* 使用 dispatch 函数触发状态更新 */}
      <button onClick={() => dispatch("add")}>+</button>
      <button onClick={() => dispatch("minus")}>-</button>
    </div>
  );
}
```

## 高级用法

可以通过第三个参数（初始化函数）来自定义初始状态的计算逻辑。

```jsx
import React, { useReducer, useState } from "react";
import { myReducer } from "./reducers";

function init(initCount) {
  return "hello";
}

function App() {
  // 0 会作为 init 函数中的参数传⼊
  const [state, dispatch] = useReducer(myReducer, 0, init);

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={() => dispatch("add")}>+</button>
      <button onClick={() => dispatch("minus")}>-</button>
    </div>
  );
}
```
