# 事件系统

## 事件绑定和事件对象

使用 `bind:事件名` 绑定事件，如 `bind:tap="handleTap"`，事件处理函数会收到事件对象 `event`。

```jsx
<input bind:input="handleInput" />

Page({
  handleInput(event) {
    console.log(event.detail.value)
  },
})
```

## 阻止事件冒泡

事件是否冒泡由事件本身决定，与绑定事件的方式无关。

> 比如 `bind:tap` 会冒泡，是因为 `tap` 事件本身就会冒泡；`bind:input` 不会冒泡，是因为 `input` 事件本身不会冒泡。

bind 与 catch：

- `bind` 表示绑定事件且不阻止冒泡，但并不意味着所有 `bind` 绑定的事件都会冒泡。
- `catch` 会阻止事件冒泡。

## 事件传参

### data-*

使用 `data-属性名` 定义参数，通过事件对象中的 `dataset` 获取。

```jsx
<button data-id="1" data-name="Tom" bind:tap="handleTap">
  查看用户
</button>

Page({
  handleTap(event) {
    const { id, name } = event.currentTarget.dataset
    console.log(id, name)
  },
})
```

### mark:

使用 `mark:属性名` 定义参数，在处理函数中通过 `event.mark` 获取。

```jsx
<button mark:id="1" mark:name="Tom" bind:tap="handleTap">
  查看用户
</button>

Page({
  handleTap(event) {
    const { id, name } = event.mark
    console.log(id, name)
  },
})
```

### 嵌套节点的 mark 合并

`mark` 会合并冒泡路径上的标记，即从触发节点到根节点上的标记，而不只是触发节点和绑定节点。

```jsx
<view mark:pageName="cart">
  <view mark:groupId="{{10}}" bind:tap="handleGroupMarkTap">
    <button mark:productId="{{1001}}">查看商品</button>
  </view>
</view>

Page({
  handleGroupMarkTap(event) {
    const { pageName, groupId, productId } = event.mark;
    console.log("页面与商品信息", pageName, groupId, productId);
  }
});
```

以上代码：

- 点击按钮时，`event.mark` 包含 `productId`、`groupId`、`pageName`。
- 点击中间 `view` 时，只包含该节点及其祖先的 `groupId`、`pageName`，不包含子按钮的 `productId`。

## target 与 currentTarget 的区别

由于存在事件冒泡，点击的元素和执行事件的元素可能不是同一个元素。

以点击事件为例，事件对象中的 `target` 是点击的那个元素，`currentTarget` 是执行回调的那个元素。

```xml
<view data-group-id="{{10}}" bind:tap="handleGroupTap">
  <!-- 按钮没有绑定事件，点击 button 产生的 tap 事件会冒泡给 view -->
  <button data-product-id="{{1001}}">查看商品</button>
</view>
```

以上代码，点击 `button` 时，`target` 是 `button`，`currentTarget` 是 `view`。
