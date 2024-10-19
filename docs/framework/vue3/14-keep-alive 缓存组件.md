---
sidebar_position: 14
---

组件切换时，不显示的组件会被销毁，等要显示时再重新挂载。

`<keep-alive>` 是一个内置组件，可以把组件缓存下来，避免重新渲染，多用于提升性能和用户体验。

## 基本使用

```html title="基本使用"
<keep-alive>
  <component :is="activeComponent" />
</keep-alive>
```

```html title="多个条件判断的子组件"
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
```

```html title="和 <transition> 一起使用"
<transition>
  <keep-alive>
    <component :is="activeComponent"></component>
  </keep-alive>
</transition>
```

## include 和 exclude

`<keep-alive>` 默认会缓存所有组件。

`include` 可以设置哪些组件要缓存，`exclude` 可以设置哪些组件不缓存。

有以下三种写法：

```html
<!-- 以英文逗号分隔的字符串 -->
<keep-alive include="a,b">
  <component :is="view" />
</keep-alive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view" />
</keep-alive>

<!-- 数组 (需使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view" />
</keep-alive>
```

注意，`:include="['a', 'b']"` 中的 a 和 b 是组件的 `name` 选项。但在 Vue3.2.34 或以上版本，可以不用声明 `name` 选项，而是直接使用文件名作为组件名。

## 最大缓存实例数

`max` 可以指定最多缓存多少个组件。比如有 11 个组件，如果设置 `:max="10"`，就会优先缓存最活跃的 10 个组件。

```html
<keep-alive :max="10">
  <component :is="activeComponent"></component>
</keep-alive>
```

## 缓存组件的生命周期

- `onActivated()`：首次挂载时会调用，组件激活时也会调用
- `onDeactivated()`：组件卸载时会调用，以及失活时也会调用
