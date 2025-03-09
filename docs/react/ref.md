---
sidebar_position: 6
title: ref
---

通过 `ref` 可以获取到真实 DOM 元素或 React 组件实例。

相比原生 JS 获取 DOM 的操作，`ref` 性能更高，会减少获取 DOM 节点的消耗。

:::warning

`ref` 只在类组件中使用，函数组件和 Hooks 中不能使用，因为它们没有实例。

:::

## 回调形式的 ref

`ref` 的值可以是一个函数，函数接收当前 DOM 元素或者组件实例作为参数。

```jsx title="获取 DOM 元素"
class Demo extends React.Component {
  show = () => {
    console.log(this.divRef.innerHTML);
  };

  render() {
    return (
      <>
        <div ref={(el) => (this.divRef = el)}>你好</div>
        <button onClick={this.show}>按钮</button>
      </>
    );
  }
}
```

```jsx title="获取组件实例"
class Parent extends React.Component {
  show = () => {
    console.log(this.childComponent.state.value); // 获取子组件数据
    this.childComponent.fn(); // 调用子组件方法
  };

  render() {
    return (
      <>
        <Child ref={(component) => (this.childComponent = component)} />
        <button onClick={this.show}>按钮</button>
      </>
    );
  }
}

class Child extends React.Component {
  state = {
    value: '子组件数据',
  };

  fn = () => {
    console.log('子组件方法');
  };

  render() {
    return <div>子组件</div>;
  }
}
```

## React.createRef

`React.createRef` 方法返回一个包含 `current` 属性的对象，`current` 属性指向当前元素或者组件实例。

```jsx
class Demo extends React.Component {
  myRef = React.createRef();

  fn = () => {
    this.myRef.current.focus();
  };

  render() {
    return (
      <>
        <input ref={this.myRef} />
        <button onClick={this.fn}>按钮</button>
      </>
    );
  }
}
```

## useRef

`useRef` 是 React Hooks 提供的用来访问 DOM 元素或者 React 组件实例的 Hook。

```jsx
function Demo() {
  const inputRef = useRef();

  const fn = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={fn}>聚焦</button>
    </>
  );
}
```
