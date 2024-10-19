---
sidebar_position: 9
---

# style 新特性

## scoped

scoped 三条渲染规则：

- 给 DOM 节点加一个不重复的 `data` 属性（形如：`data-v-123`）来表示它的唯一性；
- 在 CSS 选择器的末尾加一个当前组件的 `data` 属性选择器（如 `[data-v-123]`）来私有化样式；
- 如果组件内部包含其他组件，只会给其他组件的最外层标签加上当前组件的 `data` 属性。

> 使用 scoped 后，父组件的样式将不会渗透到子组件中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

> 作用域样式并没有消除对 class 的需求。由于浏览器渲染各种各样 CSS 选择器的方式，`p { color: red }` 结合作用域样式使用时 (即当与 attribute 选择器组合的时候) 会慢很多倍。如果你使用 class 或者 id 来替代，例如 `.example { color: red }`，那你几乎就可以避免性能的损失。

## 样式穿透

```html title=":deep()"
<style scoped lang="scss">
.ipt {
  :deep(input) {
    background: red;
  }
}
</style>
```

## 插槽选择器

```html title="App.vue"
<template>
  <A>
    <div class="a">私人定制div</div>
  </A>
</template>

<script setup>
import A from '@/components/A.vue'
</script>
```

```html title="A 组件"
<template>
  <div>
    我是插槽
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
/* 在组件内部修改外部传递进来的插槽内容的样式，无效果 */
.a {
  color: red;
}
</style>
```

默认情况下，作用域样式不会影响到 `<slot />` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。

解决方案：使用 `:slotted`：

```html title="A 组件"
<style scoped>
:slotted(.a) {
  color: red;
}
</style>
```

## 全局选择器

Vue2 中我们想在组件中加入全局样式，通常都是新建一个 `<style>` 标签，不加 `scoped`。

```html
<style>
div { color: red; }
</style>

<style scoped>
</style>
```

现在有了更优雅的解决方案，使用 `:global`。

```html
<style scoped>
:global(div) {
  color: red;
}
</style>
```

## 动态 CSS

意思就是可以在 `<style>` 标签中访问 `<script>` 中的变量，通过 `v-bind` 这一 CSS 函数实现。

```html title="绑定单个值"
<template>
  <div class="div">Hello World</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const red = ref<string>('red')
</script>

<style scoped>
.div {
  color: v-bind(red);
}
</style>
```

```html title="绑定对象中的值"
<template>
  <div class="div">Hello World</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const red = ref({
  color: 'pink'
})
</script>

<style scoped>
.div {
  /* 支持 JavaScript 表达式 (需要用引号包裹起来) */
  color: v-bind('red.color');   /* 不用 .value */
}
</style>
```

## CSS Module

`<style module>` 标签会被编译为 CSS Modules，并将生成的 CSS 类作为 `$style` 对象的键暴露给组件。

使用场景一般用于 TSX 和 render 函数居多。

```html
<template>
  <div :class="$style.red">Hello World</div>
</template>

<style module>
  .red {
    color: red; font-size: 20px;
  }
</style>
```

也可以自定义注入名称（多个类可以放到数组中）。

```html
<template>
  <div :class="[classes.red, classes.border]">Hello World</div>
</template>

<style module="classes">
.red {
  color: red; font-size: 20px;
}
.border {
  border: 1px solid #ccc;
}
</style>
```

也可以与组合式 API 一同使用。

```html
<template>
  <div :class="[classes.red, classes.border]">Hello World</div>
</template>

<script setup lang="ts">
import { useCssModule } from 'vue'

// 在 setup() 作用域中...
// 默认情况下, 返回 <style module> 的 class
const class = useCssModule()

// 具名情况下, 返回 <style module="classes"> 的 class
const classes = useCssModule('classes')
</script>

<style module="classes">
.red {
  color: red; font-size: 20px;
}
.border {
  border: 1px solid #ccc;
}
</style>
```
