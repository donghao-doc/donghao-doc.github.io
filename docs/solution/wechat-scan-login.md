# 微信扫码登录

[网站应用微信登录开发指南](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)

:::tip 快速登录功能
PC 端微信 3.9.11（Win）/4.0.0（Mac）及以上版本支持快速登录，无需扫码直接在客户端确认登录。
:::

## 接入准备

- 在 [微信开放平台](https://open.weixin.qq.com) 注册开发者账号，创建“网站应用”并通过审核。
- 获取 `AppID`、`AppSecret`，申请“微信登录权限”并通过审核。
- **配置授权回调域名**：在应用的 “开发设置” 中配置授权回调域名，需与实际业务中使用的回调地址域名完全一致（例如回调地址为 `https://demo.com/login/callback`，则域名配置为 `demo.com`），否则会导致授权流程失败。

## 授权流程概述

1. 网站发起微信授权登录，用户授权后微信携带临时 `code` 跳转回网站。
2. 网站以 `code` + `AppID` + `AppSecret` 调用微信开放平台接口获取 `access_token`。
3. 网站使用 `access_token` 调用微信开放平台接口，获取用户信息，完成授权。

:::tip OAuth 2.0 协议
微信登录基于 OAuth2.0 协议实现，该协议能让第三方应用（网站、APP）在不获取用户账号密码的情况下，经用户授权后访问用户在其他平台（如微信）的资源。

在微信扫码登录场景中，微信作为“资源服务器”存储用户数据，第三方应用需通过 OAuth2.0 的 “授权码模式”（`authorization_code`）向微信服务器发起授权请求，经用户授权后即可获取用户信息。
:::

## 步骤拆解

### 1. 请求 CODE（前端）

#### 第一种方式：跳转链接

前端跳转到以下页面链接，该页面中包含了二维码，用户扫码授权后，该页面会跳转到 `redirect_uri?code=CODE&state=STATE`。

```text
https://open.weixin.qq.com/connect/qrconnect?
  appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect
```

核心参数：

- `appid`（必填）：网站应用唯一标识。
- `redirect_uri`（必填）：授权后跳转的回调地址，需进行 URL 编码，域名须与开放平台中配置的授权回调域名一致。
- `response_type`（必填）：固定值 `code`。
- `scope`（必填）：网页扫码登录固定为 `snsapi_login`。
- `state`（推荐）：回传状态防止 CSRF，可用随机数 + session 生成。

#### 第二种方式：网页内嵌二维码

```html
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

**用户授权后，页面会自动跳转回 redirect_uri，前端可从 url 中获取 `code`，再将 `code` 发送给网站的后端。**

### 2. 获取 access_token（后端）

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

请求成功后，微信服务器会返回以下 JSON 格式数据：

```json
{
  "access_token": "ACCESS_TOKEN", // 接口调用凭证，有效期 2 小时
  "expires_in": 7200, // access_token 有效期（秒）
  "refresh_token": "REFRESH_TOKEN", // 用于刷新 access_token 的凭证
  "openid": "OPENID", // 用户在当前应用的唯一标识
  "scope": "snsapi_login", // 用户授权的作用域
}
```

#### 刷新 access_token

`access_token` 有效期约 2 小时，`refresh_token` 有效期 30 天。

若 `access_token` 过期，可使用 `refresh_token` 获取新的 `access_token`。

请求地址：

```text
https://api.weixin.qq.com/sns/oauth2/refresh_token?
  appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN
```

:::tip
若 `refresh_token` 失效，则需要用户重新授权登录。
:::

### 3. 获取用户信息（后端）

网站后端获取到 `access_token` 和 `openid` 后，可进一步调用微信接口获取微信服务器上的用户信息（如昵称、头像、地区等）。

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

返回数据示例：

```json
{
  "openid": "OPENID", // 用户唯一标识
  "nickname": "微信昵称",
  "sex": 1, // 性别（1-男性，2-女性，0-未知）
  "province": "广东省",
  "city": "深圳市",
  "country": "中国",
  "headimgurl": "https://wx.qlogo.cn/xxx", // 用户头像 URL（5 种尺寸，可拼接参数调整）
  "privilege": [] // 用户特权信息（普通用户为空数组）
}
```

## 安全要点

- 微信服务器返回的 `access_token`、`refresh_token` 属于敏感数据，切勿直接返回给前端。
- **access_token 存储**：`access_token` 有效期仅 2 小时，建议存储在 Redis 等缓存服务中（而非内存或数据库），并设置过期时间（略短于 7200 秒），避免频繁请求微信接口。

  ```js
  const Redis = require('ioredis');
  const redis = new Redis();
  
  // 存储 access_token（key 为 openid，value 为 access_token，过期时间 7000 秒）
  await redis.set(`wechat:access_token:${openid}`, accessToken, 'EX', 7000);
  
  // 获取 access_token
  const storedToken = await redis.get(`wechat:access_token:${openid}`);
  ```

- **state 参数校验**：发起授权请求时，生成随机 `state` 并存储在用户 Session 中，回调时比对 URL 中的 `state` 与 Session 中的 `state`，不一致则拒绝请求，防止 CSRF。

  ```js
  const session = require('express-session');
  const app = require('express')();

  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    })
  );

  // 发起授权请求的接口
  app.get('/login/wechat', (req, res) => {
    // 生成随机 state
    const state = Math.random().toString(36).substr(2, 10);

    // 存储到 Session
    req.session.wechatState = state;

    const redirectUri = encodeURIComponent(config.wechat.redirectUri);

    const authUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${config.wechat.appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=${state}#wechat_redirect`;

    res.redirect(authUrl);
  });

  // 回调接口
  app.get('/login/callback', async (req, res) => {
    const { code, state } = req.query;

    // 校验 state
    if (state !== req.session.wechatState) {
      return res.status(403).send('CSRF 校验失败');
    }

    // 后续流程...
  });
  ```

## 其他

- **HTTPS 协议要求**：微信登录的回调地址必须使用 HTTPS 协议（本地开发可使用 `ngrok` 将本地服务映射为 HTTPS 地址，例如 `ngrok http 3000`）。
- **接口频率限制**：微信开放平台对接口调用频率有上限（如 `access_token` 请求接口每分钟不超过 600 次）。

  ```js
  const rateLimit = require('express-rate-limit');
  
  // 限制 /login/callback 接口每分钟最多 10 次请求
  const callbackLimiter = rateLimit({ windowMs: 60 * 1000, max: 10 });
  
  app.use('/login/callback', callbackLimiter);
  ```

- **备用登录方式**：若用户未安装微信或微信版本过低，需提供账号密码、短信验证码等备用登录方式，避免影响用户体验。
