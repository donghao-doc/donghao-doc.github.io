---
#sidebar_position: 1
title: setState
---

## setState 是同步还是异步的

`setState()` 是同步的，但是调用 `setState()` 之后引起的“React 状态更新”这个动作是异步的（出于性能考虑）。

```jsx
import React, { Component } from 'react'

export default class Demo extends Component {
  state = { count: 0 }
  
  increment = () => {
    let { count } = this.state
    this.setState({ count: count + 1 }, () => {
      // 2. 回调中可以获取到更新后的 state
      //    因为这个回调是在状态更新完毕、页面重新 render 之后调用的
      console.log('更新后的 this.state:', this.state)
    })
    // 1. 以下代码，获取不到更新后的 state，因为此时 state 还没更新
    // console.log('更新后的 this.state:', this.state)
  }
  
  render() {
    return (
      <div>
        <h2>当前求和为：{this.state.count}</h2>
        <button onClick={this.increment}>点我+1</button>
      </div>
    )
  }
}
```

## setState 更新状态的两种写法

1. 对象写法：`setState(stateChange, [callback])`。

   - `stateChange` 为状态改变对象（该对象可以体现出状态的更改）。
   - `callback` 是可选的回调函数，它在状态更新完毕、界面重新 render 后才被调用。

2. 函数写法：`setState(updater, [callback])`。

   - `updater` 为返回 `stateChange` 对象的函数，该函数可以接收到 `state` 和 `props`。
   - `callback` 是可选的回调函数，它在状态更新完毕、界面重新 render 后才被调用。

```jsx
// 对象写法（是函数写法的简写形式）
increment = () => {
  this.setState({ count: this.state.count + 1 }, () => {
    console.log('this.state:', this.state)
  })
}

// 函数写法
increment = () => {
  this.setState((state, props) => {
    return { count: state.count + 1 }
  }, () => {
    console.log('this.state:', this.state)
  })
}
```

## State 的更新可能会被合并

当多个 `setState()` 调用发生在同一周期内，出于性能考虑，React 会自动合并它们的更新操作，只执行最后一次状态更新操作。

```jsx
// 以下代码会合并 10 次更新操作，只执行最后一次更新操作
increment = () => {
  for (let i = 0; i < 10; i++) {
    this.setState({ count: this.state.count + 1 })
  }
}
```

如果不想合并多次的状态更新，想在每次状态更新后都能获取到最新的状态，可以用函数式写法，每次都会返回更新后的状态对象。

```js
increment = () => {
  for (let i = 0; i < 10; i++) {
    this.setState((prevState, props) => { // 上一次更新后的 state 和 props
      return { count: prevState.count + 1 }
    })
  }
}
```

:::tip
上面说的“合并”，指的是合并“状态更新”的操作，而不是“页面渲染”的操作。无论是否合并，页面渲染都只会执行一次。
:::
