---
sidebar_position: 13
---

# Fragment、Teleport、Suspense

Vue3 新增了 `Fragment`、`Teleport`、`Suspense` 等组件。

## Fragment

有了 `Fragment`，Vue3 就允许在组件中使用多个根节点。

`Fragment` 是一个虚拟节点，Vue 会将模板中的内容添加到 `Fragment` 中，相当于把 `Fragment` 作为根节点，但 `Fragment` 组件不会在 DOM 中渲染。

```html
<template>
  <div>Hello World!</div>
  <div>你好世界！</div>
</template>
```

同时还支持 render JSX 写法，如：

```js
render() {
  return (
    <>
      { this.visable ? <div>{this.obj.name}</div> : <div>{this.obj.price}</div> }
      <input v-model={this.val} />
      { [1, 2, 3].map(item => <div>{item}</div>) }
    </>
  )
}
```

## Teleport

Teleport（传送门）能够将 **组件HTML结构** 渲染到指定 DOM 节点。

使用方法：在 `teleport` 组件上使用 `to` 属性指定传送的位置，支持 id、class、标签等选择器。

```html
<!-- to 中可以写标签、class、id 等 CSS 选择器 -->
<teleport to="body">
  <div v-show="isShow" class="modal">
    <h2>我是一个弹窗</h2>
    <p>我是弹窗中的一些内容</p>
    <button @click="isShow = false">关闭弹窗</button>
  </div>
</teleport>
```

使用 `disabled` 属性控制是否传送。

```html
<!-- disabled 为 true，则 to 不生效 -->
<teleport to="body" :disabled="true">
  <Loading></Loading>
</teleport>
```

## 异步组件 & Suspense

### 异步组件

代码分包：在大型应用中，我们可能需要将应用分割成小一些的代码块，以减小主包的体积。

使用异步组件可以做到这一点。

在 `<script setup>` 中可以直接使用**顶层 `await`**，代码会被编译成 `async setup()`。

```html
<script setup>
const post = await fetch(`/api/post/1`).then(res => res.json())
</script>
```

父组件通过 `defineAsyncComponent()` 和 `import()` 来引入子组件，便可以实现“分包”。

```html title="父组件"
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// 引入子组件-函数形式
const Dialog = defineAsyncComponent(() => import('../../components/Dialog/index.vue'))

// 引入子组件-对象形式
const AsyncComp = defineAsyncComponent({
  loader: () => import('./Foo.vue'),  // 加载函数
  loadingComponent: LoadingComponent, // 加载异步组件时使用的组件
  delay: 200,     // 展示加载组件前的延迟时间，默认为 200ms
  errorComponent: ErrorComponent,     // 加载失败后展示的组件
  timeout: 3000   // 默认值是 Infinity，如果超时也会显示 errorComponent
})
</script>
```

### Suspense

作用：等待异步组件时渲染一些替代内容，让应用有更好的用户体验。

异步组件必须在 `<Suspense>` 中使用，否则控制台会有警告。

`<Suspense>` 组件有两个插槽：`default` 和 `fallback`。

使用步骤：
1. 异步引入组件；
2. 使用 `Suspense` 包裹组件，并配置好 `default` 与 `fallback`。

```html
<template>
  <Suspense>
    <template v-slot:default>
      <Child />
    </template>
    <template v-slot:fallback>
      <h3>加载中.......</h3>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
  import { defineAsyncComponent, Suspense } from 'vue'
  const Child = defineAsyncComponent(() => import('./Child.vue'))  
</script>
```

```html title="Child 组件中含有异步任务"
<script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'

  // setup 语法糖中可以直接使用 await（顶层 await）
  const result = await axios.get('https://xxx')
</script>
```

:::warning
`<Suspense>` 目前是一个实验性的特性，它的 API 将来可能会改变，项目中请谨慎使用！
:::
