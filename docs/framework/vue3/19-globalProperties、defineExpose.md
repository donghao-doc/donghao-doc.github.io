---
sidebar_position: 19
---

# globalProperties、defineExpose

## globalProperties

`globalProperties` 可用于在 app 实例上挂载全局变量和函数。

```js title="Vue2 挂载全局变量和函数"
Vue.prototype.$http = () => {}
```

```js title="Vue3 挂载全局变量和函数"
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

示例：Vue2 中的过滤器在 Vue3 中已经移除了，我们可以使用全局函数代替 filters。

```js
app.config.globalProperties.msg = 'hello'
app.config.globalProperties.$filters = {
  format(str) {
    return `$${str}`
  }
}
```

```html
<template>
  <!-- 模板中可直接使用全局属性 -->
  <p>{{ msg }}</p>
</template>

<script setup lang="ts">
  import { getCurrentInstance } from 'vue'

  const app = getCurrentInstance()
  console.log(app?.proxy?.$filters.format('js'))
</script>
```

:::warning
全局属性应谨慎使用，因为：
- 会造成数据来源不明确的问题；
- 全局属性会污染全局命名空间，容易造成组件与全局之间的命名冲突。
:::

## defineExpose

`defineExpose` 用于组件向外暴露内部属性和方法。

```ts title="子组件"
const list = reactive<number[]>([4, 5, 6]);
const handle = () => {};

defineExpose({ list, handle });
```

```html title="父组件"
<template>
  <Menu ref="refMenu"></Menu> 
</template>

<script setup lang="ts">
import MenuCom from '../xxxxxxx.vue';

// 注意这儿的 typeof 里面放的是组件名字（MenuCom），不是 ref 的名字，ref 的名字对应开头的变量名（refMenu）
const refMenu = ref<InstanceType<typeof MenuCom>>();

// 访问子组件属性
console.log(refMenu.value.list);
// 调用子组件方法
refMenu.value.handle()
</script>
```
