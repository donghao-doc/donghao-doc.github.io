# Redux

Redux 是一个**全局状态管理工具**，用于集中管理多个组件都需要使用的数据。

```bash
npm install @reduxjs/toolkit react-redux
```

- `@reduxjs/toolkit`：Redux 官方推荐的开发工具集 Redux Toolkit（RTK），内部已经包含 Redux，用于简化 Redux 的开发流程。
- `react-redux`：负责让 React 组件读取和修改 Redux 中的数据。

## 核心概念

- `store`：数据仓库，整个应用的全局状态都保存在 `store` 中。
- `state`：Store 中真正保存数据的地方。
- `action`：具有 `type` 字段的普通对象，用来描述要对 `state` 做什么操作。
- `Action Creator`：是一个函数，用于创建并返回 `action`，不用每次都⼿动编写 `action` 对象。
- `reducer`：是⼀个函数，用于根据 `action` 修改 `state`。
- `dispatch`：用于派发 `action`，以更新对应的 `state`。

## Redux Toolkit 基本使用

:::code-group

```jsx [1. 创建 slice]
import { createSlice } from "@reduxjs/toolkit";

// slice 可以理解为全局状态中的一个“模块”，里面放的是状态和修改状态的方法
const counterSlice = createSlice({
  // slice 的名称，它会参与生成 action 的 type，如 counter/increment
  name: "counter",

  // slice 的初始数据
  initialState: {
    value: 0,
  },

  // 修改状态的方法
  reducers: {
    increment(state) {
      state.value += 1;
    },

    decrement(state) {
      state.value -= 1;
    },

    // 如果 action 需要携带数据，可以通过 action.payload 获取
    // 调用：dispatch(incrementByAmount(5))，此时 action.payload 就是 5
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
});

// createSlice 会自动根据 reducers 生成对应的 Action Creator，不用手写 action
export const {
  increment, decrement, incrementByAmount
} = counterSlice.actions;

export default counterSlice.reducer;
```

```jsx [2. 配置 store]
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

// 使用 configureStore 创建 Store，并把各个 slice 的 reducer 注册进去
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
```

```jsx [3. 使用 Provider]
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 在应用最外层使用 Provider，把 store 提供给整个应用 */}
    {/* 被 Provider 包裹的组件，都可以访问 store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

```jsx [4. 读取/修改数据]
import { useSelector, useDispatch } from "react-redux";

// useSelector 用于读取 store 中的数据
// state 是整个 store 的状态
const count = useSelector((state) => {
  return state.counter.value;
});

const dispatch = useDispatch();

// 通过 dispatch 方法派发 action，修改 store 中的数据
dispatch(increment());
```

:::

## 异步逻辑与数据请求

`reducer` 是同步更新 state，如果要异步更新 `state`，可以使用 `redux-thunk` 中间件。

但 Redux Toolkit 默认集成了 `redux-thunk`，所以不需要额外安装。

### Thunk 基本使用

- 同步的 action 是⼀个对象：`{ type: "", payload: "" }`。
- 异步的 action 是⼀个函数（thunk 函数），thunk 函数默认接收 `dispatch` 当参数。

:::code-group

```jsx [1. 创建 Slice]
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    users: [],
  },

  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

// 这里的 setUsers 是普通同步 action
export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
```

```jsx [2. 创建 Thunk]
import { setUsers } from "./userSlice";

// 创建 Thunk 函数（异步 action）
export function getUsers() {
  return async function (dispatch) {
    const response = await fetch("/api/users");
    const data = await response.json();

    // 通过 dispatch 派发同步 action
    dispatch(setUsers(data));
  };
}
```

```jsx [3. 组件中调用]
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./getUsers";

function UserList() {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  function handleLoad() {
    // 派发的不是同步 action，而是一个 Thunk 函数
    dispatch(getUsers());
  }

  return (
    <div>
      <button onClick={handleLoad}>加载用户</button>

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
```

:::

### Thunk 的参数

Thunk 函数最常用的两个参数是：

- `dispatch`：派发 `action`。
- `getState`：获取当前 Store 中的 `state`。

```jsx
export function getUsers() {
  return async function (dispatch, getState) {
    const state = getState();

    console.log(state.user);

    const response = await fetch("/api/users");
    const data = await response.json();

    dispatch(setUsers(data));
  };
}
```


## 整体流程

:::code-group

```text [同步修改数据]
组件
 ↓
dispatch(action)
 ↓
slice 中的 reducer 处理
 ↓
修改 Store 中的 state
 ↓
组件获取新 state 并并重新渲染
```

```text [异步修改数据]
组件
 ↓
dispatch(thunk)
 ↓
执行异步请求
 ↓
请求完成
 ↓
dispatch(action)
 ↓
reducer 更新 state
 ↓
组件获取新数据并重新渲染
```

:::
