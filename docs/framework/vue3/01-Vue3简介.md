---
sidebar_position: 2
title: Vue3 简介
---

# Vue3 简介

## API 风格变化

Vue2 的 API 是 Options（配置）风格的，Vue3 的 API 是 Composition（组合）风格的。

Options API 的弊端：数据、方法、计算属性等，都分散在 `data`、`methods`、`computed` 中，若想新增或者修改一个需求，就需要分别修改 `data`、`methods`、`computed`，不便于维护和复用。

Composition API 的优势：可以用函数的方式，更加优雅地组织代码，让相关功能的代码更加有序地组织在一起，可维护性高。

![api_style.png](images/api_style.png)

## 性能的提升

- **更小**：打包体积减少 41%；
- **更快**：初次渲染快 55%，更新渲染快 133%；
- **更好**：内存减少 54%。

## 源码的升级

### 重写响应式

使用 `Proxy` 代替 `Object.defineProperty` 实现响应式。

`Proxy` 相较 `Object.defineProperty` 有以下优势：

- 对于对象，可以监听动态新增、删除的属性；
- 对于数组，可以监听数组的变化，可以监听数组的索引和 length 属性；
- `Object.defineProperty` 一次只能监听一个属性，如果对象中有很多属性，或者对象中还有对象，那就要遍历甚至递归地去监听，而 `Proxy` 可以直接监听整个对象。

### 优化虚拟 DOM

Vue2 每次更新虚拟 DOM 时，diff 算法都是全量对比。而 Vue3 只对比带有标记的节点，这样就大大减少了非动态内容的对比消耗。

以下代码是通过 [Vue 3 Template Explorer](https://template-explorer.vuejs.org/) 生成的。

```html title="DOM 节点"
<div>Hello World</div>
<div>Hello World</div>

<!-- highlight-start -->
<!-- 动态内容在编译后会打上标记 -->
<div>{{ msg }}</div>
<!-- highlight-end -->

<div>Hello World</div>
<div>Hello World</div>
```

```js title="Vue3 编译后的 VDOM"
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("div", null, "Hello World"),
    _createElementVNode("div", null, "Hello World"),
    
    // highlight-start
    // 下面的 1 /* TEXT */ 就是一个标记
    _createElementVNode("div", null, _toDisplayString(_ctx.msg), 1 /* TEXT */),
    // highlight-end
    
    _createElementVNode("div", null, "Hello World"),
    _createElementVNode("div", null, "Hello World")
  ], 64 /* STABLE_FRAGMENT */))
}
```

`1 /* TEXT */` 是一个动态文本节点标记，这个标记叫做 patchFlag（补丁标记）。

[查看其他 patchFlag](https://github.com/vuejs/core/blob/main/packages/shared/src/patchFlags.ts)

### Tree Shaking

Vue2 使用选项式 API，即使有些选项没有使用，Vue2 也会对它们进行打包，最终出现在生产代码中。这主要是因为 Vue 实例在项目中是单例的，捆绑程序无法检测到 Vue 实例对象的哪些属性在代码中被使用，哪些属性又没有被使用，所以全部打包了。

Vue3 引入 Tree Shaking 特性，使用组合式 API，Vue3 不会将没有使用到的 API 打包到最终的产物中。

如以下代码，只引入了 `watch`，那么 Vue 就只打包 `watch` 相关代码，其他没有用到的（如 `computed`）就不会打包，从而大幅度减小打包体积。

```js
import { watch } from 'vue'
```

## 拥抱 TypeScript

- Vue3 可以更好的支持 TypeScript。

## 新的特性

- Composition API：`setup`、`ref` 与 `reactive`、`computed` 与 `watch` 等；
- 新的内置组件：`Fragment`、`Teleport`、`Suspense` 等；
- 其他改变：新的生命周期钩子、`data` 选项应始终被声明为一个函数、移除 `keyCode` 支持作为 `v-on` 的修饰符等。
