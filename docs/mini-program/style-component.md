# 样式和组件

小程序不支持 DOM/BOM，CSS 选择器也仅部分支持，建议优先使用 class 选择器。

## 样式单位 rpx

小程序的 WXSS 可以使用 `%`、`em`、`rem`、`vw`、`vh`、`px`、`rpx` 等样式单位。

`rpx` 是响应式单位，可以根据不同设备的屏幕宽度进行自适应缩放。

微信规定：不管什么型号的手机，屏幕宽度都统一为 `750rpx`。

它把屏幕分为 750 份，每一份就是 1rpx，750rpx 就是页面总宽度。屏幕越宽，1rpx 所占实际尺寸就越大。

建议设计稿宽度 `750px`，这样量多少 `px` 开发就可以直接写多少 `rpx`，否则还要进行换算。比如设计稿宽度为 `375px`，设计稿量取元素宽度为 `100px`，开发就要写 `200rpx`。

## image 裁剪和缩放

`image` 组件的 `mode` 属性用于设置图片如何裁剪和缩放。

| 取值                 | 表现             |
|--------------------|----------------|
| `scaleToFill`（默认值） | 不保持比例，拉伸填满     |
| `aspectFit`        | 保持比例，完整显示，可能留白 |
| `aspectFill`       | 保持比例，填满区域，可能裁剪 |
| `widthFix`         | 宽度确定，高度按原图比例变化 |
| `top left` 等       | 不缩放，只显示指定区域    |

## 页面跳转和参数

| 跳转方式           | 作用                              |
|----------------|---------------------------------|
| `navigate`     | 保留当前页，跳转到非 tabBar 页面            |
| `redirect`     | 关闭当前页，跳转到非 tabBar 页面            |
| `switchTab`    | 切换 tabBar 页面，关闭其他非 tabBar 页面    |
| `reLaunch`     | 关闭所有页面，跳转到 tabBar 或非 tabBar 页面  |
| `navigateBack` | 关闭当前页面，返回上一页，或根据 `delta` 返回多级页面 |

:::tip
- 携带查询参数时，参数值如果有中文或特殊字符，应使用 `encodeURIComponent` 编码，目标页面通过 `onLoad(options)` 接收参数。
- `switchTab` 切换 tabBar 页面时不支持传参。
:::

## 使用字体图标

自定义图标可以使用 iconfont、图片或雪碧图（精灵图）等方式实现。

图片、雪碧图做 icon 的缺点：

- 大量网络图片会产生很多 HTTP 请求；包内图片不会为每张图片发起请求，但会增加包体积，小程序对包体积有限制。
- 不能修改颜色。
- 图片放大会变模糊。

建议优先使用 iconfont：

1. 在 iconfont 选择图标后，点击“Font class”，点击生成的 css 链接，将 css 代码复制到项目的 `iconfont.wxss` 或 `iconfont.scss` 中。
2. 在 `app.scss` 中使用 `@import`/`@use` 引入 `iconfont.scss`。
3. 使用图标：`<text class="iconfont icon-xxx"></text>`。

:::tip
- 控制台中会出现“[渲染层网络层错误] Failed to load font”错误，这个错误不影响开发，可以忽略。
- 如果要解决这个错误，可以在 iconfont 点“项目设置 - 字体格式 - 勾选 Base64”，复制新的 css 代码到项目中。
- 将 Base64 字体数据嵌入样式代码，能减少对外部字体的请求，但会增加样式文件体积。
:::

## 背景图

`background-image` 不支持本地图片路径，背景图可以使用网络图片、Base64 图片、`<image>` 组件等方式来实现。

:::warning
Base64 图片嵌入样式代码会增加代码体积，只适合少量小资源，否则不建议使用。

```scss
.promotion-banner {
  height: 320rpx;
  background-image: url("data:image/jpeg;base64,iRxVB0…");
}
```
:::
