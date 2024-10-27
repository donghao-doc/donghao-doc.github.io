---
sidebar_position: 8
---

# 自定义 hook 与指令

## 自定义 hook

什么是 hook？其本质是一个函数，把 `setup` 函数中使用的 CompositionAPI 进行了封装，主要用来处理可复用的代码逻辑，类似于 Vue2 中的 mixin。但 mixin 存在一些问题，所以 Vue3 移除了 mixin，推荐使用 CompositionAPI 代替。

自定义 hook 的优势：复用代码，让 `setup` 中的逻辑更清楚易懂。

[Vue3 的 hook 库](https://vueuse.org/guide/components.html)

```ts title="hooks/useSum.ts"
import { ref, onMounted } from 'vue'

// export default 是默认暴露，后面可以直接跟一个值，如：
// export default 123，export default []，export default {}
export default function () {
  let sum = ref(0)

  const increment = () => {
    sum.value += 1
  }
  const decrement = () => {
    sum.value -= 1
  }
  
  onMounted(() => {
    increment()
  })

  // 向外部暴露数据和方法
  return { sum, increment, decrement }
}
```

```ts title="hooks/useDog.ts"
import { reactive, onMounted } from 'vue'
import axios, { AxiosError } from 'axios'

export default function () {
  let dogList = reactive<string[]>([])

  async function getDog() {
    try {
      let { data } = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
      dogList.push(data.message)
    } catch (error) {
      const err = <AxiosError>error
      console.log(err.message)
    }
  }

  onMounted(() => {
    getDog()
  })

  // 向外部暴露数据和方法
  return { dogList, getDog }
}
```

```html title="组件中使用"
<template>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="increment">点我+1</button>
  <button @click="decrement">点我-1</button>
  <hr>
  <img v-for="(u, index) in dogList.urlList" :key="index" :src="(u as string)">
  <span v-show="dogList.isLoading">加载中......</span><br>
  <button @click="getDog">再来一只狗</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<script setup lang="ts">
// 注意默认暴露的引入方式
import useSum from './hooks/useSum'
import useDog from './hooks/useDog'

let { sum, increment, decrement } = useSum()
let { dogList, getDog } = useDog()
</script>
```

## 自定义指令

### 在 setup 内定义局部指令

在 `<script setup>` 中，任何**以 `v` 开头的驼峰式命名的变量**都可以被用作一个自定义指令。如 `vFocus` 指令就可以在模板中以 `v-focus` 的形式使用。

```html
<template>
  <button @click="show = !show">开关{{ show }} - {{ title }}</button>
  <Dialog v-move="{ background: 'green', flag: show }"></Dialog>
</template>

<script setup lang="ts">
  import { Directive } from 'vue'

  const vMove: Directive = {
    // 元素初始化时调用
    created(el, binding, vnode, prevVnode) {
      console.log('初始化')
    },
    // 在元素被插入到 DOM 前调用
    beforeMount(el, binding, vnode, prevVnode) {
      console.log('初始化一次')
    },
    // 元素插入 DOM 后调用
    mounted(el, binding, vnode, prevVnode) {
      el.style.background = binding.value.background
    },
    // 元素更新之前调用
    beforeUpdate(el, binding, vnode, prevVnode) {
      console.log('更新之前')
    },
    // 元素更新之后调用
    updated(el, binding, vnode, prevVnode) {
      console.log('更新结束')
    },
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el, binding, vnode, prevVnode) {
      console.log('卸载之前')
    },
    // 绑定元素的父组件卸载后调用
    unmounted(el, binding, vnode, prevVnode) {
      console.log('卸载完成')
    },
  }
</script>
```

### 定义全局指令

```ts title="main.ts"
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
```

### 生命周期钩子参数详解

1. `el`：当前绑定的 DOM 元素。

2. `binding` 是一个对象，包含以下属性：
    - `value`：传递给指令的值，例如在 `v-my-directive="1 + 1"` 中，传递给指令的值就是 `2`；
    - `oldValue`：先前的值，仅在 `beforeUpdate` 和 `updated` 中可用，无论值是否有更改都可用；
    - `arg`：传递给指令的参数（如果有的话），例如在 `v-my-directive:foo` 中，arg 为 `foo`；
    - `modifiers`：包含修饰符（如果有的话）的对象，例如在 `v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true，bar: true }`；
    - `instance`：使用指令的组件实例；
    - `dir`：一个对象，在注册指令时作为参数传递。

3. `VNode`：当前元素的虚拟 DOM。

4. `prevNode`：上一个虚拟节点，仅在 `beforeUpdate` 和 `updated` 钩子中可用。

### 函数简写

对于自定义指令来说，一个很常见的情况是仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令，如下所示：

```html
<template>
  <input v-model="value" type="text" />
  <!-- 自定义指令也可以用在组件上，它会应用到组件的根节点 -->
  <!-- 如果组件有多个根节点，会抛出一个警告 -->
  <!-- 总的来说，不建议在组件上使用自定义指令 -->
  <A v-color="{ background: value }"></A>
</template>

<script setup lang='ts'>
  import { ref, Directive, DirectiveBinding } from 'vue'
  import A from './components/A.vue'

  type Dir = {
    background: string
  }

  let value = ref<string>('')

  const vColor: Directive = (el, binding: DirectiveBinding<Dir>) => {
    // 这会在 mounted 和 updated 时都调用
    el.style.background = binding.value.background
  }
</script>
```
