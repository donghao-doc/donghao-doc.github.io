---
sidebar_position: 3
---

# setup

## 拉开序幕的 setup

`setup` 是 `Vue3` 中一个新的配置项，值是一个函数，它是 `Composition API` **“表演的舞台”**，组件中所用到的数据、方法、计算属性、监视等等，均配置在 `setup` 中。

特点如下：

- `setup` 函数返回的对象中的内容，可直接在模板中使用；
- `setup` 中访问 `this` 是 `undefined`；
- `setup` 函数会在 `beforeCreate` 之前调用，它是“领先”所有钩子执行的。

```html title="示例"
<template>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <button @click="changeName">修改名字</button>
  <button @click="changeAge">年龄+1</button>
  <button @click="showTel">点我查看联系方式</button>
</template>

<script lang="ts">
  export default {
    name: 'Person',
    setup() {
      console.log(this)   // undefined

      // 数据，原来写在 data 中（此时的 name、age、tel 都不是响应式数据）
      let name = '张三'
      let age = 18
      let tel = '13888888888'

      // 方法，原来写在 methods 中
      function changeName() {
        name = 'zhang-san'  // name 的值会在内存中被修改，但页面不会更新
      }
      function changeAge() {
        age += 1            // age 的值会在内存中被修改，但页面不会更新
      }
      function showTel() {
        alert(tel)
      }

      // 返回一个对象，对象中的内容，模板中可以直接使用
      return { name, age, tel, changeName, changeAge, showTel }
    }
  }
</script>
```

## setup 的返回值

可以返回一个**对象**，对象中的属性、方法等，在模板中可以直接使用。

也可以返回一个**函数**，函数的返回值会作为组件的渲染内容，如：

```ts
setup() {
  // 返回一个渲染函数
  return () => '你好啊！'
}
```

## setup 与 Options API 的关系

Options API 中**可以访问**到 `setup` 中的属性和方法，但 `setup` 中**不能访问**到 Options API 中的属性和方法。

- 因为在生命周期中 `setup` 是最先执行的，`setup` 执行完成后会把数据挂到应用实例上，而 Options API 中的 `this` 指向的就是应用实例，所以可以访问到；
- 注意，`setup` 比 `data` 的执行还要早，所以 `data` 中可以通过 `this` 访问到 `setup` 中的数据，但 `setup` 中访问不到 `data` 中的数据；
- 如果 Options API 与 `setup` 中的属性或方法有冲突，以 `setup` 为优先。

## setup 语法糖

```html
<template>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <button @click="changName">修改名字</button>
  <button @click="changAge">年龄+1</button>
  <button @click="showTel">点我查看联系方式</button>
</template>

<script lang="ts">
  export default {
    name: 'Person',
  }
</script>

<!-- setup 语法糖 -->
<script setup lang="ts">
  console.log(this)   // undefined

  // 数据（此时的 name、age、tel 都不是响应式数据）
  let name = '张三'
  let age = 18
  let tel = '13888888888'

  // 方法
  function changName() {
    name = '李四'   // name 的值会在内存中被修改，但页面不会更新
  }
  function changAge() {
    age += 1        // age 的值会在内存中被修改，但页面不会更新
  }
  function showTel() {
    alert(tel)
  }
</script>
```

## 定义组件名字

### 使用插件

以上代码，还需要编写一个不带 `setup` 的 `script` 标签，去定义组件名字，比较麻烦，我们可以借助 Vite 的插件简化。

1. 安装插件：`npm i vite-plugin-vue-setup-extend -D`；

2. 在 vite.config.ts 中使用插件；

    ```ts
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    // highlight-next-line
    import VueSetupExtend from 'vite-plugin-vue-setup-extend'
    
    export default defineConfig({
      // highlight-next-line
      plugins: [vue(), VueSetupExtend()]
    })
    ```

3. 定义组件名字：`<script setup lang="ts" name="Person">`。

### 使用 defineOptions 宏函数

Vue3.3+ 提出了 `defineOptions` 函数，可以用来直接在 `<script setup>` 中声明组件选项，而不必使用单独的 `<script>` 块。

```html
<script setup lang="ts">
  defineOptions({
    name: 'Person'
  })
</script>
```
