---
sidebar_position: 17
---

# Pinia、Vuex

Pinia 和 Vuex 都是集中式状态管理库。

Pinia 与 Vuex 的不同：
- Vuex 中的 `mutation` 被弃用，它们经常被认为是极其冗余的，它们初衷是带来 devtools 的集成方案
- Pinia 对 TypeScript 的支持更友好
- Pinia 可以像 Vuex 那样使用选项式 API，但 Pinia 也可以使用组合式 API
- Pinia 不再有可命名的模块（Vuex 中的“命名空间”）

## Pinia

### 搭建 [Pinia](https://pinia.vuejs.org/zh/) 环境

```shell title="安装"
npm install pinia
```

```ts title="src/main.ts"
import { createApp } from 'vue'
// 引入 createPinia
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
// 创建 pinia
const pinia = createPinia()

// 使用 pinia
app.use(pinia)      // 此时开发者工具中已经有了 pinia 选项
app.mount('#app')
```

### 存储 + 读取数据

`Store` 是一个保存**状态**、**业务逻辑**的实体，每个组件都可以**读取**、**写入**它。

它有三个概念：`state`、`getter`、`action`，相当于组件中的：`data`、`computed` 和 `methods`。

```ts title="src/store/count.ts"
// 引入 defineStore 用于创建 store
import { defineStore } from 'pinia'

// 定义并暴露一个 store
export const useCountStore = defineStore('count', {
  // 状态
  state: () => {   // 推荐使用箭头函数，更有利于 TS 的类型推断
    return {
      sum: 6
    }
  },
  // 计算
  getters: {},
  // 动作
  actions: {},
})
```

```html title="组件中使用 state 中的数据"
<template>
  <h2>当前求和为：{{ countStore.sum }}</h2>
</template>

<script setup lang="ts" name="Count">
  import { useCountStore } from '@/store/count'
  
  // countStore 是一个 Proxy 响应式对象
  const countStore = useCountStore()
  
  // 以下两种方式都可以拿到 state 中的数据
  // 下面第一个 log 中的 sum 是一个 ref 对象
  // 由于它是在 countStore 中的，countStore 是一个 Proxy 对象，所以会自动解包，不用 .value
  console.log(countStore.sum)
  console.log(countStore.$state.sum)
</script>
```

```ts title="src/store/talk.ts"
// 引入 defineStore 用于创建 store
import { defineStore } from 'pinia'

// 定义并暴露一个 store
export const useTalkStore = defineStore('talk', {
  // 状态
  state: () => {
    return {
      talkList: [
        { id: 'yuysada01', content: '你今天有点怪，哪里怪？怪好看的！' },
        { id: 'yuysada02', content: '草莓、蓝莓、蔓越莓，你想我了没？' },
        { id: 'yuysada03', content: '心里给你留了一块地，我的死心塌地' }
      ]
    }
  },
  // 计算
  getters: {},
  // 动作
  actions: {}
})
```

```html title="组件中使用 state 中的数据"
<template>
  <ul>
    <li v-for="talk in talkStore.talkList" :key="talk.id">{{ talk.content }}</li>
  </ul>
</template>

<script setup lang="ts" name="Count">
  import { useTalkStore } from '@/store/talk'

  const talkStore = useTalkStore()
</script>
```

### 修改数据

**直接修改**

```ts
import { useCountStore } from '@/store/count'

const countStore = useCountStore()
countStore.sum = 666
```

:::tip
Vuex 中是不可以直接修改数据的，必须操作 Mutation 或 Action 中的方法才能修改 State 中的数据。
:::

**批量修改**

如果要一次修改多条数据，推荐使用 `$patch` 方法，进行批量修改。

```ts
import { useCountStore } from '@/store/count'

const countStore = useCountStore()
// 补丁的对象会与 state 中 return 的对象进行合并
countStore.$patch({
  sum: 999,
  school: 'atguigu'
})
```

**借助 actions 修改**

`actions` 中可以编写一些业务逻辑。

```ts
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  // ...
  actions: {
    increment(value: number) {
      // actions 中的 this 指向的是当前 store 实例，所以通过 this 可以访问到 state 中的数据
      if (this.sum < 10) {
        this.sum += value
      }
    },
    decrement(value: number) {
      if (this.sum > 1) {
        this.sum -= value
      }
    }
  },
})
```

```js title="组件中调用 actions 中的方法"
import { useCountStore } from '@/store/count'

const countStore = useCountStore()
countStore.incrementOdd(value)
```

### 重置

```ts
import { useCountStore } from '@/store/count'

const countStore = useCountStore()
// 重置 store 为原始值
countStore.$reset()
```

### storeToRefs

`store` 是一个 `reactive` 响应式对象，直接从 `store` 中解构出的数据，会失去响应式。所以 Pinia 也提供了 `storeToRefs` 方法，用于将 `store` 中的数据转为 `ref` 对象，保持响应式，也方便在模板中使用。

```html
<template>
  <h2>当前求和为：{{ sum }}</h2>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useCountStore } from '@/store/count'

  const countStore = useCountStore()
  // 解构出的 sum 仍然是有响应式的
  const { sum } = storeToRefs(countStore)
</script>
```

:::tip
- Vue 提供的 `toRefs` 会将 store 中的数据、方法以及 `_`、`$` 开头的属性全都转换成 ref 对象；
- 而 Pinia 提供的 `storeToRefs` 只会将 store 中的数据转换成 ref 对象，减少了不必要属性的响应性开销。
:::

