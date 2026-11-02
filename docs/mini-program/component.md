# 自定义组件

## 组件声明与注册

组件 `.json` 中声明：

```json
{
  "component": true,
  "usingComponents": {}
}
```

在 `app.json` 或页面 `.json` 或组件 `.json` 中注册：

```json
{
  "usingComponents": {
    "custom-checkbox": "/components/custom-checkbox/custom-checkbox"
  }
}
```

在 WXML 中使用：`<custom-checkbox />`。

## 数据、方法与 properties

组件逻辑使用 `Component()` 定义。

```js
Component({
  // 组件接收的属性
  properties: {
    label: String, // 只声明类型
    position: { type: String, value: 'right' }, // 声明类型和默认值
  },
  // 组件内部数据
  data: {
    count: 0
  },
  // 组件内部方法
  methods: {
    handleIncrease() {
      this.setData({ count: this.data.count + 1 })
    },
  },
})
```

JS 中可以使用 `this.properties.label` 或 `this.data.label` 读取属性，模板中可以直接使用 `label`。

:::warning
`properties` 中的数据也可以通过 `setData` 修改，但不建议组件内部直接修改传入的属性，应通过事件通知父级修改。
:::

## slot 插槽

:::code-group

```xml [默认插槽]
<!-- 子组件模板 -->
<view class="card-content">
  <slot />
</view>

<!-- 页面使用 -->
<custom-card>
  <text>页面提供的内容</text>
</custom-card>
```

```jsx [具名插槽]
// 组件中启用 multipleSlots
Component({
  options: {
    multipleSlots: true
  }
})

// 子组件模板
<slot name="header" />
<view class="card-content">组件自身内容</view>
<slot name="footer" />

// 页面使用：slot 属性对应插槽的 name
<custom-card>
  <text slot="header">标题</text>
  <text slot="footer">底部说明</text>
</custom-card>
```

:::

## 组件样式

:::tip
- 优先使用 class 选择器、伪类和伪元素选择器，避免标签、ID、属性选择器。
- `color`、`font-size` 等可继承属性仍可能从外部继承，样式隔离不等于禁止样式继承。
:::

### 样式隔离

可以通过 `styleIsolation` 来设置组件的样式隔离。

推荐写在组件 `.json` 中。

:::code-group

```js [在 JS 中配置]
Component({
  options: {
    styleIsolation: 'apply-shared'
  }
})
```

```json [在 JSON 中配置]
{
  "component": true,
  "styleIsolation": "apply-shared"
}
```

:::

| 取值             | 页面样式影响组件   | 组件样式影响页面或其他组件                        |
|----------------|------------|--------------------------------------|
| `isolated`（默认） | class 样式隔离 | class 样式隔离                           |
| `apply-shared` | 可以         | 不向外共享                                |
| `shared`       | 可以         | 可以影响页面及其他 `apply-shared`、`shared` 组件 |

如果要在自定义组件中修改原生组件或 Vant Weapp 组件样式，需要解除自定义组件的样式隔离，设置 `styleIsolation: 'shared'`。

```scss
// 添加自定义类名，限定范围，避免改动到其他 checkbox
.custom-checkbox-control {
  .wx-checkbox-input {
    width: 24rpx;
    height: 24rpx;
    border-radius: 50%;
  }

  .wx-checkbox-input.wx-checkbox-input-checked {
    background-color: #fda007;
  }

  .wx-checkbox-input.wx-checkbox-input-checked::before {
    color: #ffffff;
    font-size: 22rpx;
  }
}
```

### 外部样式类

组件可以通过 `externalClasses` 开放样式入口，让使用者传入样式类。

:::code-group

```jsx [组件]
Component({
  externalClasses: ['label-class']
})

// 子组件模板：使用声明的外部样式类名
<view class="label-class">组件文本</view>
```

```vue [页面]
<!-- 页面：传入页面样式类 -->
<custom-card label-class="agreement-text" />

// 页面 .scss
.agreement-text {
  color: #e67e22;
}
```

:::

## 数据监听

`observers` 可以监听 `data` 和 `properties` 中的字段，在数据更新时执行相应回调。

| 监听键                  | 作用                 |
|----------------------|--------------------|
| `'count'`            | 监听单个字段             |
| `'numberA, numberB'` | 监听多个字段，回调参数与字段顺序对应 |
| `'userInfo.name'`    | 监听对象的属性            |
| `'list[1]'`          | 监听数组的元素            |
| `'userInfo.**'`      | 监听对象本身及其所有字段       |
| `'**'`               | 监听全部数据字段           |

