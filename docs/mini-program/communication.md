# 数据共享与通信

父子组件之间的传值见[自定义组件中的组件通信](./component.md#组件通信)。

## 全局数据和方法

在 `app.js` 中定义全局数据（`globalData`）和方法，页面和组件通过 `getApp()` 获取全局唯一的应用实例，访问全局数据和方法。

:::code-group

```js [app.js]
App({
  globalData: {
    token: ''
  },
  
  setToken(token) {
    // this 指向 app 应用实例
    this.globalData.token = token
  },
})
```

```js [登录页面]
const app = getApp()

Page({
  handleLogin() {
    app.setToken('token-xxx')
  },
})
```

```js [其他页面]
const app = getApp()

Page({
  data: {
    isLoggedIn: false
  },

  // 页面每次显示时同步当前登录状态
  onShow() {
    this.setData({
      isLoggedIn: Boolean(app.globalData.token)
    })
  },
})
```

:::

注意：

- `App()` 中的方法、生命周期，可以使用 `this` 访问应用实例，无需调用 `getApp()`。
- 修改 `globalData` 不会自动更新页面或组件的视图。

## 页面间通信

基于发布订阅模式，一个页面通过 `wx.navigateTo()` 打开另一个页面后，可以使用 `EventChannel` 在这两个页面之间建立双向通信通道，进行双向数据传递。

:::code-group

```js [A 页面]
Page({
  data: {
    userReceived: false
  },
  
  handleOpenDetail() {
    wx.navigateTo({
      url: '/pages/detail/detail',
      // 2.2 监听事件，获取回传的数据
      events: {
        userReceived: (result) => {
          this.setData({ userReceived: result.received })
        },
      },
      success(res) {
        // 1.1 触发事件，发送数据
        res.eventChannel.emit('sendUser', { name: 'Tom', age: 18 })
      },
    })
  },
})
```

```js [B 页面]
Page({
  data: {
    user: null
  },
  
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    
    // 直接从分享或启动路径进入时，可能没有可用的打开方通道
    if (typeof eventChannel.on !== 'function') return

    // 1.2 监听事件，获取发送的数据
    eventChannel.on('sendUser', (user) => {
      this.setData({ user })
      
      // 2.1 触发事件，回传数据
      eventChannel.emit('userReceived', { received: true })
    })
  },
})
```

:::

## 事件总线

基于发布订阅模式：发送方发布事件，接收方订阅该事件。

:::warning
事件总线存在**事件关系难以追踪**的问题，不应作为数据通信的优先选择。
:::

```bash
npm install pubsub-js
```

安装后在微信开发者工具中“构建 npm”。

:::code-group

```js [组件 A 发布事件]
import PubSub from 'pubsub-js'

Component({
  methods: {
    handleSend() {
      // 发布事件
      PubSub.publish('change', { name: 'Tom', age: 18 })
    },
  },
})
```

```js [组件 B 订阅事件]
import PubSub from 'pubsub-js'

Component({
  data: {
    name: '',
    age: 0
  },
  lifetimes: {
    // 在 attached 中订阅
    attached() {
      this.subscription = PubSub.subscribe('change', (message, data) => {
        // message 是当前事件的名称，data 是发布时的数据
        this.setData({ name: data.name, age: data.age })
      })
    },
    
    // 在 detached 中取消订阅
    detached() {
      PubSub.unsubscribe(this.subscription)
    },
  },
})
```

:::
