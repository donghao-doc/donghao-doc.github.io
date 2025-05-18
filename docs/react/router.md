# React Router

React Router 有三种实现：

- **react-router**：核心库，通用实现，适用于浏览器和原生应用。
- **react-router-dom**：基于浏览器环境的实现，Web 项目常用。
- **react-router-native**：基于 React Native 的实现，适用于移动端原生应用（App）。

## 基本使用

```bash
# 安装
npm install react-router-dom
```

::: code-group

```tsx [创建路由器]
// router.tsx

import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";

// createBrowserRouter 创建一个基于 HTML5 History API 的路由器对象
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // element 是路由对应的组件
  },
  {
    path: "/about",
    element: ( // element 也可以是一段 JSX
      <div>
        <h1>我是 About</h1>
      </div>
    ),
  },
  { path: "*", element: <h1>404</h1> }, // 通配符，匹配所有未定义路由，写在最后
]);

export default router;
```

```tsx [应用路由器]
// App.tsx

import { RouterProvider } from "react-router-dom";
import router from "./router";
import Header from "./Header";

function App() {
  return (
    <>
      {/* Header 不会随路由切换而变化 */}
      <Header />
      <main>
        {/* 路由容器，路由切换时，会自动渲染对应的组件 */}
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
```

:::

## 路由跳转

### Link 与 NavLink

都可用于跳转页面，会被渲染为 `<a>` 标签，但不会刷新页面。

不同在于，`NavLink` 可根据当前路由自动添加激活样式，常用于导航栏。

```tsx
import { Link, NavLink } from "react-router-dom";

<Link to="/about">About</Link>

<NavLink
  to="/home"
  style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}
>
  Home
</NavLink>
<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? "activeLink" : "link")}
>
  About
</NavLink>
```

::: warning

`Link` 和 `NavLink` 是路由组件，需要在路由应用（`RouterProvider`）中使用，不能直接在普通组件中使用。

:::

### 编程式导航

```tsx
import { useNavigate } from "react-router-dom";

function MyButton() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/contact");
    navigate(-1); // 返回上一页
  }

  return <button onClick={handleClick}>Go to Contact</button>;
}
```

::: warning

与 `Link` 和 `NavLink` 一样，`useNavigate()` 也必须在路由应用（`RouterProvider`）中使用，不能直接在普通组件中使用。

:::

### push 与 replace

默认情况下，路由跳转会在浏览器历史堆栈中添加新条目（`push`），而 `replace` 会替换当前历史条目。

```tsx
<Link to="/locations" replace>Locations</Link>

<NavLink to="/locations" replace>Locations</NavLink>

navigate("/locations", { replace: true });
```

## 路由传参

### 查询参数

::: code-group

```tsx [路由跳转]
<Link to="/users?name=John&age=20">Users</Link>
```

```tsx [组件内获取参数]
import { useSearchParams } from "react-router-dom";

const [searchParams, setSearchParams] = useSearchParams();

// 获取查询参数
const name = searchParams.get("name");

// 修改查询参数
setSearchParams({ name: "John", age: "20" });
```

:::

### 动态路由参数

::: code-group

```tsx [路由配置]
{
  // 路径中可以有多个动态参数，用 / 分隔
  path: "users/:userId/:name/profile",
  element: <UserDetails />,
}
```

```tsx [路由跳转]
<Link to="/users/123/John/profile">Users</Link>
```

```tsx [组件内获取参数]
import { useParams } from "react-router-dom";

const { userId, name } = useParams();
```

:::

### State

如果要传递复杂状态，或者不适合明文放在 URL 中的数据，可以在路由跳转时传递状态对象。

::: code-group

```tsx [路由跳转]
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/users", { state: { from: "login" } });
```

```tsx [组件内获取状态]
import { useLocation } from "react-router-dom";

const location = useLocation();
const { from } = location.state;
```

:::

## 嵌套路由

加了 `index` 属性的默认⼦路由，不允许再有⼦路由了。

```tsx
const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home></Home>,
    children: [
      {
        // index 表示默认⼦路由，即渲染⽗路由组件时会默认加载此⼦路由组件，无需指定 path
        index: true,
        element: <Home11 />,
      },
      {
        path: "home2", // 子路由路径不加 /，默认在⽗路由基础上叠加
        element: <Home22 />,
      },
    ],
  },
  {
    path: "about",
    element: <About></About>,
  },
]);
```

