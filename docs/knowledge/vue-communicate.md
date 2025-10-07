# Vue 组件通信

## 父子组件通信

### props

`props` 可用于 **父 => 子** 传递数据，也可用于 **子 => 父** 传递数据。

- **父 => 子**：父组件在模板中绑定属性，子组件通过 `defineProps` 声明后即可在模板直接使用。
- **子 => 父**：父组件通过 `props` 向子组件传递一个函数，子组件调用 `props.xxx(params)` 让父组件接收数据。

:::warning 单向数据流
`props` 是只读的，子组件不能直接修改 `props` 的数据，应该通知父组件更新数据。
:::

:::code-group

```vue [父组件]
<template>
  <Person :list="persons" :add-person="addPerson" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Person } from './types'

const persons = ref<Person[]>([
  { id: '001', name: '张三', age: 18 },
  { id: '002', name: '李四', age: 19 }
])

function addPerson(person: Person) {
  persons.value.push(person)
}
</script>
```

```vue [子组件 Person.vue]
<template>
  <ul>
    <li v-for="item in props.list" :key="item.id">
      {{ item.name }} - {{ item.age }}
    </li>
  </ul>
  <button @click="handleAdd">add</button>
</template>

<script setup lang="ts">
import type { Person } from './types'

const props = withDefaults(
  defineProps<{
    list?: Person[]
    addPerson: (person: Person) => void
  }>(),
  {
    // 复杂类型的默认值需以函数返回
    list: () => [{ id: '001', name: '张三', age: 18 }]
  }
)

function handleAdd() {
  props.addPerson({ id: '002', name: '李四', age: 20 })
}
</script>
```

:::

### 自定义事件

- 子组件通过 `defineEmits` 声明事件，调用 `emit('event-name', payload)` 向外派发数据。
- 父组件在模板中使用 `@event-name="handler"` 监听，实现 **子 => 父** 通信。

原生事件与自定义事件：原生事件的 `$event` 是 DOM 事件对象，自定义事件的 `$event` 则是 `emit` 传出的数据。

:::code-group

```vue [父组件]
<template>
  <Menu @on-click="handleList" />
  <button @click="toy = $event.target.value">原生事件示例</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Menu from './Menu/index.vue'

const toy = ref('')

function handleList(list: number[]) {
  console.log('父组件收到：', list)
}
</script>
```

```vue [子组件 Menu.vue]
<template>
  <button @click="handleClick">派发给父组件</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'on-click', payload: number[]): void
}>()

const list = ref([4, 5, 6])

function handleClick() {
  emit('on-click', list.value)
}
</script>
```

:::

:::tip
官方推荐，自定义事件名使用短横线格式（如 `on-click`）。
:::

### v-model

给组件使用 `v-model`，等价于给组件 `:model-value` 并监听 `@update:model-value` 事件，实现 **父 ⇌ 子** 的双向通信。

同一组件可声明多个 `v-model`，通过参数来区分属性名（如 `v-model:first-name`）。

:::code-group

```vue [父组件]
<template>
  <CustomInput v-model="userName" />
  <!-- 等价于 -->
  <CustomInput
    :model-value="userName"
    @update:model-value="userName = $event"
  />
  
  <!-- 绑定多个 v-model -->
  <UserName v-model:first-name="first" v-model:last-name="last" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userName = ref('Tom')
const first = ref('Tom')
const last = ref('Hardy')
</script>
```

```vue [CustomInput.vue]
<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
```

```vue [CustomInput.vue 计算属性写法]
<template>
  <input v-model="value" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>
```

```vue [UserName.vue 多个 v-model]
<template>
  <input
    :value="props.firstName"
    @input="emit('update:firstName', $event.target.value)"
  />
  <input
    :value="props.lastName"
    @input="emit('update:lastName', $event.target.value)"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  firstName: string
  lastName: string
}>()

const emit = defineEmits<{
  (e: 'update:firstName', value: string): void
  (e: 'update:lastName', value: string): void
}>()
</script>
```

:::

### $refs、$parent

`$refs` 便于父组件获取子组件实例或 DOM，常见场景是调用子组件通过 `defineExpose` 暴露的数据或方法。

`$parent` 让子组件访问父组件实例，适合临时读取父级状态，但要避免深层依赖导致耦合。

:::code-group