### getters

概念：当 `state` 中的数据，需要经过处理后再使用时，可以使用 `getters` 配置。

```ts title="src/store/count.ts"
import { defineStore } from 'pinia';

export const useCountStore = defineStore('count', {
  state() {
    return {
      sum: 1,
      school: 'atguigu'
    };
  },
  getters: {
    // 接收 state 作为参数
    bigSum: (state): number => state.sum * 10,
    // 如果要用 this，就不能写成箭头函数
    upperSchool() {
      // this 指向的是当前 store 实例，也可以通过 this 访问 state 中的数据
      return this.school.toUpperCase();
    },
    filterCinemaList(state) {
      return (value) => {
        return state.cinemaList.filter(item => item.eTicketFlag === value)
      }
    }
  },
  actions: {},
});
```

```js title="组件中读取数据"
import { useCountStore } from '@/store/count'

const countStore = useCountStore()
const { increment, decrement } = countStore

let { sum, school, bigSum, upperSchool } = storeToRefs(countStore)

// 访问 getters 中的属性
countStore.filterCinemaList(1)
```

### $subscribe

`store` 的 `$subscribe()` 方法用于监听 `state` 是否发生变化（类似于 `watch`）。

```ts
import { useTalkStore } from '@/store/talk'

const talkStore = useTalkStore()
talkStore.$subscribe((mutate, state) => {
  // mutate 是本次修改的信息，state 是修改后的数据
  console.log('LoveTalk', mutate, state)
  localStorage.setItem('talk', JSON.stringify(state.talkList))
})
```

### store 组合式写法

```ts
import { reactive, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useTalkStore = defineStore('talk', () => {
  // talkList 就是 state
  const talkList = reactive(JSON.parse(localStorage.getItem('talkList') as string) || [])

  // 相当于 getters
  const filterCinemaList = computed(() => {
    return (value) => {
      return cinemaList.value.filter(item => item.eTicketFlag === value)
    }
  })

  // getATalk 函数相当于 action
  async function getATalk() {
    let { data: { content: title } } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
    let obj = { id: nanoid(), title }
    talkList.unshift(obj)
  }

  return { talkList, getATalk }
})
```

## Vuex

### 基本使用

Vuex 的数据是存在内存中的，所以刷新页面就会丢失数据状态。

```shell title="安装"
npm install vuex@next --save
```

```ts title="src/store/index.ts"
import { createStore } from 'docs/front-frame/Vue3/vuex'

const store = createStore({
  state() {
    return {
      isTabBarShow: true,
      cinemaList: []
    }
  },
  // getter 相当于是 store 的计算属性
  getters: {
    filterCinemaList(state) {
      return value => state.cinemaList.filter(item => item.eTicketFlag === value)
    }
  },
  // Vue Devtool 会监控 mutations，所以建议对数据的操作都要通过 mutations
  mutations: {
    setTabBar(state, payload) {
      state.isTabBarShow = payload
    },
    setCinemaList(state, payload) {
      state.cinemaList = payload
    }
  },
  actions: {
    async getCinemaList(context, payload) {
      console.log(payload)
      // 发送请求获取数据
      const result = await axios()
      context.commit('setTabBar', result.data.cinemaList)
    }
  }
})

export default store
```

```js title="main.js"
import { createApp } from 'vue'
import store from './store'
import App from './App.vue'

createApp(App).use(store).mount('#app')
```

```js title="组件内使用"
import { useStore } from 'vuex'

const store = useStore()

store.state.isTabBarShow = false

store.getters.filterCinemaList(1)

store.commit('setTabBar', false)

store.dispatch('getCinemaList', 123)
```

### 辅助函数

Composition API 不支持 map 的辅助函数，因为这些 map 函数内部都使用到了 `this`。

解决方案：使用 `bind`。

```ts
import { computed } from 'vue'
import { useStore, mapState } from 'vuex'

const state = mapState(['isTabBarShow'])
const store = useStore()
state.isTabBarShow = state.isTabBarShow.bind({$store: store})
const isTabBarShow = computed(state.isTabBarShow)
```

### Module

```ts
import { createStore } from 'vuex'

const moduleA = {
  namespaced: true,
  state() {
    return {
      xxx: 123
    }
  },
  getters: {},
  mutations: {
    setXXX() {}
  },
  actions: {}
}

const moduleB = {
  namespaced: true,
  state() {
    return {
      yyy: 'abc'
    }
  },
  getters: {},
  mutations: {
    setYYY() {
    }
  },
  actions: {}
}

const store = createStore({
  modules: {
    moduleA, moduleB
  }
})
```

```ts
import { useStore, mapState, mapMutations, mapActions } from 'vuex'

const store = useStore()

store.state.moduleA.xxx
store.state.moduleB.yyy

const stateA = mapState('moduleA', ['xxx'])
const stateB = mapState('moduleB', ['yyy'])

const mutationsA = mapMutations('moduleA', ['setXXX'])
const mutationsB = mapMutations('moduleB', ['setYYY'])

const actionsA = mapActions('moduleA', [])
const actionsB = mapActions('moduleB', [])
```

### vuex 持久化插件

原理也是将数据存到 localStorage 中。

```shell
npm i vuex-persistedstate
```

```ts
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  modules: {
    moduleA, moduleB
  },
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        isTabBarShow: state.moduleA.isTabBarShow
      }
    }
  })]
})
```