`<Outlet />` 表示嵌套路由的渲染位置。

```tsx
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>我是home组件</h1>
      <Outlet />
    </>
  );
}
```

::: info

一级路由由 `RouterProvider` 决定在哪儿显示，嵌套路由由 `Outlet` 决定在哪儿显示。

:::

## 路由懒加载

结合 `React.lazy` 和 `Suspense` 实现路由组件的懒加载，提升性能。

```tsx
// 使用 React.lazy 动态导入路由组件
const UserProfile = React.lazy(() => import("./UserProfile"));

const router = createBrowserRouter([
  {
    path: "/users/:id",
    element: <UserProfile />,
  },
]);

export default router;
```

```tsx
import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Loading } from "./Loading";

function App() {
  return (
    // 使用 Suspense 组件包裹懒加载组件，并指定⼀个回退内容
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
```

## 路由模式

- **createHashRouter** 创建⼀个基于 URL 的 hash 部分来进⾏路由的路由器，当 hash 发⽣变化时，⻚⾯不会重新加载。
- **createBrowserRouter** 创建⼀个 HTML5 History API 的路由器，它利⽤了 pushState 和 replaceState ⽅法来保持 UI 和 URL 的同步，也不会引起⻚⾯重新加载。

区别：

- **URL 格式**：createHashRouter 创建的路由器产⽣的 URL 中会包含 `#`，createBrowserRouter 创建的路由器产⽣的 URL 更“干净”。
- **服务器配置**：
  - createHashRouter 不需要特殊的服务器配置，因为实际路径始终不变，只是 hash 部分变化，这对于服务器是透明的。
  - createBrowserRouter 需要对服务器进行配置，以返回对所有可能路径的请求同⼀个 index.html ⽂件，因为它利⽤的是 HTML5 History API。
- **兼容性**：
  - createHashRouter 依赖于 URL 的 hash，⼏乎被所有浏览器⽀持。
  - createBrowserRouter 依赖于 HTML5 的 History API，可能在旧浏览器上不⽀持。

## Data API

用于在路由层面上管理和预加载数据，在组件渲染时提前准备好数据。

### 基本使用

1. 在路由表中通过 `loader` 加载数据。

```tsx
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const UserDetail = lazy(() => import("../pages/UserDetail"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user-detail/:id",
    element: <UserDetail />,
    // params：从路由中解析的动态参数
    // request：当前请求对象，包括请求 url、请求方法、请求头等
    // context：服务端渲染（SSR）时传递的额外信息对象
    loader: async ({ params, request, context }) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
      const res = await response.json();
      return res;
    },
  },
]);

export default router;
```

2. 在组件中通过 `useLoaderData` 获取数据。

```tsx
import { useLoaderData } from "react-router-dom";

function UserDetail() {
  const data = useLoaderData(); // 获取在 loader 中返回的数据
  return <div>{data.body}</div>;
}

export default UserDetail;
```

### 重定向

在 `loader` 中可以进行逻辑判断，如果条件不满足，则抛出 `redirect` 重定向到指定路由。

例如，当用户访问一个需要认证的路由时，如果用户未登录，则重定向到登录页。

```tsx
<Route
  path="dashboard"
  loader={async () => {
    const user = await fake.getUser();

    if (!user) {
      // if you know you can't render the route, you can
      // throw a redirect to stop executing code here,
      // sending the user to a new route
      throw redirect("/login"); // throw 语句会立即中断当前函数的执行
    }

    // otherwise continue
    const stats = await fake.getDashboardStats();

    return { user, stats };
  }}
/>
```

## 路由守卫

通过自定义高阶组件，实现路由守卫。

::: code-group

```tsx [自定义高阶组件]
function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const auth = useAuth(); // 自定义 hook 检查认证状态

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [auth.isLoggedIn]);

  return auth.isLoggedIn ? children : null;
}
```

```tsx [路由表中使用自定义高阶组件]
import { PrivateRoute } from "./PrivateRoute";
import Dashboard from "./Dashboard";

{
  path: "dashboard",
  element: <PrivateRoute><Dashboard /></PrivateRoute>,
}
```

:::
