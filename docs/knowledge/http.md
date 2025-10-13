# HTTP

## HttpOnly Cookie

由于 HttpOnly Cookie 的安全性设计，浏览器无法通过 `document.cookie` 读取 HttpOnly Cookie，也无需前端手动处理，浏览器会自动在请求中携带该 Cookie。

HttpOnly Cookie 由服务端往 cookie 中存储和读取，用于防御 XSS 攻击。

1. 服务端通过 HTTP 响应头 `Set-Cookie` 将 Refresh Token 写入 HttpOnly Cookie。

    ```js
    // 登录接口：验证成功后设置 Refresh Token 到 HttpOnly Cookie
    app.post('/login', (req, res) => {
      const { username, password } = req.body;
      
      // 验证通过，生成 Refresh Token
      const refreshToken = generateRefreshToken(username);
      
      // 设置 HttpOnly Cookie
      res.cookie('refreshToken', refreshToken, {
        // 核心：标记为 HttpOnly，禁止 JS 访问
        httpOnly: true,
        // 仅在 HTTPS 连接下才会发送该 Cookie（生产环境必须启用）
        secure: process.env.NODE_ENV === 'production',
        // 限制跨站请求携带 Cookie，防御 CSRF
        sameSite: 'strict',
        // 设置 Cookie 有效期（与 Refresh Token 有效期保持一致）
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      
      // 同时返回 Access Token
      const accessToken = generateAccessToken(username);
      res.json({ accessToken });
    });
    ```

2. 当需要刷新 Access Token 时，浏览器会自动将该 Cookie 携带到请求中（无需前端手动处理），服务端从请求中读取即可。

    ```js
    // 刷新 Access Token 的接口
    app.post('/refresh-token', (req, res) => {
      // 从请求的 Cookie 中读取 Refresh Token（浏览器自动携带）
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh Token 不存在' });
      }
      
      // 验证 Refresh Token 有效性
      const isValid = verifyRefreshToken(refreshToken);
      if (!isValid) {
        return res.status(403).json({ message: 'Refresh Token 无效' });
      }
      
      // 验证通过，生成新的 Access Token 并返回
      const newAccessToken = generateAccessToken(username);
      res.json({ accessToken: newAccessToken });
    });
    ```