```vue [父组件]
<template>
  <ChildOne ref="childOneRef" />
  <ChildTwo ref="childTwoRef" />
  <button @click="logChildren">log children</button>
  <button @click="logParent">log parent</button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ChildOne from './ChildOne.vue'
import ChildTwo from './ChildTwo.vue'

const childOneRef = ref<InstanceType<typeof ChildOne> | null>(null)
const childTwoRef = ref<InstanceType<typeof ChildTwo> | null>(null)

function logChildren() {
  console.log(childOneRef.value, childTwoRef.value)
}

function logParent() {
  console.log(childOneRef.value?.$parent)
}

onMounted(() => {
  childOneRef.value?.sayHello()
})
</script>
```

```vue [子组件 ChildOne.vue]
<template>
  <div>child one</div>
</template>

<script setup lang="ts">
const message = 'hello from child one'

function sayHello() {
  console.log(message)
}

defineExpose({ sayHello })
</script>
```

```vue [子组件 ChildTwo.vue]
<template>
  <div @click="notifyParent">child two</div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'

function notifyParent() {
  console.log(getCurrentInstance()?.proxy?.$parent)
}

defineExpose({ notifyParent })
</script>
```

:::

:::warning
为避免强耦合，建议优先使用 `props`、自定义事件、`provide` 等常规通信方案。
:::

### 插槽

## 祖孙组件通信

### provide、inject

`provide`、`inject` 适合祖先与后代组件直接通信，避免多层 `props` 传递。

- 祖先通过 `provide(key, value)` 提供响应式引用或函数，后代通过 `inject(key, fallback)` 获取。
- 推荐传递 `ref`、`reactive` 对象本身，保持响应式；若只传原始值，后代不会随祖先更新。
- `inject` 的默认值既能兜底也能帮助 TS 推断类型，避免未提供时报错。

:::code-group

```vue [祖先组件]
<template>
  <h4>资产：{{ money }}</h4>
  <h4>汽车：{{ car.brand }} - {{ car.price }}</h4>
  <button @click="money.value += 1">资产 +1</button>
  <button @click="car.price += 1">汽车价格 +1</button>
  <Child />
</template>

<script setup lang="ts">
import { provide, reactive, ref } from 'vue'
import Child from './Child.vue'

const money = ref(100)
const car = reactive({ brand: '奔驰', price: 100 })

function updateMoney(delta: number) {
  money.value += delta
}

provide('moneyContext', { money, updateMoney })
provide('car', car)
</script>
```

```vue [后代组件]
<template>
  <h4>资产：{{ money.value }}</h4>
  <h4>汽车：{{ car.brand }} - {{ car.price }}</h4>
  <button @click="updateMoney(6)">资产 +6</button>
</template>

<script setup lang="ts">
import { inject } from 'vue'

// inject 的第二个参数是默认值
const { money, updateMoney } = inject('moneyContext', {
  money: { value: 0 },
  updateMoney: () => {}
})

const car = inject('car', { brand: '未知', price: 0 })
</script>
```

:::

### $attrs

`$attrs` 聚合了父组件传给当前组件，但未被当前组件 `props` 声明接收的所有属性。

使用场景：组件的二次封装，让封装层无需逐一声明 `props`，把外部属性透传给被封装的组件。

透传函数同样有效，孙组件可调用祖组件传递的回调，实现 **孙 => 祖** 的通信。

在组件上使用 `v-bind="对象"`，会把对象的所有键值对展开成组件属性，适合批量传值。与 `$attrs` 搭配使用（`v-bind="$attrs"`），可以在组件封装时进行批量透传。

:::code-group

```vue [祖组件]
<template>
  <Child
    :a="a"
    :b="b"
    v-bind="{ x: 100, y: 200 }"
    :updateA="updateA"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'

const a = ref(1)
const b = ref(2)

function updateA(value: number) {
  a.value = value
}
</script>
```

```vue [子组件]
<template>
  <GrandChild v-bind="$attrs" />
</template>

<script setup lang="ts">
import GrandChild from './GrandChild.vue'
</script>
```

```vue [孙组件]
<template>
  <h4>a：{{ props.a }}</h4>
  <h4>b：{{ props.b }}</h4>
  <h4>x：{{ props.x }}</h4>
  <h4>y：{{ props.y }}</h4>
  <button @click="props.updateA(666)">点我更新 A</button>
</template>

<script setup lang="ts">
const props = defineProps<{
  a: number
  b: number
  x: number
  y: number
  updateA: (value: number) => void
}>()
</script>
```

:::

## 兄弟组件、任意组件通信

### mitt

Vue3 移除了 `$on`、`$off`、`$once`，因此 Vue2 中的 EventBus 在 Vue3 中无法使用，Vue3 可使用 `mitt` 库来发布、订阅任意组件间消息，实现任意组件通信。

