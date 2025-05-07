# useState

`useState` 用于在函数组件中提供状态管理。

```jsx
// 接收一个初始值，返回当前状态值和更新函数
const [state, setState] = useState(initialState);
```

当需要基于之前的状态进行更新时，可以使用**函数式更新**，即给 setState 传递一个函数。

```jsx
// 接收之前的 state，返回更新后的 state
setState((prevState) => {
  return prevState + 1;
});
```

## 状态的更新是异步的

状态的更新是异步的，新的状态要在下次重绘时才能获取。

```jsx
const [count, setCount] = useState(0);

setCount(1);
console.log(count); // 输出 0，而不是 1
```

## 批量更新与函数式更新

出于性能考虑，连续的状态修改会被合并，只执行最后一次更新操作。

```jsx
function Example() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }; // count 最终值为 1
}
```

连续的函数式更新，不会像普通的状态更新那样被合并，而是会按照顺序依次执行，每次更新都会基于前一次的结果。

```jsx
function App() {
  const [count, setCount] = useState(0);

  const change = () => {
    setCount((preCount) => {  // preCount: 0
      return preCount + 1;
    });
    setCount((preCount) => {  // preCount: 1
      return preCount + 1;
    });
    setCount((preCount) => {  // preCount: 2
      return preCount + 1;
    }); // count 最终值为 3
  };
}
```

## 修改数组和对象

修改数组和对象时，必须传入新的数据副本，不要直接对对象和数组进行赋值，否则 React 检测不到状态变化。

```jsx
function Example() {
  const [count, setCount] = useState({ value: 0 });
  const [arr, setArr] = useState([1, 2, 3]);

  const handleClick1 = () => {
    setCount((prevCount) => ({ ...prevCount, value: prevCount.value + 1 }));
  };
  const handleClick2 = () => {
    setArr((prevArr) => [...prevArr, 4]);
  };
}
```
