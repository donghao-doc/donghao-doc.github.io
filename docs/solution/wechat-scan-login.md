# 微信扫码登录

[网站应用微信登录开发指南](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)

:::tip 快速登录功能
PC 端微信 3.9.11（Win）/4.0.0（Mac）及以上版本支持快速登录，无需扫码直接在客户端确认登录。
:::

:::tip OAuth 2.0 协议

微信登录基于 OAuth2.0 协议实现，该协议能让第三方应用（网站、APP）在不获取用户账号密码的情况下，经用户授权后访问用户在其他平台（如微信）的资源。

在微信扫码登录场景中，微信作为 “资源服务器” 存储用户数据，第三方应用需通过 OAuth2.0 的 “授权码模式”（`authorization_code`）向微信服务器发起授权请求，经用户授权后即可获取用户信息。

:::

## 准备工作

- 在 [微信开放平台](https://open.weixin.qq.com) 注册开发者账号，创建 “网站应用” 并通过审核。
- 获取 `AppID`、`AppSecret`，申请 “微信登录权限” 并通过审核。
- **配置授权回调域名**：在 “开发设置” 中配置授权回调域名，例如回调地址为 `https://demo.com/login/callback`，则域名配置为 `demo.com`。

## 扫码登录流程

### 前端获取 code

前端发起微信授权登录，用户授权后微信会携带临时 `code` 跳转回网站。

获取 code 有两种方式：**跳转二维码页面**、**网页内嵌二维码**。

这两种方式，在用户扫码授权后，页面会自动跳转回 `redirect_uri`，前端可从 url 中获取 `code`，再将 `code` 发送给后端。

:::code-group

```text [跳转二维码页面]
https://open.weixin.qq.com/connect/qrconnect?
  appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect
```

```html [网页内嵌二维码]
<!-- 引入脚本（支持 HTTPS）-->
<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>

<!-- 承载二维码的容器 -->
<div id="login_container"></div>

<script>
  // 实例化 WxLogin
  const obj = new WxLogin({
    id: 'login_container', // 承载二维码的容器 ID
    appid: '',
    scope: 'snsapi_login', // 固定值
    redirect_uri: '', // 回调地址，需 URL Encode，域名须与开放平台中配置的授权回调域名一致
    state: '', // 可用于防止 CSRF 攻击，建议带上该参数，可设置为简单的随机数加 session 进行校验
  });
</script>
```

:::

### 后端获取 access_token

通过前端传递的 `code`，向微信服务器请求 `access_token`（接口调用凭证）。

:::tip
`code` 是临时授权码，10 分钟有效且仅能换取一次 `access_token`。
:::

:::code-group

```js [接口封装]
const axios = require('axios');
const config = require('./config.js'); // 配置文件中包含 appId、appSecret

/**
 * 通过 code 获取微信 access_token
 * @param {string} code - 前端传递的临时授权码
 * @returns {Promise<Object>} - 包含 access_token、expires_in、refresh_token、openid、scope 等信息的对象
 */
async function getWechatAccessToken(code) {
  try {
    // 构建请求 URL
    const requestUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wechat.appId}&secret=${config.wechat.appSecret}&code=${code}&grant_type=authorization_code`;

    // 发起 GET 请求
    const response = await axios.get(requestUrl);
    const result = response.data;

    // 校验返回结果（微信返回错误时会包含 errcode 字段）
    if (result.errcode) {
      throw new Error(
        `获取 access_token 失败：${result.errmsg}（错误码：${result.errcode}）`
      );
    }

    // 返回成功数据
    return result;
  } catch (error) {
    console.error('获取微信 access_token 异常：', error.message);
    throw error;
  }
}
```

```js [调用示例]
router.get('/login/callback', async (req, res) => {
  const { code, state } = req.query;

  // 1. 校验 state（与 Session 中存储的 state 比对，防止 CSRF）

  // 2. 获取 access_token
  const tokenInfo = await getWechatAccessToken(code);

  // 3. 后续操作（如获取用户信息、创建登录态等）
});
```

:::

:::tip

- `access_token` 有效期约 2 小时，`refresh_token` 有效期 30 天。
- 若 `access_token` 过期，可使用 `refresh_token` 重新获取 `access_token`。
- 若 `refresh_token` 也失效，则需要用户重新授权登录。

:::

### 后端获取用户信息

后端获取到 `access_token` 和 `openid` 后，可进一步调用微信接口获取微信服务器上的用户信息（如昵称、头像、地区等）。

:::code-group

```js [接口封装]
const axios = require('axios');

/**
 * 通过 access_token 和 openid 获取微信用户信息
 * @param {string} accessToken - 接口调用凭证（access_token）
 * @param {string} openid - 用户唯一标识
 * @returns {Promise<Object>} - 包含用户信息的对象
 */
async function getWechatUserInfo(accessToken, openid) {
  try {
    // 构建请求 URL（lang=zh_CN 表示返回中文信息）
    const requestUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}&lang=zh_CN`;

    // 发起 GET 请求
    const response = await axios.get(requestUrl);
    const userInfo = response.data;

    // 校验返回结果
    if (userInfo.errcode) {
      throw new Error(
        `获取用户信息失败：${userInfo.errmsg}（错误码：${userInfo.errcode}）`
      );
    }

    // 返回用户信息
    return userInfo;
  } catch (error) {
    console.error('获取微信用户信息异常：', error.message);
    throw error;
  }
}
```

```js [调用示例]
const tokenInfo = await getWechatAccessToken(code);
const userInfo = await getWechatUserInfo(
  tokenInfo.access_token,
  tokenInfo.openid
);
console.log('用户信息：', userInfo);
```

:::
