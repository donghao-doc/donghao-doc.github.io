# 状态管理与计算属性

## MobX 状态管理

小程序可以通过 MobX 来实现响应式 Store 状态管理，状态变化会自动同步到页面、组件（`globalData` 不会自动同步）。

| 工具                          | 作用                       |
|-----------------------------|--------------------------|
| `mobx-miniprogram`          | 创建响应式 Store，存储状态和修改状态的方法 |
| `mobx-miniprogram-bindings` | 把 Store 的数据和方法绑定到页面、组件   |

```bash
npm install mobx-miniprogram mobx-miniprogram-bindings
```

### 创建 Store

```js
// stores/number.js

import { observable, action } from 'mobx-miniprogram'

// observable：创建可被观察的状态对象
export const numberStore = observable({
  // 状态（响应式的）
  numberA: 1,
  numberB: 2,

  // 派生状态，相当于计算属性
  get sum() {
    return this.numberA + this.numberB
  },

  // 修改数据的方法
  update: action(function () {
    // this 指向当前 store
    this.numberA += 1
    this.numberB += 1
  }),
})
```

### 在组件中绑定 Store

使用 `ComponentWithStore()` 代替 `Component()`，通过 `storeBindings` 绑定 Store 中的内容。

```js
// 模板中可直接使用数据和方法
<view>{{ numberA }} + {{ numberB }} = {{ sum }}</view>
<button bind:tap="update">更新共享数据</button>

import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { numberStore } from '../../stores/number'

ComponentWithStore({
  storeBindings: {
    store: numberStore, // 绑定的 Store 对象
    fields: ['numberA', 'numberB', 'sum'], // 状态和计算属性会绑定到 data 中
    actions: ['update'], // 映射为组件 methods 中的方法
  },

  // JS 中使用数据和方法：this.data.numberA、this.update()
})
```

:::tip
使用 `setData()` 修改 `fields` 中的数据，不会反向修改 Store 中的数据，更新 Store 中的数据应调用 `actions` 中的方法。
:::

### 在页面中绑定 Store

方式一：使用 Component 构造页面，可以像组件一样使用 `ComponentWithStore()` 和 `storeBindings`。

方式二：保留 Page，在 `onLoad()` 中手动创建绑定，在 `onUnload()` 中销毁，避免页面卸载后仍保留订阅。

```js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { numberStore } from '../../stores/number'

Page({
  /**
   * 创建 Store 绑定并同步初始数据
   */
  onLoad() {
    this.numberBindings = createStoreBindings(this, {
      store: numberStore,
      fields: ['numberA', 'numberB', 'sum'],
      actions: ['update'],
    })
    // 手动绑定时，立即同步使用管理对象的 updateStoreBindings()
    this.numberBindings.updateStoreBindings()
  },

  /**
   * 页面卸载时清理状态订阅
   */
  onUnload() {
    this.numberBindings.destroyStoreBindings()
  },
})
```

方式三（不推荐）：在 Behavior 中使用 `BehaviorWithStore` 绑定 Store，在 `Page()` 中使用 `behaviors` 注册 Behavior。

### fields 与 actions 对象写法

数组写法适合同名数据和方法，对象写法适合重命名或组合数据。

对象写法，key 是页面或组件 `data` 中的名字，value 是 Store 中的名字或函数。

```js
storeBindings: {
  store: numberStore,
  fields: {
    a: 'numberA',
    b: 'numberB',
    total: () => numberStore.sum,
  },
  actions: {
    increase: 'update'
  },
}
```

### 多 Store 与命名空间

把 `storeBindings` 写成数组，绑定多个 Store。

```js
// 模板中访问
<view>{{ numberA }} + {{ numberB }} = {{ sum }}</view>
<button bind:tap="update">更新</button>

<view>{{ other.numberA }} + {{ other.numberB }} = {{ other.sum }}</view>
<button bind:tap="updateOther">更新</button>

storeBindings: [
  {
    store: numberStore,
    fields: ['numberA', 'numberB', 'sum'],
    actions: ['update'],
  },
  {
    store: otherStore,
    namespace: 'other', // 会把数据放到页面或组件的 data.other 下
    fields: ['numberA', 'numberB', 'sum'],
    actions: {
      updateOther: 'update'
    },
  },
]

// JS 中访问数据：this.data.numberA、this.data.other.numberA
// JS 中访问方法：this.update()、this.updateOther()
```

`namespace` 只作用于 `fields`，不会给 `actions` 添加前缀，`actions` 中的方法仍可通过对象形式来重命名进行区分。

`fields` 也可以通过对象形式为数据重命名，不必非得使用 `namespace`。

## 计算属性与监听器

| 工具                          | 作用                               |
|-----------------------------|----------------------------------|
| `miniprogram-computed`      | 基于组件数据提供 `computed` 和 `watch`    |

```bash
npm install miniprogram-computed
```

```js
import { ComponentWithComputed } from 'miniprogram-computed'

ComponentWithComputed({
  data: {
    numberA: 1,
    numberB: 2
  },
  computed: {
    // 计算属性通过参数 data 访问数据，不能通过 this 访问组件实例
    // return 的数据会被写入组件的 data，模板可直接使用 total
    total(data) {
      return data.numberA + data.numberB
    },
  },
  watch: {
    // watch 的回调可以通过 this 访问组件实例
    'numberA, numberB'(numberA, numberB, oldNumberA, oldNumberB) {
      console.log('新值', numberA, numberB)
      console.log('旧值', oldNumberA, oldNumberB)
    },
  },
  methods: {
    handleUpdate() {
      this.setData({
        numberA: this.data.numberA + 1,
        numberB: this.data.numberB + 1,
      })
    },
  },
})
```

## MobX 与计算属性结合使用

组合两个 behavior，注册顺序为 **Store 绑定在前，computed 在后**。

```js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { behavior as computedBehavior } from 'miniprogram-computed'

import { numberStore } from '../../stores/number'

Component({
  behaviors: [storeBindingsBehavior, computedBehavior],
  data: {
    multiplier: 2
  },
  storeBindings: {
    store: numberStore,
    fields: ['sum'],
    actions: ['update'],
  },
  computed: {
    total(data) {
      return data.sum * data.multiplier
    },
  },
})
```
