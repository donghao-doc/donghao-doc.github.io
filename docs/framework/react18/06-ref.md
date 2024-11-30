---
sidebar_position: 6
title: React ref
---

## 概念

`ref` 是 React 提供的用来访问 DOM 元素或者 React 组件实例的属性。

:::tip

`ref` 只在类组件中使用，函数组件和 React Hooks 中不能使用，因为函数组件和 React Hooks 没有实例。

:::

## 回调形式的 ref

ref 的值可以是一个函数，函数接收当前元素或者组件实例作为参数。

```jsx title="获取 DOM 元素"
class Demo extends React.Component {
  show = () => {
    console.log(this.ins.innerHTML)
  }

  render() {
    return <>
      <div ref={(a) => { this.ins = a }}>你好</div>
      <button onClick={this.show}>按钮</button>
    </>
  }
}
```

```jsx title="获取组件实例"
class Parent extends React.Component {
  show = () => {
    console.log(this.childComponent.state.value)
    this.childComponent.fn()
  }

  render() {
    return <Child ref={(component) => { this.childComponent = component }} />
  }
}

class Child extends React.Component {
  state = {
    value: '子组件数据'
  }

  fn = () => {
    console.log('子组件方法')
  }

  render() {
    return <div>子组件</div>
  }
}
```

## React.createRef

`React.createRef` 方法返回一个包含 `current` 属性的对象，`current` 属性指向当前元素或者组件实例。

```jsx
class Demo extends React.Component {
  myRef = React.createRef()
  
  fn = () => {
    this.myRef.current.focus()
  }

  render() {
    return <>
      <input ref={this.myRef} />
      <button onClick={this.fn}>按钮</button>
    </>
  }
}
```

## useRef

`useRef` 是 React Hooks 提供的用来访问 DOM 元素或者 React 组件实例的 Hook。

```jsx
function Demo() {
  const inputRef = useRef()
  
  const fn = () => {
    inputRef.current.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={fn}>聚焦</button>
    </>
  )
}
```

