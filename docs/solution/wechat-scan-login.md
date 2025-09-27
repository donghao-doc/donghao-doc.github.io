# 微信扫码登录

[网站应用微信登录开发指南](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)

## 准备工作

### 注册微信开放平台

1. **注册开发者账号**：访问 [微信开放平台](https://open.weixin.qq.com)，填写信息完成注册。企业开发者需准备营业执照等材料，个人开发者按对应要求操作，注册后需激活绑定邮箱。

2. **完善开发者资料**：填写企业/个人名称、联系方式等信息。

3. **开发者资质认证**：提交资质认证申请，需缴纳 300 元认证费用，审核周期通常为 1-2 个工作日，认证通过后方可进行后续操作。

4. **创建网站应用**：在管理中心选择 “创建网站应用”，填写应用名称、简介、官网地址，上传图标，提交审核后等待 7 个工作日左右的审核结果。

### 获取关键信息

1. **AppID 和 AppSecret**：应用审核通过后，在应用详情页可获取 AppID（应用唯一标识，公开可见）和 AppSecret（应用密钥）。二者是后续接口调用、身份验证的核心凭证，切勿泄露。

2. **配置授权回调域名**：在应用的 “开发设置” 中配置授权回调域名，需与实际业务中使用的回调地址域名完全一致（例如回调地址为 `https://demo.com/login/callback`，则域名配置为 `demo.com`），否则会导致授权流程失败。

### 理解 OAuth2.0 协议

微信登录基于 OAuth2.0 协议实现，该协议能让第三方应用（如 网站、APP）在不获取用户账号密码的情况下，经用户授权后访问用户在其他平台（如微信）的资源，兼顾安全与便捷。

在微信登录场景中，微信作为 “资源服务器” 存储用户数据，第三方应用（如目标网站）需通过 OAuth2.0 的 “授权码模式”（authorization-code）向微信发起授权请求，经用户授权后获取用户信息，整个流程通过服务端交互保障安全性。

## 授权流程

### 请求 CODE（前端）

1. **构建授权链接**：前端需生成微信授权二维码的访问链接，链接格式如下：

   ```
   https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect
   ```

   - `APPID`：替换为微信开放平台获取的应用 AppID。
   - `REDIRECT_URI`：授权后跳转的回调地址，需进行 URL 编码（例如 `https://demo.com/login/callback` 编码后为 ` https%3A%2F%2Fdemo.com``%2Flogin%2Fcallback `）。
   - `scope`：固定为`snsapi_login`（PC 端扫码登录专用，支持获取用户基本信息）。
   - `STATE`：自定义随机字符串，用于校验请求一致性（防止 CSRF 攻击），建议存储在用户 Session 中，回调时比对。

2. **用户授权与回调**：用户扫码并允许授权后，微信会自动重定向至 `REDIRECT_URI`，并在 URL 中携带 `code`（临时授权码，有效期 5 分钟，仅使用一次）和 `state` 参数，例如：

   ```
   https://demo.com/login/callback?code=CODE_VALUE&state=STATE_VALUE
   ```

### 通过 CODE 获取 access_token（后端）

通过前端传递的 `code`，向微信服务器请求 `access_token`（接口调用凭证）。

```js
const axios = require('axios');
const config = require('./config.js'); // 配置文件中包含 appId、appSecret

/**
 * 通过 code 获取微信 access_token
 * @param {string} code - 前端回调传递的临时授权码
 * @returns {Promise<Object>} - 包含 access_token、expires_in、refresh_token、openid、scope 等信息的对象
 */
async function getWechatAccessToken(code) {
  try {
    // 构建请求 URL（替换占位符为实际配置）
    const requestUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wechat.appId}&secret=${config.wechat.appSecret}&code=${code}&grant_type=authorization_code`;

    // 发起 GET 请求
    const response = await axios.get(requestUrl);
    const result = response.data;

    // 校验返回结果（微信返回错误时会包含 errcode 字段）
    if (result.errcode) {
      throw new Error(
        `获取access_token失败：${result.errmsg}（错误码：${result.errcode}）`
      );
    }

    // 返回成功数据（包含access_token、expires_in、refresh_token、openid、scope）
    return result;
  } catch (error) {
    console.error('获取微信access_token异常：', error.message);
    throw error; // 抛出错误，由调用方处理
  }
}

