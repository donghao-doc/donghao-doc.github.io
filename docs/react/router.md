# React Router

React Router 用于在 React 单页应用中根据不同 URL 渲染不同页面。

react-router 有以下⼏部分：

- `react-router` 是浏览器和原⽣应⽤的通⽤部分。
- `react-router-dom` ⽤于浏览器。
- `react-router-native` ⽤于原⽣应⽤。

```shell
npm install react-router-dom
```

## 基本使用

使用 `createBrowserRouter` 创建路由，再通过 `RouterProvider` 将路由提供给整个应用。

:::code-group

```jsx [创建路由]
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home";
import About from "./About";

// createBrowserRouter 创建路由实例
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    // 路由通配符，前面的路由都没有匹配成功，就匹配这个，所以要放在最后，常用于 404 页面
    path: "*",
    element: <h1>404</h1>,
  },
]);
```

```jsx [使用 RouterProvider]
function App() {
  // 将创建好的路由对象传给 RouterProvider
  // RouterProvider 会根据浏览器当前的 URL，找到对应路由并渲染相应页面
  return <RouterProvider router={router} />;
}
```

:::

## 路由跳转

常见的路由跳转方式有两种：

- 标签跳转：使用 `Link`、`NavLink`。
- 编程式导航：使用 `useNavigate`。

### 标签跳转

- `Link` 用于页面之间的普通跳转。
- `NavLink` 和 `Link` 类似，但它可以判断当前路由是否处于激活状态并添加样式，因此更适合导航菜单。

:::code-group

```jsx [Link]
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      {/* to 表示要跳转的目标路径 */}
      <Link to="/">首页</Link>
      <Link to="/about">关于</Link>
    </nav>
  );
}
```

```jsx [NavLink]
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink
        to="/home"
        className={(info) =>
          // 可以通过 info.isActive 来判断当前路由是否激活
          info.isActive ? "active" : ""
        }
      >
        首页
      </NavLink>
    </nav>
  );
}
```

:::

### 编程式导航

当跳转不是用户点击时触发，而是由代码逻辑决定时，可以使用 `useNavigate`。

:::info
例如：登录成功后自动跳转、表单提交成功后跳转等。
:::

```jsx
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();

  function handleLogin() {
    // 登录成功后跳转
    navigate("/home", {
      replace: true, // 跳转后替换当前历史记录
    });
  }

  return (
    <button onClick={handleLogin}>登录</button>
  );
}
```

### replace

默认情况下，路由跳转会向浏览器历史堆栈中添加一条新记录。

使用 `replace`，会用新页面替换当前历史记录，而不是新增一条记录。

```jsx
<Link to="/login" replace>登录</Link>
```

```jsx
const navigate = useNavigate();

navigate("/home", {
  replace: true, // 跳转后替换当前历史记录
});
```

:::info
常见场景：登录成功 → 跳转首页 → 不希望用户点击返回再次回到登录页。
:::

### 前进/后退

```jsx
// 返回上一页
navigate(-1);

// 前进一页
navigate(1);
```

## 路由传参

常见的传参方式有三种：

- 查询参数：参数放在 URL 的 `?` 后面。
- 动态路由参数：参数是 URL 路径的一部分。
- `state`：参数不显示在 URL 中。

### 查询参数

查询参数位于 URL 的 `?` 后面，如 `/search?keyword=react&page=2`。

```jsx
import { useSearchParams } from "react-router-dom";

function Search() {
  // 可以使用 useSearchParams 获取
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");

  function handleSearch() {
    // 也可以修改查询参数
    setSearchParams({
      keyword: "react",
      page: "1",
    });
  }

  return (
    <p>{keyword}，第 {page} 页</p>
  );
}
```

### 动态路由参数

动态路由参数跟在路径中，如 `/users/1001`。

路由配置：

```jsx
{
  // :userId 表示动态参数
  path: "/users/:userId",
  element: <UserDetails />,
}
```

使用 `useParams` 获取参数：

