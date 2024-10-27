---
sidebar_position: 4
---

# React 脚手架

## 创建项目

```bash title="安装 create-react-app"
# 安装最新版
npm install -g create-react-app

# 安装指定版本
npm install -g create-react-app@3
```

```bash title="创建项目"
create-react-app hello-react
```

## 项目结构

```text
├─public            ➡ 静态资源文件（项目的根目录）
│  ├─favicon.icon
│  ├─index.html
│  ├─logo192.png
│  ├─logo512.png
│  ├─robots.txt     ➡ 爬虫协议文件
│  └─manifest.json  ➡ 应用加壳配置文件
├─src               ➡ 项目源码文件
│  ├─App.css
│  ├─App.js         ➡ App 组件
│  ├─App.test.js
│  ├─index.css
│  ├─index.js       ➡ 入口文件
│  ├─logo.svg
│  ├─reportWebVitals.js  ➡ 性能分析文件（需要 web-vitals 库的支持）
│  └─setupTests.js       ➡ 组件单元测试文件（需要 jest-dom 库的支持）
├─.gitignore
├─package.json
├─README.md
└─yarn.lock
```

```html title="public/index.html"
<!--
  %XXX% 是 React 脚手架中关键词的写法
  %PUBLIC_URL% 表示 public 目录的路径
-->
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
<!-- 也可以使用相对路径 -->
<!-- <link rel="shortcut icon" href="./favicon.ico"> -->

<!--
  用于配置浏览器页签+地址栏的颜色（仅支持安卓手机上的浏览器）
  但兼容性不太好，可能安卓手机上的浏览器也不一定有效果
-->
<meta name="theme-color" content="#000000">

<!-- 用于指定网页添加到手机主屏幕后的图标（仅支持苹果手机） -->
<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png">
  
<!-- 应用加壳时的配置文件，可配置应用的icon、权限等 -->
<link rel="manifest" href="%PUBLIC URL%/manifest.json">
```

```jsx title="src/index.js"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// reportWebVitals.js 文件用于记录页面性能
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // React.StrictMode 可用于检查 App 组件中的 React 代码是否合理
  <React.StrictMode>
    <App />
  </React.strictMode>,
  document.getElementById('root')
);

reportwebVitals();
```

## React.StrictMode

`React.StrictMode` 是 React 的一个包装组件，它提供了一些工具来帮助发现代码中的一些潜在问题。

具体来说，`React.StrictMode` 启用了额外的严格模式检查和针对常见问题的警告，可以帮助开发人员捕获潜在问题，并强制代码符合更为严格的要求。

以下是 `React.StrictMode` 提供的一些功能：

- 检测意外的副作用：在严格模式下，React 会对“不安全”生命周期方法、布尔类型的属性、副作用和重复渲染等情况产生警告，以帮助开发人员识别代码中可能会产生副作用的部分。
- 检测过时的 API：在严格模式下，React 会产生关于使用过时的 API 提示的警告，例如在组件类中使用字符串 refs 或在 componentWillMount 生命周期方法中调用 setState 方法。
- 检测不安全的生命周期方法：在严格模式下，React 会生成将被废弃的生命周期方法的警告，例如 componentWillMount 和 componentWillReceiveProps。

总之，`React.StrictMode` 提供了一个更为严格的开发环境和错误辅助工具，可以帮助开发人员捕获潜在的问题、识别过时的 API 和未来会被弃用的生命周期方法等，以提高应用程序的质量和可维护性。因此，在开发阶段或测试阶段启用 `React.StrictMode` 可以提高开发效率和代码质量。

## 样式的模块化

在不同的组件中，如果使用了相同的类名，那么在 App 组件中引入时，后引入的组件中的样式会覆盖先引入的组件的样式。要解决这个问题，可以使用“样式的模块化”。

如果将一个组件的 css 文件改名为 `xxx.module.css` 形式，那么在 js/jsx 文件中，可以使用如下形式引入并使用 css 文件中的样式。

```jsx
import React, { Component } from "react";
// 引入 css 文件
import styles from "./index.module.css";

export default class Welcome extends Component {
  render() {
    // 使用 css 文件中的类名
    return <h2 className={styles.title}>Welcome</h2>;
  }
}
```

没有使用模块化样式的元素的类名是正常形式，如 `class="title"`；使用了模块化样式的元素的类名是以组件名（前缀）和随机字符（后缀）拼接的形式，如 `class="HelloReact_title_rCT7P"`。
