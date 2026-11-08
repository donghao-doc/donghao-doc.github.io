# npm 支持

## 安装与构建 npm 包

```bash
# 已有 package.json 时不需要重新初始化
npm init -y

# 安装依赖
npm install @vant/weapp
```

`node_modules` 不直接参与小程序的编译、上传和打包，安装依赖后，还要在微信开发者工具中点击“工具 → 构建 npm”，生成 `miniprogram_npm`。

:::warning
不是所有 npm 包都能使用，比如依赖 DOM 的包，使用时要注意是否兼容小程序。
:::

## 自定义构建 npm

:::tip
默认构建时，`package.json`、`node_modules`、`miniprogram_npm` 在同级目录，都在 `miniprogramRoot` 中。
:::

将工程配置、依赖与小程序源码分开，目录更容易维护。

:::code-group

```text [目录结构维护]
工程根目录/
├── project.config.json
├── package.json
├── package-lock.json
├── node_modules/
└── miniprogram/                 # 小程序源码根目录
    ├── app.js
    ├── app.json
    ├── app.scss
    ├── assets/
    ├── pages/
    └── miniprogram_npm/         # 构建 npm 后生成
```

```json [project.config.json 中的配置]
{
  // 指定小程序源码根目录
  "miniprogramRoot": "miniprogram/",
  "setting": {
    // 开启手动配置 npm 构建路径
    "packNpmManually": true,
    // 指定依赖来源与输出位置
    "packNpmRelationList": [
      {
        // package.json 的位置
        "packageJsonPath": "./package.json",
        // 指定输出 miniprogram_npm 的目录
        "miniprogramNpmDistDir": "./miniprogram/",
      }
    ]
  }
}
```

:::

## Vant Weapp 组件的使用

[快速上手](https://vant.pro/vant-weapp/#/quickstart) | 
[样式覆盖](https://vant.pro/vant-weapp/#/custom-style) |
[定制主题](https://vant.pro/vant-weapp/#/theme)
