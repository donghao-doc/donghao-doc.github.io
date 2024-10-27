---
#sidebar_position: 1
title: Fragment
---

Fragment 用来创建虚拟的 DOM 节点，而不实际渲染任何内容。

## React 中的 Fragment

```jsx
function App() {
  return (
    <>
      <h1>Hello, world!</h1>
      <p>This is a paragraph.</p>
    </>
  )
}
```

在 React 中，空标签 `<>` 被称为 Fragment。它可以将多个 JSX 元素组合在一起，而不会在 DOM 中添加额外节点。

## Vue3 中的 Fragment

```html title="Vue2"
<template>
  <div>
    <h1>Hello, world!</h1>
    <p>This is a paragraph.</p>
  </div>
</template>
```

Vue2 的 `<template>` 中只能有一个根元素，这个根元素会被添加到 DOM 节点中。

```html title="Vue3"
<template>
  <h1>Hello, world!</h1>
  <p>This is a paragraph.</p>
</template>
```

Vue3 的 `<template>` 中可以有多个根元素，这些根元素会被添加到 `Fragment` 组件中，而 `Fragment` 组件不会在 DOM 中添加额外节点。
