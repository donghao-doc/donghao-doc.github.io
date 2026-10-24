# 小程序配置

| 文件                            | 常见用途                   |
|-------------------------------|------------------------|
| `app.json`                    | 注册小程序、设置窗口样式、配置 tabBar |
| 页面 `.json`                    | 设置页面标题、下拉刷新、引用组件等      |
| `project.config.json`         | 团队公共配置                 |
| `project.private.config.json` | 个人私有配置                 |
| `sitemap.json`                | 配置哪些页面允许被微信索引（SEO）     |

## app.json

### pages

- `pages` 指定小程序的页面路由。
- `entryPagePath` 指定小程序的**启动页面**。

:::tip
若未配置 `entryPagePath`，默认以 `pages` 的第一项为首页。
:::

```json
{
  "entryPagePath": "pages/index/index",
  "pages": [
    "pages/list/list",
    "pages/index/index"
  ]
}
```

### window

`window` 用于配置小程序的**状态栏、导航条、标题、窗口背景色**等。

```json5
{
  "window": {
    "navigationBarTitleText": "标题",           // 导航栏标题
    "navigationBarBackgroundColor": "#F3514F", // 导航栏背景色
    "enablePullDownRefresh": true,             // 开启下拉刷新
    "backgroundTextStyle": "dark",             // 下拉 loading 的样式
    "backgroundColor": "#EFEFEF",              // 窗口的背景色
  }
}
```

### tabBar

`tabBar` 用来定义小程序**顶部和底部的 tab 栏**，点击 tab 栏可以跳转页面。

:::tip
- `list` 最少配置 2 个 tab，最多配置 5 个 tab。
- `position: top`，tabBar 如果配置在顶部，icon 不会展示。
:::

```json
{
  "tabBar": {
    "position": "bottom",
    "borderStyle": "black",
    "backgroundColor": "#EFEFEF",
    "color": "#666666",
    "selectedColor": "#F3514F",
    "list": [
      {
        "text": "首页",
        "pagePath": "pages/index/index",
        "iconPath": "/assets/tab/index.png",
        "selectedIconPath": "/assets/tab/index_active.png"
      },
      {
        "text": "分类",
        "pagePath": "pages/cate/cate",
        "iconPath": "/assets/tab/cate.png",
        "selectedIconPath": "/assets/tab/cate_active.png"
      }
    ]
  }
}
```

## 页面配置

`页面.json` 配置当前页面的窗口样式。

:::tip
页面配置会覆盖全局配置的相同配置项。
:::

```json
{
  "navigationBarTitleText": "商品分类",
  "navigationBarBackgroundColor": "#F3514F",
  "enablePullDownRefresh": true,
  "backgroundTextStyle": "light"
}
```

## 项目配置

### 公共配置与个人配置

| 文件                            | 描述                             |
|-------------------------------|--------------------------------|
| `project.config.json`         | 团队公共配置，尤其是影响最终编译产物的配置，应提交到 git |
| `project.private.config.json` | 个人私有配置，优先于公共配置，不应提交到 git       |

:::tip
开发者工具中通常会勾选**「将 JS 编译成 ES5」**、**「不校验合法域名」**等配置项，这些配置会自动同步到相应的配置文件中。
:::

### 启用 SCSS、TS

开发者工具内置了 Sass、TypeScript 编译插件，在 `project.config.json` 中配置即可，无需安装 npm 包。

```json5
{
  "setting": {
    // 开启 SCSS 和 TypeScript 编译
    "useCompilerPlugins": ["sass", "typescript"]
  }
}
```

开发者工具会将 `.scss`、`.ts` 编译成小程序可用的 `.wxss`、`.js`。

:::tip
建议通过官方 TS 模板创建项目，它会自带 `typings/types/wx` 类型声明文件，也省去了额外的配置和安装相关 npm 依赖。
:::

## sitemap.json

`sitemap.json` 用于声明哪些页面允许被微信索引（SEO）。

- `action`：`allow` 表示允许索引，`disallow` 表示禁止索引。
- `page`：页面路径，`*` 表示所有页面。

```json
{
  "rules": [
    {
      "action": "allow",
      "page": "pages/index/index"
    },
    {
      "action": "disallow",
      "page": "*"
    }
  ]
}
```

以上规则表示，允许首页被索引，其他页面都禁止索引。
