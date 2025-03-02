---
sidebar_position: 2
title: JSX
---

## 简介

JSX（JavaScript XML）是 JavaScript 的语法扩展，允许在 JS 中编写 HTML 而无需加引号。

它的本质是 `React.createElement(component, props, children)` 的语法糖，用来**简化创建虚拟 DOM**。

```jsx
// JSX 语法
const element = <h1>Hello JSX</h1>;

// 编译成 JS 后
const element = React.createElement('h1', null, 'Hello JSX');
```

注意，`<h1>Hello JSX</h1>` 不是字符串，也不是 HTML/XML 标签，它最终生成的是一个 JS 对象。

## 语法规则

- 定义虚拟 DOM 时，不要写引号。
- 标签中混入 JS 表达式，要用 `{}`，`{}` 中只能写 JS 表达式，不能写语句。
- `{}` 中如果写布尔类型、`null`、`undefined` 等值，将不会在页面中渲染。
- 指定样式的类名使用 `className` 而不是 `class`，因为 `class` 是 ES6 中的关键字。
- 内联样式要写成 `style={{ key1: value1, key2: value2 }}` 的形式，外层的 `{}` 表示里面写的是 JS 代码，内层的 `{}` 表示这是一个对象。
- 虚拟 DOM 只能有一个根标签。
- 虚拟 DOM 中的标签必须闭合，如：`<h1></h1>`、`<input />`。
- 虚拟 DOM 中的标签不是 HTML 标签，而是 JSX 里的标签，这些标签最终会被转为 HTML 标签。
- 标签名首字母：
  - 若小写字母开头，React 会将该标签转换为 HTML 中的同名元素，若 HTML 中没有该同名元素，就报错。
  - 若大写字母开头，React 会把它当做组件渲染，若组件未定义，就报错。

```jsx title="示例"
const id = 'title';
const content = 'Hello React';
const VDOM = (
  <div>
    <h1 id={id} className="title">
      <span style={{ color: 'green', fontSize: '50px' }}>
        {content.toUpperCase()}
      </span>
    </h1>
    <input type="text" />
  </div>
);
```

## 条件渲染

可以使用 `if` 语句、`&&` 运算符和三元运算符来选择性地渲染 JSX。

```jsx title="if 语句"
function Welcome(props) {
  if (props.isMember) {
    return <h1>欢迎您，尊贵的会员</h1>;
  } else {
    return <h1>下午好，普通用户</h1>;
  }
}
```

```jsx title="&& 运算符"
function Notification({ count }) {
  return count > 0 && <h1>你有{count}条新通知</h1>; // 布尔值不会在页面中渲染
}
```

```jsx title="三元运算符"
function Welcome({ isMember }) {
  return isMember ? <h1>欢迎您，尊贵的会员</h1> : <h1>下午好，普通用户</h1>;
}
```

如果希望条件不成立时，不渲染任何内容，可以返回 `null`。

```jsx
function Welcome({ isMember }) {
  return isMember ? <h1>欢迎您，尊贵的会员</h1> : null;
}
```

## 列表渲染

`key` 属性用于唯一标识列表中的每一项，以便在后续更新时，React 只会重新渲染发生变化的部分，而不会影响到未变化的部分。

```jsx
function Week(props) {
  let items = props.arr.map((item) => <li key={item}>{'星期' + item}</li>);
  return <ul>{items}</ul>;
}

let arr = [1, 2, 3, 4, 5];

root.render(<Week arr={arr} />);
```

:::warning
不能使用 `Math.random()`、`new Date().getTime()` 作为 `key` 的值，因为每次渲染时，`key` 都会发生变化，导致 React 每次都会重新渲染每个元素，没有达到性能优化的目的。
:::
