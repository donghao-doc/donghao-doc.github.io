---
sidebar_position: 10
---

# 深入 v-model

## v-model 用在原生元素上

`v-model` 写在普通的 HTML 标签上，其本质是：`:value` 属性 ＋ `@input` 事件。

```html
<input type="text" v-model="userName">

<!-- v-model 的本质是下面这行代码 -->
<input type="text" :value="userName" @input="userName = (<HTMLInputElement>$event.target).value">
```

## v-model 用在组件上

`v-model` 写在组件标签上，其本质是：`:moldeValue` 属性 ＋ `@update:modelValue` 事件。

`v-model` 用在组件上，可以实现 **父 ↔ 子** 之间相互通信。

```html title="父组件"
<CustomInput v-model="userName" />

<!-- 组件标签上 v-model 的本质 -->
<CustomInput :model-value="userName" @update:model-value="userName = $event" />
```

```html title="CustomInput.vue 写法一"
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>
```

```html title="CustomInput.vue 写法二"
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="value" />
</template>
```

## 绑定多个 v-model

Vue3 中，在组件标签上可以写多个 `v-model`。

默认情况下，`v-model` 在组件上都是使用 `modelValue` 和 `update:modelValue`。

我们可以通过给 `v-model` 指定一个参数来更改这些名字。

```html
<UserName v-model:first-name="first" v-model:last-name="last" />

<!-- 上面代码的本质如下 -->
<UserName :first-name="first" :last-name="last" @update:first-name="first = $event" @update:last-name="last = $event" />
```

```html title="UserName.vue"
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input type="text" :value="firstName" @input="$emit('update:firstName', $event.target.value)" />
  <input type="text" :value="lastName" @input="$emit('update:lastName', $event.target.value)" />
</template>
```

## 自定义 v-model 修饰符

```html
<MyComponent v-model.capitalize="myText" />
```

组件的 `v-model` 上所添加的修饰符，可以在组件的 `modelModifiers` 中访问到。

```html
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

## 带参数的 v-model 修饰符

```html
<UserName v-model:first-name.capitalize="first" v-model:last-name.uppercase="last" />
```

```html
<script setup>
const props = defineProps({
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true}
</script>
```
