---
#sidebar_position: 1
title: 周边
---

## cjs 和 umd 的区别

cjs 全称 CommonJS，是 Node.js 支持的模块规范；umd 是统一模块定义，兼容各种模块规范（含浏览器）。

理论上优先使用 umd，同时支持 Node.js 和浏览器。

最新的模块规范是使用 import 和 export 关键字。

## 受控组件与非受控组件

**非受控组件**：组件中，所有输入类的表单元素（如 input、radio、checkbox 等），需要用到里面的值的时候再去取表单元素的值（现用现取），就是非受控组件。

```jsx title="非受控组件"
class Login extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const { username, password } = this
    console.log('username:', username.value)
    console.log('password:', password.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref={node => this.username = node} type="text" name="username" />
        <input ref={node => this.password = node} type="password" name="password" />
        <button>登录</button>
      </form>
    )
  }
}
```

**受控组件**：组件中，所有输入类的表单元素（如 input、radio、checkbox 等），在值发生变化时实时地存储到状态中，需要用到这些值的时候直接从 state 中取值（类比 Vue 中的 `v-model`），就是受控组件。

```jsx title="受控组件"
class Login extends React.Component {
  state = { username: '', password: '' }
  
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }
  handleSubmit = () => {
    const { username, password } = this.state
    console.log('submit:', username, password)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" onChange={this.handleUsernameChange} />
        <input type="password" name="password" onChange={this.handlePasswordChange} />
        <button>登录</button>
      </form>
    )
  }
}
```

:::tip
对于非受控组件，在获取表单元素的值时，需要用到 `ref` 来标识元素。由于 React 文档说了不要过度地使用 ref，所以更推荐使用受控组件。
:::


## 纯函数

⼀个函数的返回结果只依赖于它的参数，并且在执⾏过程中没有副作⽤，我们就把这个函数叫做纯函数。

副作⽤（side effect）是指函数或表达式在执⾏过程中对外部环境产⽣的影响，⽽不仅仅是返回⼀个值。

副作⽤包括但不限于对全局变量、参数、数据结构、⽂件系统、⽹络请求等进⾏修改。

```js title="非纯函数"
let a = 5

function fn(b) {
  return a + b  // 因为返回值依赖了外部的 a，而不仅仅是依赖参数
}
fn(8)

function fn(obj, a) {
  obj.age = 18    // 修改了参数
  return obj.age + a
}
```

```js title="纯函数"
function fn(a) {
  return a + 5
}

let fn = (b) => {
  let obj = { x: 1 }
  obj.x = 2
  return obj.x + b
}
```
