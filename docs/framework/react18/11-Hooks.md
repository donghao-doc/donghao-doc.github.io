---
sidebar_position: 11
title: React Hooks
---

Hooks 基于函数组件设计，所以只支持函数组件。

## useState

### 基本用法

`useState` 接收初始值作为参数，返回一个数组。数组的第一个元素是当前状态值，第二个元素是一个函数，用于更新状态值。相当于 class 组件中的 `this.state` 和 `this.setState`。

```jsx
import React, { useState } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </>
  )
}
```

`useState` 的初始值可以是函数。当需要根据某些条件或初始化的逻辑来确定初始状态时，就非常有用。

```jsx
import React, { useState } from 'react';

function MyComponent(props) {
  // 使用函数来计算初始值
  const initialState = () => {
    if (props.isLoading) {
      return 'Loading...';
    } else {
      return props.defaultValue;
    }
  };

  // 使用 useState Hook，初始值是一个函数
  const [value, setValue] = useState(initialState);

  return (
    <div>
      <p>Value: {value}</p>
    </div>
  );
}

export default MyComponent;
```

### useState 的更新是异步的

`useState` 返回的更新状态的方法是异步的，在 `setState` 之后立即读取状态值获取到的是旧值，要在下次重绘才能获取新值。

连续调用 `setState` 时，多次更新会被合并，只有最后一次调用生效。

### 函数式更新

`setState` 可以接收一个函数作为参数，函数接收当前状态值作为参数，返回新的状态值。

```jsx
import { useState } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Click me
      </button>
    </>
  )
}
```

### 修改数组和对象

永远不要对对象和数组进行赋值，要始终确保传给 `setState` 的值是新的对象或数组。这样 React 才能够监测到状态变化，并按预期进行更新和重新渲染。

```jsx
import { useState } from 'react'

function Example() {
  const [count, setCount] = useState({ value: 0 })
  const [arr, setArr] = useState([1, 2, 3])

  const handleClick1 = () => {
    setCount(prevCount => ({...prevCount, value: prevCount.value + 1 }))
  }
  const handleClick2 = () => {
    setArr(prevArr => [...prevArr, 4])
  }
  
  return (
    <>
      <p>You clicked {count.value} times</p>
      <button onClick={handleClick1}>Click me</button>
      <button onClick={handleClick2}>Add 4 to arr</button>
    </>
  )
}
```

### useState 不能在条件判断、循环语句、嵌套函数中使用

每次更新的数据我们并没有记录和存储，那么 React 是怎么记住之前的状态呢？其实是按照顺序。

所以 `useState` 不能放在条件判断中，下面这种写法是错误的。

```jsx
import { useState } from 'react'

let flag = true

function Example() {
  const [count, setCount] = useState(0)
  
  // 错误的写法
  if (flag) {
    const [age, setAge] = useState(18)
  }
}
```

## useEffect

## useContext

## useMemo 和 React.memo

## useCallback

## useReducer

## useRef

## useId

## useDeferredValue

## useTransition

## useImperativeHandle

## useLayoutEffect

## 自定义 Hooks
