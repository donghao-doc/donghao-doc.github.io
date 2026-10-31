# WXML 语法

:::: v-pre

## 声明和绑定数据

数据定义在 `Page()` 的 `data` 中，通过 `{{ }}` 绑定到 WXML。

`{{ }}` 内可以写表达式，不能写 `if`、`for` 等语句。

:::code-group

```xml [WXML]
<!-- 文本内容、对象属性 -->
<view>{{ school }}</view>
<view>{{ userInfo.name }}</view>

<!-- 动态属性值 -->
<view id="{{ nodeId }}">用户信息</view>
<checkbox checked="{{ isChecked }}" />

<!-- 表达式 -->
<view>{{ count + 1 }}</view>
<view>{{ count === 1 ? '等于一' : '不等于一' }}</view>
<view>{{ count > 1 }}</view>
```

```js [JS]
Page({
  data: {
    school: '上海大学',
    userInfo: { name: 'Tom', age: 18 },
    nodeId: 'user-card',
    isChecked: false,
    count: 1,
  },
})
```

:::

## setData

通过 `this.data` 读取数据，`this.setData()` 更新数据并驱动视图更新。

```js
Page({
  data: {
    count: 1
  },

  handleIncrease() {
    this.setData({ count: this.data.count + 1 })
  },
})
```

:::warning
直接执行 `this.data.count += 1` 只会修改数据，不会更新视图。对象属性、数组的方法等操作也是一样，都要通过 `setData()` 才能触发视图更新。
:::

## 简易双向数据绑定

- 单向数据绑定：数据更新会影响页面，但页面交互（比如用户输入）不会自动更新数据。
- 双向数据绑定：数据更新会影响页面，页面交互也会更新数据。

简易双向数据绑定：使用 `model:` 绑定基本类型数据，不能绑定对象或数组。

```xml
<!-- 单向绑定：输入内容不会自动写回 inputValue -->
<input value="{{ inputValue }}" />

<!-- 双向绑定：输入内容会同步更新 inputValue -->
<input model:value="{{ inputValue }}" />
<view>当前内容：{{ inputValue }}</view>

<!-- 复选框绑定 checked，而不是 value -->
<checkbox model:checked="{{ isChecked }}" />
```

## 列表渲染

### wx:for

遍历时有默认变量 `index` 和 `item`：

- 遍历数组：`index` 是索引，`item` 是当前项。
- 遍历对象：`index` 是属性名，`item` 是属性值。

```xml
<!-- 遍历数组 -->
<view wx:for="{{ fruitList }}" wx:key="id">
  {{ index }}：{{ item.name }}
</view>

<!-- 遍历对象 -->
<view wx:for="{{ userInfo }}">
  {{ index }}：{{ item }}
</view>
```

### wx:key

`key` 用于给列表中的每⼀项做标记，当列表发生新增、删除或排序时，小程序会根据 `key` 只更新变化的部分，不变的部分就不更新。

`wx:key` 可以直接写每一项的属性名，不用写成 `{{ }}` 或 `item.id`。

| 写法      | 使用条件                | 示例               |
|---------|---------------------|------------------|
| 对象属性名   | 属性值是稳定、唯一的字符串或数字    | `wx:key="id"`    |
| `*this` | 列表项本身就是稳定、唯一的字符串或数字 | `wx:key="*this"` |

:::warning
`wx:key="index"` 表示使用每一项的 `index` 属性，而不是索引。
:::

### 自定义变量名

使用 `wx:for-item` 和 `wx:for-index` 修改默认变量名。

```xml
<view
  wx:for="{{ fruitList }}"
  wx:for-item="fruit"
  wx:for-index="fruitIndex"
  wx:key="id"
>
  {{ fruitIndex }}：{{ fruit.name }}
</view>
```

### 使用 block 渲染多个节点

`block` 是一个包装元素，不是组件，不会生成实际的页面节点。

```xml
<block wx:for="{{ fruitList }}" wx:key="id">
  <view>名称：{{ item.name }}</view>
  <view>价格：{{ item.price }} 元</view>
</block>
```

## 条件渲染

### wx:if、wx:elif、wx:else

```xml
<view wx:if="{{ count === 1 }}">count 等于一</view>
<view wx:elif="{{ count === 2 }}">count 等于二</view>
<view wx:else>count 既不等于一，也不等于二</view>
```

需要同时控制多个节点时，可以使用 `block`：

```xml
<block wx:if="{{ isVisible }}">
  <view>商品名称</view>
  <view>商品价格</view>
</block>
```

### hidden

`hidden` 为 `true` 时隐藏，为 `false` 时显示。

```xml
<view hidden="{{ !isVisible }}">商品信息</view>
```

### wx:if 与 hidden 的区别

主要体现在显示隐藏元素的方式不同：

- `wx:if` 会动态创建或移除节点，如果是组件，组件内部状态可能丢失、生命周期重新执行。
- `hidden` 会保留节点，通过 `display` 控制是否可见，适合频繁显示隐藏。

::::
