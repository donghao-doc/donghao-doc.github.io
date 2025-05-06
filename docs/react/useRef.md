# useRef

`useRef` 用于创建一个可变的引用对象（ref），主要⽤途有：

- 访问和操作 DOM 元素（如获取值、设置焦点等）。
- 存储可变值：`useRef` 可以存储任意可变值，并且不会触发组件的重新渲染。

`useRef` 类似于类组件的 this，具有以下特点：

- 持久性：`useRef` 的返回对象在组件的整个⽣命周期中都是持久的，不会在每次渲染时都重新创建。
- 更新不触发渲染：当 `useState` 中的状态改变时，组件会重新渲染。⽽当 `useRef` 的 `.current` 属性改变时，组件不会重新渲染。

## DOM 引用示例

```tsx
function Demo() {
  let a = useRef();

  let get = () => {
    console.log(a.current.innerHTML); // hello
  };

  return (
    <>
      <div ref={a}>hello</div>
      <button onClick={get}>获取</button>
    </>
  );
}
```

## 存储可变值示例

```tsx
function App() {
  let a = useRef();
  let num = useRef();

  useEffect(() => {
    num.current = setInterval(() => {
      console.log(num.current);
      num.current++;
      console.log('组件⼀共存在了' + num.current + 's');
    }, 1000);
    return () => clearInterval(num.current);
  }, []);

  return (
    <div>
      <h1 ref={a}>我是app</h1>
      <button>按钮</button>
    </div>
  );
}
```

## 与 createRef 的区别

`React.createRef` 会在组件每次渲染时重新创建 ref 对象，而 `useRef` 只会在组件首次渲染时创建一次。
