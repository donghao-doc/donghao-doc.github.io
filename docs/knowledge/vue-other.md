# 其他

## 生命周期

生命周期整体分为四个阶段：**创建、挂载、更新、销毁**，每个阶段都有两个钩子。

| 阶段 | Vue2                        | Vue3                            |
|----|-----------------------------|---------------------------------|
| 创建 | `beforeCreate`、`created`    | `setup`                         |
| 挂载 | `beforeMount`、`mounted`     | `onBeforeMount`、`onMounted`     |
| 更新 | `beforeUpdate`、`updated`    | `onBeforeUpdate`、`onUpdated`    |
| 销毁 | `beforeDestroy`、`destroyed` | `onBeforeUnmount`、`onUnmounted` |

:::tip
`updated` 会在**任意** DOM 更新后调用，即组件的任意状态发生变化，都会导致 `updated` 钩子重新调用。若只想在特定状态变化后访问更新后的 DOM，可使用 `watch()` 结合 `nextTick()`。
:::

### 父子组件生命周期执行顺序

创建、挂载流程：

```text
父-创建 -> 父-挂载前 -> 子-创建 -> 子-挂载前 -> 子-挂载完毕 -> 父-挂载完毕
```

更新流程：

:::code-group

```text [父子组件数据未相互使用]
父组件更新：父-更新前 -> 父-更新完毕
子组件更新：子-更新前 -> 子-更新完毕
```

```text [父子组件数据相互使用]
父-更新前 -> 子-更新前 -> 子-更新完毕 -> 父-更新完毕
```

:::

销毁流程：

:::code-group

```text [卸载父组件]
父-卸载前 -> 子-卸载前 -> 子-卸载完毕 -> 父-卸载完毕
```

```text [父组件使用 v-if 销毁子组件]
父-更新前 -> 子-卸载前 -> 子-卸载完毕 -> 父-更新完毕
```

:::

### 缓存组件的生命周期

- `onActivated()`：首次挂载、重新激活时会调用。
- `onDeactivated()`：组件失活、组件卸载时会调用。

## keep-alive

组件在切换时默认会被销毁，下一次显示时重新创建。`<keep-alive>` 用于缓存组件，让失活的组件保留在内存中，避免重复初始化，常搭配动态组件或 `<router-view>` 使用。

### 基本用法

:::code-group

```vue [动态组件]
<!-- 直接包裹即可缓存动态组件 -->
<keep-alive>
  <component :is="activeComponent" />
</keep-alive>

<!-- 和 <transition> 一起使用 -->
<transition>
  <keep-alive>
    <component :is="activeComponent" />
  </keep-alive>
</transition>
```

```vue [router-view]
<!-- 直接包裹即可缓存所有路由组件 -->
<keep-alive>
  <router-view />
</keep-alive>

<!-- 使用 `include` 控制缓存 -->
<router-view v-slot="{ Component }">
  <keep-alive :include="['UserList']">
    <component :is="Component" />
  </keep-alive>
</router-view>

<!-- 路由配置中设置 `meta.keepAlive = true` 控制缓存 -->
<router-view v-slot="{ Component, route }">
  <keep-alive>
    <component v-if="route.meta.keepAlive" :is="Component" />
  </keep-alive>
  <component v-else :is="Component" />
</router-view>
```

:::

### include、exclude

`<keep-alive>` 会缓存它直接子组件中的所有实例，可用 `include` 指定要缓存的组件，`exclude` 指定不缓存的组件。

```vue
<!-- 写法一：以英文逗号分隔的字符串，A B 是组件名称 -->
<keep-alive include="A,B">
  <component :is="view" />
</keep-alive>

<!-- 写法二：正则表达式 -->
<keep-alive :include="/A|B/">
  <component :is="view" />
</keep-alive>

<!-- 写法三：数组 -->
<keep-alive :include="['A', 'B']">
  <component :is="view" />
</keep-alive>
```

### 最大缓存数量

`max` 控制最多缓存多少个组件，超过上限时会优先缓存最活跃的组件。

```vue
<keep-alive :max="10">
  <component :is="activeComponent" />
</keep-alive>
```
