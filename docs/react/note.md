# React 学习笔记

## JSX

JSX 是 JavaScript 的语法扩展，允许在 JS 中编写 HTML 而无需加引号。

```jsx
const element = <h1>Hello, World!</h1>;

// 这段 JSX 会被编译成以下 JavaScript
const element = React.createElement("h1", null, "Hello, World!");
```

JSX 核心规则：

- 使用 `{}` 插入变量，`{}` 提供了 JS 的执行环境，大括号内可以写任意的 JS 表达式，但不能写语句（如 `if`、`for` 等）。
- 最外层只能有一个根元素。
- `class` 要写成 `className`。
- `style` 要写成对象形式（双大括号），外层大括号表示提供了一个 JS 环境，内层大括号表示这是一个样式对象。

```jsx
function UserCard() {
  const name = "小明";
  const score = 95;
  const isPassed = score >= 60;

  return (
    <div
      className="user-card"
      style={{ padding: "16px", fontSize: "18px" }}
    >
      <h2>{name}</h2>
      <p>分数：{score}</p>
      <p>结果：{isPassed ? "通过" : "未通过"}</p>
    </div>
  );
}
```
