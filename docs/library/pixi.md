# PixiJS

PixiJS 是一个超快的 2D **渲染引擎**，它拥有强大的图片渲染能力和场景图技术，可用于制作动画、炫酷的交互、简单的小游戏等。

:::warning

PixiJS 不是游戏引擎。

:::

[中文教程](https://pixijs.huashengweilai.com/guide/start/1.introduction.html) |
[官方文档](https://pixijs.download/v7.x/docs/index.html) |
[官方示例](https://pixijs.com/7.x/examples) |
[Vue3 Pixi](https://www.npmjs.com/package/vue3-pixi?activeTab=readme)

## 安装和使用

```bash
npm install pixi.js
```

```ts
import * as PIXI from 'pixi.js';
```

## 最简单的流程

显示图片到页面：

1. 创建**舞台**，将舞台添加到页面。
2. 使用**加载器**，加载图像到**纹理缓存**。
3. 以纹理创建**精灵**，将精灵添加到舞台。
4. **操作精灵**的位置、大小、旋转、缩放等。

## 舞台（stage）

舞台是一个**根容器**对象，任何要用 Pixi 显示的东西都要添加到舞台上。

```ts
// 创建 Pixi 应用（舞台）
const app = new PIXI.Application({
  width: 256,         // default: 800 宽度，单位 px
  height: 256,        // default: 600 高度，单位 px
  antialias: true,    // default: false 反锯齿，可以让字体和图形边缘更平滑
  transparent: false, // default: false 透明度，使 canvas 背景透明
  resolution: 1       // default: 1 分辨率，让图形在不同分辨率和像素密度下有较好的展示
});

// 把舞台添加到 body 中
document.body.appendChild(app.view);
```

`PIXI.Application` 会在页面上创建 canvas 元素，并且会自动选择使用 Canvas 模式或 WebGL 模式来渲染图形，这取决于浏览器支持哪一种方式。

它会优先使用 WebGL 模式，如果要强制使用 Canvas 模式，可以在配置对象中设置 `forceCanvas: true`。
