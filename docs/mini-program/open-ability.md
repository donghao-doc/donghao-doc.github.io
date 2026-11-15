# 开放能力

## 获取微信头像

给原生 `button` 设置 `open-type="chooseAvatar"`，绑定 `chooseavatar` 事件获取用户选择的头像临时路径。

```js
<button open-type="chooseAvatar" bind:chooseavatar="handleChooseAvatar">
  选择头像
</button>

<image wx:if="{{ avatarUrl }}" src="{{ avatarUrl }}" mode="aspectFill" />

Page({
  data: {
    avatarUrl: ''
  },
  
  handleChooseAvatar(event) {
    this.setData({ avatarUrl: event.detail.avatarUrl })
  },
})
```

:::tip
`event.detail.avatarUrl` 是临时文件路径，如果要长期保存，应上传文件到服务器或云存储，返回持久地址。
:::

## 获取微信昵称

将 `input` 的 `type` 设置为 `nickname`，用户输入时，键盘上方会展示微信昵称。

```js
<form bind:submit="handleProfileSubmit">
  <input type="nickname" name="nickname" placeholder="请输入昵称" />
  <button form-type="submit">保存昵称</button>
</form>

Page({
  data: {
    nickname: ''
  },
  
  handleProfileSubmit(event) {
    const nickname = event.detail.value.nickname.trim()

    if (!nickname) {
      wx.showToast({ title: '请填写昵称', icon: 'none' })
      return
    }

    this.setData({ nickname })
  },
})
```

## 发送给朋友

有两种转发方式：右上角菜单转发、`<button open-type="share">` 按钮转发。

都必须在页面定义 `onShareAppMessage` 监听，否则无法转发。

```js
<button open-type="share">发送给朋友</button>

Page({
  onShareAppMessage(options) {
    console.log(options.from)   // 转发来源，button 为页面按钮，menu 为右上角菜单
    console.log(options.target) // 仅按钮转发时有值，菜单转发时为 undefined

    // 返回自定义分享内容
    return {
      title: '查看商品详情',                  // 分享标题
      path: '/pages/detail/detail?id=1001', // 分享的页面路径，可以带查询参数
      imageUrl: '/assets/share.png',        // 分享图片，支持本地或网络图片
    }
  },
})
```

## 分享到朋友圈

朋友圈分享入口位于右上角菜单，不支持在页面内用按钮直接分享。

页面需同时定义 `onShareAppMessage`（发送给朋友）和 `onShareTimeline`（分享到朋友圈）。

```js
Page({
  // 允许当前页面发送给朋友
  onShareAppMessage() {
    return { title: '商品介绍' }
  },

  // 配置当前页面分享到朋友圈
  // 不能自定义 path
  onShareTimeline() {
    return {
      title: '商品介绍',
      query: 'id=1001', // 查询参数
      imageUrl: '/assets/share-square.png',
    }
  },
})
```

:::tip
- 用户从朋友圈打开时，通常先进入“小程序单页模式”，再通过“前往小程序”进入完整小程序。
- 单页模式中没有登录态，页面跳转、开放能力受限，本地存储也不与普通模式共用，适合内容展示页。
- 包含 `web-view` 的页面不支持分享到朋友圈。
:::

## 手机号验证组件

用于向用户发起手机号申请，经用户同意后，才能获得微信平台验证后的手机号。

| 类型   | `open-type`              | 事件                       | 验证特点                      |
|------|--------------------------|--------------------------|---------------------------|
| 快速验证 | `getPhoneNumber`         | `getphonenumber`         | 平台验证过号码，但不保证为实时验证         |
| 实时验证 | `getRealtimePhoneNumber` | `getrealtimephonenumber` | 每次请求对号码进行实时验证（向用户发送短信验证码） |

```js
<button
  open-type="getPhoneNumber"
  bind:getphonenumber="handlePhoneNumber"
>
  快速验证手机号
</button>

<button
  open-type="getRealtimePhoneNumber"
  bind:getrealtimephonenumber="handlePhoneNumber"
>
  实时验证手机号
</button>

Page({
  // 用户同意后执行
  handlePhoneNumber(event) {
    // 获取手机号动态令牌，有效期为 5 分钟，只能消费一次
    const { code } = event.detail

    // 用户拒绝、额度不足或能力不支持，都可能没有 code  
    if (!code) {
      wx.showToast({ title: '未获取到手机号授权', icon: 'none' })
      return
    }

    // 将 code 提交给后端，由后端调用微信接口换取手机号
  },
})
```

:::tip
- 目前主要向非个人主体，且完成认证的小程序开放。
- 开发调试有 1000 次免费额度，开发版、体验版、正式版共用。
:::

## 客服功能

1. 给 `button` 设置 `open-type="contact"`，点击进入客服会话。
2. 在微信公众平台的客服功能中绑定客服人员的微信号，客服就可以登录网页端或移动端客服工作台，进行接收、发送消息。

```js
<button open-type="contact" bind:contact="handleContact">联系客服</button>

Page({
  /**
   * 获取用户点击客服消息卡片后返回的页面路径、参数
   */
  handleContact(event) {
    console.log(event.detail.path, event.detail.query)
  },
})
```