`mitt` 提供了 `emit`、`on`、`off` 等 API，既能挂载到全局使用，也可局部使用。

```sh
# 安装
npm install mitt
```

全局使用：

:::code-group

```ts [main.ts]
import { createApp } from 'vue'
import mitt from 'mitt'
import App from './App.vue'

const Mitt = mitt()

const app = createApp(App)

// 将 mitt 挂到全局实例
app.config.globalProperties.$bus = Mitt

app.mount('#app')
```

```vue [A 组件派发]
<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

const emit = () => {
  instance?.proxy?.$bus.emit('send-toy', 'bear')
}
</script>
```

```vue [B 组件订阅]
<script setup lang="ts">
import { getCurrentInstance, onUnmounted } from 'vue'

const instance = getCurrentInstance()

const handleNum = (value) => {
  console.log(value)
}

instance?.proxy?.$bus.on('send-toy', handleNum)

onUnmounted(() => {
  instance?.proxy?.$bus.off('send-toy', handleNum)
})
</script>
```

:::

局部使用：

:::code-group

```ts [src/utils/emitter.ts]
import mitt from 'mitt'

const emitter = mitt()

export default emitter
```

```vue [A 组件派发]
<script setup lang="ts">
import emitter from '@/utils/emitter'

function sendToy(toy: string) {
  emitter.emit('send-toy', toy)
}
</script>
```

```vue [B 组件订阅]
<script setup lang="ts">
import { onUnmounted } from 'vue'
import emitter from '@/utils/emitter'

const handleToy = (value) => {
  console.log(value)
}

emitter.on('send-toy', handleToy)

onUnmounted(() => {
  emitter.off('send-toy', handleToy)
})
</script>
```

:::

### Pinia

#### 初始化

- 安装：`npm install pinia`
- 在 `main.ts` 创建并注册 Pinia 实例：

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

#### 定义 Store

`defineStore` 返回的函数就是组件里要用的 store。

store 包含三类成员：`state`（数据）、`getters`（派生数据）、`actions`（方法）。

```ts
// src/store/count.ts
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  state: () => {
    return {
      sum: 6,
      name: '张三'
    }
  },
  getters: {
    // 可接收 state 参数，适合写成箭头函数
    bigSum: state => state.sum * 10,
    // 需要访问 this 时改用常规函数（this 指向当前 store 实例）
    upperName() {
      return this.name.toUpperCase()
    }
  }
  actions: {
    increment(value: number) {
      if (this.sum < 10) this.sum += value
    }
  }
})
```

#### 组件中使用

```vue
<template>
  <h2>当前求和：{{ countStore.sum }}</h2>
</template>

<script setup lang="ts">
import { useCountStore } from '@/store/count'

const countStore = useCountStore() // Proxy 响应式对象
console.log(countStore.sum)        // 自动解包，无需 .value
</script>
```

#### 更新数据

- 直接赋值：`countStore.sum = 666`
- 批量修改：`countStore.$patch({ sum: 999, name: '张三' })`，补丁的对象会与 state 中 return 的对象进行合并
- 通过 `actions` 中的方法修改：`countStore.increment(2)`
- 恢复到初始 state：`countStore.$reset()`

#### storeToRefs

从 store 解构属性会失去响应式，`storeToRefs` 可以保持响应式且只转换 state。

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const countStore = useCountStore()
// 解构出的 sum, bigSum 仍然具有响应式
const { sum, bigSum } = storeToRefs(countStore)
</script>
```

:::tip `toRefs` 与 `storeToRefs`
- Vue 提供的 `toRefs` 会将 store 中的数据、方法以及 `_`、`$` 开头的属性全都转换成 ref 对象。
- Pinia 提供的 `storeToRefs` 只会将 store 中的数据转换成 ref 对象，减少了不必要的响应性开销。
:::

#### 监听 state 变化

`$subscribe((mutation, state) => {})` 类似于 `watch`，可以监听 state 变化。

```vue
<script setup lang="ts">
import useTalkStore from 'xxx'

const talkStore = useTalkStore()

// mutation 是本次修改的信息，state 是修改后的数据
talkStore.$subscribe((_mutation, state) => {
  localStorage.setItem('talk', JSON.stringify(state.talkList))
})
</script>
```

#### 组合式 Store 写法

Pinia 也支持 Composition API 风格，直接返回想暴露的状态、计算属性和方法。

```ts
// src/store/user.ts
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const name = ref('Tom')
  const upperName = computed(() => name.value.toUpperCase())

  function updateName(value: string) {
    name.value = value
  }

  return { name, upperName, updateName }
})
```
