# 跨域问题详解

## 跨域原因

**同源**：协议、域名、端口三者必须完全一致。

**同源策略** 是浏览器的一种安全机制，限制不同源的网站之间进行无限制的资源访问或脚本交互，防止恶意网站通过脚本窃取其他网站的敏感数据（如 Cookie、本地存储等）。

**浏览器的 “同源策略” 是跨域问题产生的核心原因**，当前端发出的请求与后端接口地址不满足同源条件时，浏览器就会拦截接口请求，出现跨域错误。

常见的跨域场景：

- 协议不同：前端使用 `HTTP` 协议，后端使用 `HTTPS` 协议。
- 域名不同：前端部署在 `www.xxx.com`，后端部署在 `api.xxx.com`。
- 端口不同：前端运行在 `localhost:8080`，后端运行在 `localhost:3000`。

## 常见跨域解决方案

### 前端配置代理

在项目根目录的 `vite.config.js` 中配置 `server.proxy`。

```js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后端接口地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 去掉 '/api' 前缀
      }
    }
  }
});
```

### 后端配置 CORS

CORS（跨域资源共享）是 W3C 标准定义的跨域解决方案，通过后端在响应头中添加 `Access-Control-Allow-Origin` 等字段，告知浏览器 “允许前端的跨域请求”。

以 Node.js + Express 为例，配置方式如下：

:::code-group

```bash [安装 cors 中间件]
npm install cors
```

```js [app.js]
const express = require('express');
const cors = require('cors');
const app = express();

// 允许所有本地前端跨域请求（仅开发环境使用）
app.use(cors({
  origin: 'http://localhost:5173', // 前端开发服务器地址（如 Vue3 的 5173 端口）
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的请求方法
  allowedHeaders: ['Content-Type', 'Authorization'] // 允许的请求头
}));

// 或者更简单：允许所有源（开发环境临时用，生产环境禁止）
// app.use(cors());

// 后端接口示例
app.get('/api/user', (req, res) => {
  res.send({ name: 'test' });
});

app.listen(3000, () => {
  console.log('后端服务运行在 3000 端口');
});
```

:::

配置后，后端响应头会包含 `Access-Control-Allow-Origin` 等字段，浏览器识别到这些字段就会允许跨域请求。

### Nginx 反向代理

生产环境中，前端请求发送到 Nginx 服务器（与前端同源），Nginx 再将请求转发到后端服务，后端响应数据也通过 Nginx 返回给前端。浏览器只与 Nginx 交互，不直接与后端通信，而服务器与服务器之间没有 “同源策略” 限制，也就不存在跨域问题。

Nginx 优势是配置简单、兼容性强，支持所有请求方式（GET、POST、PUT 等），且能同时兼顾前端静态资源部署和跨域代理需求。

```nginx
# 反向代理：所有以 /api 开头的请求转发到后端 3000 端口
location /api/ {
    proxy_pass http://127.0.0.1:3000;  # 后端服务地址（服务器本地）
    
    # 传递请求头信息（必须配置，否则后端可能无法获取正确的客户端信息）
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### JSONP

JSONP 利用 `script` 标签不受同源策略限制的特性，通过动态创建 `script` 标签，将接口地址作为 `src` 属性值，并指定回调函数，后端返回该回调函数包裹的 JSON 数据，前端通过回调函数获取数据（需要前后端配合使用）。

JSONP 是传统方案，局限性大，仅支持 `GET` 请求（因为 `script` 标签只支持 `GET` 请求），且存在安全风险（可能遭受 XSS 攻击），已被 CORS 和 Nginx 反向代理替代，仅在兼容老旧浏览器场景下偶尔使用。

:::code-group

```js [前端实现]
// 提前定义好的回调函数
function handleData(data) {
  console.log('获取到的跨域数据：', data);
}

// 动态创建 script 标签
const script = document.createElement('script');
script.src = 'http://localhost:3000/api/users?callback=handleData';

// 将 script 添加到 body，发送 get 请求
document.body.appendChild(script);
```

```js [后端实现]
app.get('/api/users', (req, res) => {
  // 获取回调函数名
  const callback = req.query.callback;
  const data = { code: 200, data: [{ id: 1, name: '张三' }] };
  // 返回 `回调函数(data)` 格式的字符串
  // 前端 script 标签拿到返回内容，会将字符串当作脚本执行，回调函数就会在前端被调用
  res.send(`${callback}(${JSON.stringify(data)})`);
});
```

:::
