# 小程序 API

## API 分类与调用方式

API 类型：同步 API、异步 API、事件监听 API 等。

异步 API 支持回调或 promise 两种调用方式，传入的配置对象中如果没有 `success`/`fail`/`complete`，就返回 promise。

```js
// callback 形式调用
wx.chooseImage({
  success(res) {
    console.log('res:', res)
  }
})

// promise 形式调用
wx.chooseImage().then(res => console.log('res: ', res))
```

## 网络请求

`wx.request()` 用于发起网络请求，它不能返回 promise，需要自行封装。

| 配置项                             | 说明                    |
|---------------------------------|-----------------------|
| `url`                           | 接口地址                  |
| `method`                        | 请求方法，默认 `GET`         |
| `data`                          | 请求参数                  |
| `header`                        | 请求头，例如 `content-type` |
| `success` / `fail` / `complete` | 成功、失败、结束回调            |

:::tip
- `success` 只表示成功收到服务器响应，HTTP `404`、`500` 等响应也可能进入此回调。
- 要在微信公众平台的“开发设置 → 服务器域名”中配置 **request 合法域名**。
- 开发阶段可以在开发者工具中勾选“不校验合法域名、TLS 版本及 HTTPS 证书”。
:::

## 本地存储

| 操作    | 同步 API                         | 异步 API                         |
|-------|--------------------------------|--------------------------------|
| 存储    | `wx.setStorageSync(key, data)` | `wx.setStorage({ key, data })` |
| 获取    | `wx.getStorageSync(key)`       | `wx.getStorage({ key })`       |
| 删除指定项 | `wx.removeStorageSync(key)`    | `wx.removeStorage({ key })`    |
| 清空    | `wx.clearStorageSync()`        | `wx.clearStorage()`            |

:::tip
对象、数组可以直接存储和获取，无需 `JSON.stringify()`、`JSON.parse()`。
:::

## 编程式导航与传参

- 声明式导航：通过 `<navigator>` 组件跳转页面。
- 编程式导航：通过 API 跳转页面。

| API                 | 描述                                      |
|---------------------|-----------------------------------------|
| `wx.navigateTo()`   | 保留当前页面，打开非 tabBar 页面                    |
| `wx.redirectTo()`   | 销毁当前页面，打开非 tabBar 页面                    |
| `wx.switchTab()`    | 切换 tabBar 页面（url 不能带参数），关闭其他非 tabBar 页面 |
| `wx.reLaunch()`     | 关闭（销毁）所有页面，打开 tabBar 或非 tabBar 页面       |
| `wx.navigateBack()` | 关闭（销毁）当前页面，返回上一页或多级页面                   |

```js
// 包含中文或特殊字符的值要进行编码
const name = encodeURIComponent('商品 A&B')
// 跳转页面并携带查询参数
wx.navigateTo({ url: `/pages/detail/detail?id=1&name=${name}` })

// 目标页面可以在 onLoad 中接收参数
Page({
  onLoad(options) {
    console.log(options.id)
    console.log(decodeURIComponent(options.name || ''))
  },
})
```

## 页面上拉加载与下拉刷新

在页面 `.json` 或 `app.json` 的 `window` 中配置：

```json
{
  "onReachBottomDistance": 100,  // 距页面底部 100px 时触发，默认 50px
  "enablePullDownRefresh": true, // 开启页面下拉刷新
  "backgroundColor": "#EFEFEF",
  "backgroundTextStyle": "dark"
}
```

配合在页面 `.js` 中调用 `onReachBottom()`、`onPullDownRefresh()`。

:::warning
下拉刷新完成后，要调用 `wx.stopPullDownRefresh()` 结束页面的下拉刷新。
:::