```js
Component({
  data: {
    numberA: 0,
    numberB: 0,
    sum: 0
  },
  observers: {
    'numberA, numberB'(newNumberA, newNumberB) {
      this.setData({ sum: newNumberA + newNumberB })
    },
  },
})
```

## 组件通信

### 父传子：properties

父页面绑定数据，子组件通过 `properties` 接收。

```xml
<custom-checkbox checked="{{ isChecked }}" label="同意协议" />
```

若要同步父子数据，子组件可通过 `observers` 监听传入的属性变化，以同步子组件内部数据；子组件内部修改了数据，可以通过自定义事件通知父级更新。

### 子传父：自定义事件

子组件通过 `this.triggerEvent(事件名, 数据)` 触发自定义事件，父级在子组件身上通过 `bind` 绑定自定义事件，并从事件处理函数的事件对象 `event.detail` 获取数据。

```jsx
// 子组件方法中
this.triggerEvent('change', { checked: true })

// 父页面模板
<custom-checkbox bind:change="handleCheckedChange" />

// 父页面 Page() 中
handleCheckedChange(event) {
  this.setData({
    isChecked: event.detail.checked
  })
}
```

### 获取子组件实例

为组件添加 `id` 或 `class`，通过 `this.selectComponent()` 获取组件实例，进而访问组件中的数据和方法。

```jsx
// 父页面模板
<custom-checkbox id="agreement" />

// 父页面 onReady 或用户事件处理函数中，确保组件已经挂载
const child = this.selectComponent('#agreement')
if (child) {
  console.log(child.data.isChecked)
}
```

## 组件生命周期

组件自身生命周期定义在 `lifetimes` 中。

| 钩子         | 时机与用途            |
|------------|------------------|
| `created`  | 组件实例创建完成         |
| `attached` | 挂载到页面，执行初始化和数据同步 |
| `ready`    | 组件在渲染线程准备就绪      |
| `moved`    | 在节点树中的位置移动       |
| `detached` | 组件被销毁，清理定时器、监听等  |

```js
Component({
  lifetimes: {
    attached() {
      console.log('组件挂载')
    },
    detached() {
      console.log('组件移除')
    },
  },
})
```

### 组件所在页面的生命周期

在组件的 `pageLifetimes` 中监听所在页面的状态。

```js
Component({
  pageLifetimes: {
    show() {
      console.log('所在页面显示')
    },
    hide() {
      console.log('所在页面隐藏')
    },
    resize() {
      console.log('所在页面尺寸变化')
    },
    routeDone() {
      console.log('所在页面路由动画完成')
    }
  },
})
```

### 三类生命周期的执行顺序

冷启动时：

- 应用 `onLaunch → onShow`，然后创建首个页面。
- 如果页面中有组件，组件 `created → attached`。
- 页面 `onLoad → onShow`。

页面销毁时：组件 `detached`，再执行页面 `onUnload`。

## 使用 Component 构造页面

页面也可以使用 `Component()` 定义，以便使用数据监听器、behaviors 等组件的能力，实现更复杂的功能逻辑开发。

- 页面仍需在 `app.json` 的 `pages` 注册。
- 页面 `.json` 中要保留 `usingComponents`。
- 页面 `onLoad`、`onShow`、`onReachBottom` 等钩子和事件处理函数都放入 `methods`。

```js
Component({
  properties: {
    id: String
  },
  methods: {
    // 查询参数可以通过 options 接收，也可以通过 properties 接收
    onLoad(options) {
      console.log(options.id)
      console.log(this.properties.id)
    },
  },
})
```

## behaviors 复用机制

将多个组件共用的数据、方法、生命周期等抽取成 `Behavior()`，再通过组件的 `behaviors` 数组引入，behavior 中的数据、方法、生命周期会被合并到组件中。

```js
// behaviors/counter.js
const counterBehavior = Behavior({
  data: {
    count: 0
  },
  methods: {
    increase() {
      this.setData({ count: this.data.count + 1 })
    },
  },
})

export default counterBehavior
```

```js
import counterBehavior from '../../behaviors/counter'

Component({
  behaviors: [counterBehavior]
})
```

:::warning
`behaviors` 存在数据来源不明确、同名字段合并规则复杂、同名生命周期或监听器执行顺序不明确等问题，不建议使用。
:::
