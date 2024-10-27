---
#sidebar_position: 1
title: JSX 语法
---

## JSX 介绍

JSX（JavaScript XML）是 React 定义的一种类似于 XML 的 JS 扩展语法，即 JS + XML。

它的本质是 `React.createElement(component, props, children)` 的语法糖，用来简化创建虚拟 DOM，如 `const ele = <h1>Hello JSX</h1>`。

注意，`<h1>Hello JSX</h1>` 不是字符串，也不是 HTML/XML 标签，它最终生成的是一个 JS 对象。

![VDOM_Object](images/VDOM_Object.png)

## 语法规则

- 定义虚拟 DOM 时，不要写引号。
- 标签中混入 JS 表达式时，要用 `{}`（`{}` 中只能写 JS 表达式，不能写语句）。
- `{}` 中如果写布尔类型、`null`、`undefined` 等值，将不会在页面中显示。
- 指定样式的类名使用 `className` 而不是 `class`，因为 `class` 是 ES6 中的关键字。
- 内联样式要写成 `style={{ key1: value1, key2: value2 }}` 的形式，其中外层的 `{}` 表示里面写的是 JS 代码，内层的 `{}` 表示这是一个对象。
- 虚拟 DOM 只能有一个根标签。
- 虚拟 DOM 中的标签必须闭合，如：`<h1></h1>`、`<input />`。
- 虚拟 DOM 中的标签不是 HTML 标签，而是 JSX 里的标签，这些标签最终会被转为 HTML 标签。
- 标签名首字母：
    - 若小写字母开头，React 就会将该标签转换为 HTML 中的同名元素，若 HTML 中没有该同名元素，就报错。
    - 若大写字母开头，React 就会把它当做组件渲染，若组件未定义，就报错。

## 示例

```jsx
const id = 'title'
const content = 'Hello React'
const VDOM = (
  <div>
    <h1 id={id} className="title">
      <span style={{ color: 'green', fontSize: '50px' }}>
        { content.toUpperCase() }
      </span>
    </h1>
    <input type="text" />
  </div>
)
```