// 调用示例
router.get('/login/callback', async (req, res) => {
  const { code, state } = req.query;

  // 1. 校验state（与Session中存储的state比对，防止CSRF）

  // 2. 调用函数获取access_token
  const tokenInfo = await getWechatAccessToken(code);

  // 3. 后续操作（如获取用户信息、创建登录态等）
});
```

请求成功后，微信会返回以下 JSON 格式数据：

```json
{
  "access_token": "ACCESS_TOKEN", // 接口调用凭证，有效期 2 小时
  "expires_in": 7200, // access_token 有效期（秒）
  "refresh_token": "REFRESH_TOKEN", // 用于刷新 access_token 的凭证
  "openid": "OPENID", // 用户在当前应用的唯一标识
  "scope": "snsapi_login" // 用户授权的作用域
}
```

### 通过 access_token 获取用户信息（后端）

获取 `access_token` 和 `openid` 后，可进一步调用微信接口获取用户基本信息（如昵称、头像、地区等）。

```js
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

// 调用示例（在获取 access_token 后使用）
const tokenInfo = await getWechatAccessToken(code);
const userInfo = await getWechatUserInfo(
  tokenInfo.access_token,
  tokenInfo.openid
);
console.log('用户信息：', userInfo);
```

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

## 开发注意事项

### 域名与 URL 处理

- **回调域名严格匹配**：微信对授权回调域名的校验极为严格，需确保配置的域名与回调地址的域名完全一致（不含协议、端口、路径），例如配置 `demo.com`，则回调地址需为 `https://demo.com/xxx`，不可用 `https://www.demo.com/xxx` 或 `https://demo.com:8080/xxx`。

- **URL 编码工具**：Node.js 中可使用 `encodeURIComponent()` 方法对回调地址进行编码。

  ```js
  const redirectUri = encodeURIComponent('https://demo.com/login/callback');

  // 编码后的回调地址：
  // https%3A%2F%2Fdemo.com%2Flogin%2Fcallback
  ```

### 敏感信息安全

- **配置文件分离**：将 `appId`、`appSecret` 等敏感信息存放在单独的配置文件（如 `config.js`），并在 `.gitignore` 中排除该文件，避免提交至代码仓库。

  ```js
  // config.js
  module.exports = {
    wechat: {
      appId: '你的AppID',
      appSecret: '你的AppSecret',
      redirectUri: 'https://demo.com/login/callback', // 未编码的回调地址
    },
  };
  ```

- **access_token 存储**：`access_token` 有效期仅 2 小时，建议存储在 Redis 等缓存服务中（而非内存或数据库），并设置过期时间（略短于 7200 秒），避免频繁请求微信接口。

  ```js
  const Redis = require('ioredis');
  const redis = new Redis();

  // 存储 access_token（key 为 openid，value 为 access_token，过期时间 7000 秒）
  await redis.set(`wechat:access_token:${openid}`, accessToken, 'EX', 7000);

  // 获取 access_token
  const storedToken = await redis.get(`wechat:access_token:${openid}`);
  ```

### CSRF 防护与错误处理

- **STATE 参数校验**：发起授权请求时，生成随机 `state` 并存储在用户 Session 中，回调时比对 URL 中的 `state` 与 Session 中的 `state`，不一致则拒绝请求。

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
    const state = Math.random().toString(36).substr(2, 10); // 生成随机 state

    req.session.wechatState = state; // 存储到 Session

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

- **错误捕获与友好提示**：微信接口可能返回错误（如 `code` 过期、`access_token` 无效），需通过 `try/catch` 捕获错误，并向前端返回友好提示（如跳转至登录页并显示 “授权已过期，请重新扫码”）。

### 其他适配要点

- **HTTPS 协议要求**：微信登录的回调地址必须使用 HTTPS 协议（本地开发可使用 `ngrok` 将本地服务映射为 HTTPS 地址，例如 `ngrok http 3000`）。
- **接口频率限制**：微信开放平台对接口调用频率有上限（如 `access_token` 请求接口每分钟不超过 600 次）。

    ```js
    const rateLimit = require('express-rate-limit');

    // 限制 /login/callback 接口每分钟最多 10 次请求
    const callbackLimiter = rateLimit({ windowMs: 60 * 1000, max: 10 });

    app.use('/login/callback', callbackLimiter);
    ```

- **备用登录方式**：若用户未安装微信或微信版本过低，需提供账号密码、短信验证码等备用登录方式，避免影响用户体验。
