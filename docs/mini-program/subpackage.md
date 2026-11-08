# 分包加载

将不同模块的页面、资源拆成多个包，使用时按需加载，减少首次启动需要下载的资源。

## 主包与分包

| 类型   | 常见内容与用途                  |
|------|--------------------------|
| 主包   | 默认启动页面、tabBar 页面、公共资源和脚本 |
| 普通分包 | 按模块划分的页面与资源，例如商品列表、商品详情  |
| 独立分包 | 可以不依赖主包运行的功能，例如独立活动页     |

包大小限制：

- 整个小程序的主包与分包总大小不超过 **30M**。
- 单个主包或分包不超过 **2M**。

## 普通分包

### 配置 subPackages

:::code-group

```text [分包目录结构]
小程序源码根目录/
├── app.js
├── app.json
├── app.scss
├── pages/
│   └── index/
├── assets/
└── modules/
    └── goods/
        └── pages/
            ├── list/
            └── detail/
```

```json [app.json 配置分包]
{
  "pages": [
    "pages/index/index"
  ],
  "subPackages": [
    {
      "root": "modules/goods", // 分包根目录
      "name": "goods",         // 分包别名，预下载时可以使用
      "pages": [               // 分包包含哪些页面
        "pages/list/list",
        "pages/detail/detail"
      ]
    }
  ]
}
```

:::

### 跳转到分包页面

跳转路径要包含完整的分包根目录：

```jsx
<navigator url="/modules/goods/pages/list/list">进入商品列表</navigator>

// 也可以携带查询参数，在目标页面的 onLoad(options) 中获取
wx.navigateTo({ url: '/modules/goods/pages/detail/detail?id=1001' })
```

## 独立分包

在 `app.json` 的分包配置项中添加 `independent: true`，表示独立分包。

```json
{
  "subPackages": [
    {
      "root": "modules/market",
      "name": "market",
      "pages": [
        "pages/market/market"
      ],
      "independent": true
    }
  ]
}
```

一个小程序可以有多个独立分包。

独立分包可以独立运行，不依赖主包和其他分包。

## 打包、加载、引用

打包原则：

- `subPackages` 配置的目录属于分包。
- 最外层 `pages` 中的页面属于主包，tabBar 页面必须在主包，分包目录之外的内容纳入主包。

加载顺序：

- 从主包页面启动，先加载主包，再按需加载分包。
- 从普通分包页面启动，先加载主包，再加载分包。
- 从独立分包页面启动，不加载主包和其他分包，后续进入主包或普通分包页面，才需要加载主包和对应分包。

主包、分包之间的资源引用：

- 主包不能引用分包中的代码、组件或资源。
- 普通分包可以引用主包的公共资源，但不能引用另一个分包的资源。
- 独立分包不能引用主包或其他分包的资源。

## 分包预下载

提前下载用户可能访问的分包，减少真正访问时的加载时间。

在 `app.json` 中通过 `preloadRule` 进行配置。

```json
{
  "preloadRule": {
    // 首页，预下载分包
    "pages/index/index": {  // 触发预下载的页面路径
      "network": "all",     // 不限网络类型
      "packages": ["goods"] // 要预下载的包，可以写分包的 name
      // "packages": ["modules/goods"] // 也可以写分包的 root
    },
    // 独立活动页，预下载主包
    "modules/market/pages/market/market": {
      "network": "wifi", // 默认值，仅 wifi 下预下载
      "packages": ["__APP__"] // 主包的标记，可供独立分包预下载主包
    }
  }
}
```

:::tip
- 预下载不是越多越好，应根据用户可能访问的功能进行配置。
- 预下载没有完成时，实际跳转仍可能要等待剩余代码包下载。
:::
