# 移动端适配

## meta viewport

:::code-group
```html [淘宝的 meta viewport]
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
```
:::

## rem 适配方案

### 核心原理

- JS 根据屏幕宽度动态设置根元素（`html`）的 `font-size`，让 `rem` 单位随屏幕宽度等比例变化。
- 开发时写 `px` 单位，通过 PostCSS 插件自动转换为 `rem`。

### 实现步骤

1. 安装并配置 [PostCSS](https://github.com/cuth/postcss-pxtorem)，将 `px` 转成 `rem`。

    :::code-group
    
    ```bash [安装]
    npm install postcss postcss-pxtorem
    ```
    
    ```ts [postcss.config.ts]
    export default {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 37.5, // 设计稿宽度的 1/10（375px/10=37.5）
          propList: ['*'], // 需要转换的 CSS 属性，* 表示全部
          exclude: /node_modules/i, // 排除第三方库（如 UI 组件库）
          minPixelValue: 1 // 最小转换像素值，小于 1px 不转换
        }
      }
    }
    ```
    
    :::

2. 动态设置根元素字体大小。

    方式一：手写 JS 计算逻辑。
    
    ```js
    // 动态计算并设置 html 的 font-size
    function setRemUnit() {
      const docEl = document.documentElement;
      // 获取视口宽度，限制最大宽度避免大屏设备元素过大
      const width = Math.min(docEl.clientWidth, 750);
      docEl.style.fontSize = (width / 10) + 'px';
    }
    
    // 初始化执行
    setRemUnit();
    
    // 监听屏幕旋转、窗口大小变化时重新计算
    window.addEventListener('resize', setRemUnit);
    
    // 监听页面从缓存中唤醒时重新计算
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) setRemUnit();
    });
    ```
    
    方式二：使用 [lib-flexible](https://github.com/amfe/lib-flexible)。

    :::code-group
    
    ```bash [安装]
    npm install amfe-flexible
    ```
    
    ```ts [main.ts 引入]
    import 'amfe-flexible/index.js'
    ```
    
    :::

## vw 适配方案

### 核心原理

- 将设计稿尺寸按比例转换为 CSS 原生支持的视口单位（`vw`），纯 CSS 层面实现适配。
- 开发时写 `px`，通过 PostCSS 自动转换为 `vw`。

### 实现步骤

安装并配置 [PostCSS](https://github.com/evrone/postcss-px-to-viewport)，将 `px` 转换为 `vw`。

:::code-group

```bash [安装]
npm install postcss-px-to-viewport
```

```ts [postcss.config.ts]
export default {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 待转换的单位（默认 px）
      viewportWidth: 375, // 设计稿宽度（必须与设计稿一致）
      unitPrecision: 6, // 转换后的精度（保留 6 位小数）
      propList: ['*'], // 需要转换的 CSS 属性
      viewportUnit: 'vw', // 目标转换单位
      fontViewportUnit: 'vw', // 字体的目标转换单位
      selectorBlackList: ['.ignore', '.hairlines'], // 忽略转换的类名
      minPixelValue: 1, // 最小转换像素值
      mediaQuery: false, // 是否转换媒体查询中的 px
      exclude: /node_modules/i, // 排除第三方库
      landscape: false // 是否处理横屏场景
    }
  }
}
```

:::

## 1px 边框问题

原因：物理像素（屏幕上的实际像素点）与 CSS 像素（写 CSS 时的 px 单位）不匹配。

- 在普通屏（dpr = 1）上：1 个 CSS 像素 = 1 个物理像素，视觉上 1px 就是 1px 的细边框。
- 在高清屏（dpr = 2）上：1 个 CSS 像素 = 2 个物理像素，视觉上 1px 就是 2px 的粗边框。

:::tip

dpr 是“设备像素比”，`dpr = 物理像素宽度 / CSS 像素宽度`。

如 iPhone 6/7/8（Retina 屏），`dpr = 750（物理宽度）/ 375（CSS 宽度）= 2`。

:::

实现：利用 **伪元素 + 缩放** 实现 1px 精细边框。

```scss
.card {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: 200%;
    height: 200%;
    border: 1px solid red;
    transform: scale(0.5);
    transform-origin: 0 0;
    pointer-events: none;
  }
}
```

## 大屏适配限制

在平板等大屏设备上，可通过媒体查询固定最大宽度（如 `max-width: 750px`），rem 方案还需要限制根元素字体大小，避免元素过大。

```scss
@media (min-width: 750px) {
  html {
    // !important 覆盖 JS 动态设置
    font-size: 75px !important;
  }

  #root {
    max-width: 750px;
    margin: 0 auto;
  }
}
```
