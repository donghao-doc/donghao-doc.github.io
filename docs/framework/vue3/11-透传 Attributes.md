---
sidebar_position: 11
---

# 透传 Attributes

## Attributes 继承

“透传”指的是传递给组件一个属性，组件内部没有使用 `defineProps` 或 `defineEmits` 定义，那么这个属性就会传递到组件的根元素上，且同名属性的属性值会合并。

常见的例子就是 class、style、id、click 事件等。

```html title="父组件"
<MyButton class="large" @click="onClick" />
```

```html title="子组件"
<template>
  <button class="btn">click me</button>
</template>
```

```html title="子组件实际情况"
<template>
  <!-- btn 是自己的类，large 是父组件透传过来的类 -->
  <!-- 当 button 被点击，会触发父组件的 onClick 方法 -->
  <!-- 如果子组件的 button 定义了自己的 click 事件，那么本身的和父组件的 click 事件都会被触发 -->
  <button class="btn large" @click>click me</button>
</template>
```

## 深层组件继承

如果一个组件在根节点上渲染另一个组件，如：

```html title="MyButton 组件"
<template>
  <BaseButton />
</template>
```

那么 `<MyButton>` 接收的透传 attribute 会直接继续传给 `<BaseButton>`。

但是，如果 `<MyButton>` 声明了某些属性为 props 或 emits，那么这些属性不会继续传递给 `<BaseButton>`。

## 禁用 Attributes 继承

如果希望透传的属性不要自动应用到根节点上，而是应用到其他元素上：

```html
<template>
  <div class="btn-wrapper">
    <!-- 2. 绑定 $attrs 到指定元素上 -->
    <button v-bind="$attrs" class="btn">click me</button>
  </div>
</template>

<script setup>
// 1. 设置不要自动继承
defineOptions({
  inheritAttrs: false
})
</script>
```

模板中的 `$attrs` 对象包含了除组件所声明的 props 和 emits 之外的所有其他 attribute，例如 class、style、v-on 监听器等等。

:::tip
没有参数的 `v-bind` 会将一个对象的所有属性都作为 attribute 应用到目标元素上。
:::

## 多根节点的 Attributes 继承

如果一个组件有多个根节点，Vue 就不知道要将 attribute 透传到哪里，所以会抛出一个警告，除非显示地绑定了 `$attrs`。

```html title="CustomLayout 组件"
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

## 在 JavaScript 中访问透传 Attributes

```js
import { useAttrs } from 'vue'
const attrs = useAttrs()
```

注意，这里的 attrs 不是响应式的，不能通过侦听器去监听它的变化。如果需要响应性，可以使用 prop 或者 `onUpdated()`。

```js title="prop 方案"
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```

```js title="onUpdated 方案"
import { useAttrs, onUpdated } from 'vue'

onUpdated(() => {
  const attrs = useAttrs()
})
```
