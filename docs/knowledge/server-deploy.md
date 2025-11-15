# 腾讯云服务器 + 宝塔面板 部署前后端项目

## 购买腾讯云服务器

1. 访问 [腾讯云](https://cloud.tencent.com/)，购买轻量应用服务器。
2. **应用模板**：选择 “宝塔 Linux 面板”。
3. **地域**：选择离目标用户近的。
4. **配置选择**：“1核2G” 适合个人项目，“2核4G” 适合小型项目。
5. **登录方式**：密码登录。
6. 购买后，在 “腾讯云控制台 - 轻量应用服务器” 中可查看服务器。

## 登录宝塔面板

1. 腾讯云控制台找到服务器并点击进入，打开 “应用管理”，登录宝塔面板。
2. 首次登录会提示安装 “推荐套件”，不要安装！后续再按需安装。

:::tip
宝塔默认登录端口是 `8888`，若无法访问，需在服务器安全组（防火墙）中放开 `8888` 端口。
:::

## 配置数据库

### 创建数据库

- 宝塔面板左侧菜单选择 “数据库”，点击 “添加数据库”。
- 数据库名：自定义（建议小写 + 下划线，如 `my_project_db`）。
- 字符集：选择 `utf8mb4`（默认，支持中文和 emoji）。
- 用户名：自定义，如 `remote_user`。
- 访问权限：
  - 暂时设置为 “所有人”，允许任何 IP 地址连接该数据库，方便本地开发连接。
  - 生产环境：将数据库权限从 “所有人” 改为 “本地服务器（`127.0.0.1`）”，避免恶意访问。

### 放开数据库端口

服务器安全组（防火墙），添加规则：

- 应用类型：选 “MySQL（3306）”。
- 来源：“全部IPv4地址（`0.0.0.0/0`）”，允许所有 IP 访问。
- 协议/端口：`TCP/3306`，MySQL 默认端口就是 3306。

### 本地连接数据库

- 打开 [DataGrip](https://www.jetbrains.com/datagrip/)。
- 主机、端口：服务器公网 IP、3306。
- 用户、密码：服务器的用户名、密码。
- 数据库：数据库名。
- 点击 “测试连接”。

## 本地开发跨域问题

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

前端调用接口示例：`fetch('/api/user')`。

### 后端配置 CORS

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

## 上传前后端项目文件

:::tip

不要上传 `node_modules`，可以在服务器上安装依赖。

- 一是因为目录体积太大。
- 二是该目录中包含环境依赖，不同操作系统（如本地 Windows/服务器 Linux）可能存在兼容问题，需在服务器重新安装。

:::

1. 宝塔面板左侧菜单 “文件”，进入 `/www/wwwroot`目录（宝塔默认网站根目录）。
2. 新建项目目录及前后端目录，如 `my-project/backend`、`my-project/frontend`，将前后端代码上传至相应目录（前端上传的应是打包后的 `dist` 目录中的文件）。

## 部署后端 Node 项目

1. **安装项目依赖**：宝塔面板 “终端” 进入后端项目目录，安装依赖。
2. **创建 Node 项目**：

   - 宝塔左侧菜单 “网站 - Node项目 - 添加项目 - 默认项目”。
   - 项目目录：选择后端代码所在目录。
   - 项目端口：自定义（如 `3000`）。
   - 绑定域名：不填写。

3. **放开后端端口**：服务器安全组添加规则，来源 `0.0.0.0/0`，端口填 `3000`。
4. **启动并测试后端**：

   - 启动 Node 项目，推荐使用 PM2 管理进程，点击 “PM2 监控”，确保项目状态为 “online”。
   - 用 [Apifox](https://apifox.com/) 测试接口。

:::tip
- PM2 是 Node.js 进程管理工具，可自动重启崩溃的项目，确保服务持续运行，比 `node app.js` 更可靠。
- 若 PM2 启动项目失败，可尝试在终端中使用 PM2，如 `pm2 start app.js --name todo-list`。
:::

## 部署前端项目

1. **创建 HTML 项目**：

   - 宝塔左侧菜单 “网站 - HTML项目 - 添加项目”。
   - 绑定域名：填写域名或服务器公网 IP。
   - 根目录：选择前端代码所在目录。

2. **放开前端端口**：`80` 端口是 HTTP 默认端口，服务器通常默认放开，若无法访问需手动放行。
3. **测试前端页面**：浏览器访问公网 IP 或域名。

## Nginx 反向代理

前端运行在 `80` 端口，后端在 `3000` 端口，会产生跨域问题或接口 404。

反向代理原理：前端请求 `/api/xxx` 时，Nginx 会自动转发到 `http://127.0.0.1:3000/api/xxx`，对浏览器而言，请求的仍然是 `80` 端口（与前端同端口），因此就不存在跨域问题。

### 配置反向代理

“HTML项目 - 设置 - 配置文件”，在 `server` 中添加以下代码（放在 `location / {}` 下方）。

```nginx
# 反向代理：所有以 /api 开头的请求转发到后端 3000 端口
location /api/ {
    proxy_pass http://127.0.0.1:3000;  # 后端服务地址（服务器本地）
    
    # 传递请求头信息（必须配置，否则后端可能无法获取正确的客户端信息）
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # 超时设置（避免请求因超时失败）
    proxy_connect_timeout 300s;
    proxy_read_timeout 300s;
}
```

:::tip
根据 nginx 配置，前端代码中的请求路径应为 `/api/xxx`（如 `fetch('/api/user')`），不需要带协议、域名、端口。
:::

:::warning
若代理后接口 404，检查：

- `proxy_pass` 地址是否正确（尝试在 `http://127.0.0.1:3000` 末尾添加或去掉 `/`）。
- 前端请求路径是否以 `/api` 开头。
:::
