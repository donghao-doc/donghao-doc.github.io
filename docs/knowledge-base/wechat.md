# 微信生态

## openid 与 unionid

openid 是用户在单个微信应用（如公众号、小程序）中的唯一标识，而 unionid 是用户在整个微信开放平台下多个应用中的统一标识。

具体区别如下：

- **范围差异**：同一用户在不同微信应用（如 A 公众号和 B 公众号）的 openid 不同；但在同一开放平台下的所有应用，unionid 都相同。
- **用法不同**：openid 适合管单个应用的用户数据（比如记某公众号里用户的浏览记录）；unionid 适合跨应用用（比如多个小程序/公众号共用一套会员积分）。
- **获取区别**：普通小程序/公众号能直接拿到 openid，而 unionid，必须先把应用绑定到微信开放平台，且用户同意授权后才能获取。

## access token 与 refresh token

access token（访问令牌）用于向服务器证明用户身份和权限，refresh token（刷新令牌）用于在 access token 过期时，向服务器换取新的 access token，让用户无需重新登录就能继续访问。

主要区别：

- **有效期**：access token 有效期短，一般为几分钟到一小时；refresh token 有效期长，通常是几天到几个月。
- **存储要求**：access token 访问频率高，可存储在内存中，因为访问速度快；refresh token 因长期有效性和重要性，应存储在后端。
- **携带方式**：access token 需在每次请求时放在请求头 `Authorization` 字段中，refresh token 只在 access token 过期时向服务器请求刷新时携带。