```jsx
import { useParams } from "react-router-dom";

function UserDetails() {
  const params = useParams();

  return <p>用户 ID：{params.userId}</p>;
}
```

### state 参数

`state` 可以在路由跳转时携带复杂数据，且不会在 URL 中显示。

:::code-group

```jsx [传递 state 数据]
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/details", {
      state: {
        name: "小明",
        age: 18,
      },
    });
  }

  return <button onClick={handleClick}>查看详情</button>;
}
```

```jsx [获取 state 数据]
import { useLocation } from "react-router-dom";

function Details() {
  const location = useLocation();

  return (
    <p>
      {location.state.name}，{location.state.age} 岁
    </p>
  );
}
```

:::

## 嵌套路由

:::code-group

```jsx [配置子路由]
const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        // index: true 表示父路由的默认子路由
        // 访问 /home 时，会默认渲染 <HomeIndex />
        index: true,
        element: <HomeIndex />,
      },
      {
        // 不用写 /home，也不用写 /，它会自动拼接父路由路径，形成 /home/profile
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
```

```jsx [父组件使用 Outlet 指定子路由渲染的位置]
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>首页</h1>

      {/* 当访问 /home/profile，此处 <Outlet /> 相当于 <Profile /> */}
      <Outlet />
    </div>
  );
}
```

:::

## 路由懒加载

路由懒加载：只有用户访问某个页面时，才加载该页面对应的代码。

这样可以避免应用启动时一次性加载所有页面，减少首屏需要加载的 JavaScript 体积。

### 使用 lazy 按需加载

```jsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// 使用 lazy() 动态导入组件
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);
```

### Suspense

懒加载的组件需要一定时间才能下载完成，因此需要使用 `Suspense` 指定加载期间显示的内容。

```jsx
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    // 懒加载的组件还没有加载完成时，显示 fallback 的内容
    <Suspense fallback={<p>加载中...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
```

## 路由模式

常见的路由模式有两种：

- `createBrowserRouter`：Browser 模式，基于浏览器的 History API 实现路由。
- `createHashRouter`：Hash 模式，基于 URL 中的 `#` 后面的 Hash 进行路由。

```jsx
import { createBrowserRouter, createHashRouter } from "react-router-dom";

// const router = createHashRouter([])
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);
```

两者区别：

- Browser Router 部署到 Nginx 时要配置 404 重定向到 `index.html`，因为路径中的参数会被当作路径发送给服务器；Hash Router 不用配置，因为 `#` 后面的内容不会发送给服务器。
- Hash Router 路径有 `#`，Browser Router 路径没有 `#`，更美观。
- Hash Router 兼容性更好，但现代浏览器都能很好地支持 History API，所以 Browser Router 也能放心使用。

:::tip
优先使用 Browser Router，若无法配置服务器，或者是纯前端静态项目，也可以使用 Hash Router。
:::

## Data API

### loader、useLoaderData

在页面渲染之前，在路由层⾯上管理和预加载数据。

:::code-group

```jsx [loader 加载数据]
const router = createBrowserRouter([
  {
    path: "/users",
    element: <UserList />,
    // loader 用于在进入某个路由时加载该页面需要的数据
    async loader() {
      const response = await fetch("/api/users");
      const data = await response.json();
      return data;
    },
  },
]);
```

```jsx [useLoaderData 获取数据]
import { useLoaderData } from "react-router-dom";

function UserList() {
  // 获取当前路由中的 loader 返回的数据
  const users = useLoaderData();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

:::

### redirect

`loader` 中可以根据条件进行路由重定向。

:::info
适用于登录态判断、权限判断等情况。
:::

```jsx
import { createBrowserRouter, redirect } from "react-router-dom";

async function userLoader() {
  const user = await getUser();

  // 未登录，跳转到登录页
  if (!user) {
    return redirect("/login");
  }

  // 已登录，返回用户数据
  return user;
}

const router = createBrowserRouter([
  {
    path: "/user",
    element: <User />,
    loader: userLoader,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
```
