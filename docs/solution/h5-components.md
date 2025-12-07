# 从 0 搭建 H5 业务组件库

[GitHub](https://github.com/donghao-doc/h5-components-mkt)

## 初始化项目

创建项目，项目名称如 h5-components-mkt。

```shell
pnpm create vue@latest
```

将 `src` 目录重命名为 `playground`，与正常项目目录区分开，方便开发组件时进行测试。

在 `playground` 中新增组件测试页面及路由。

## 组件开发

在项目根目录创建 `lib/components` 目录，用于存放组件、hook、utils 源码。

创建 `lib/index.ts`，作为组件库入口，用于导出组件、hook、utils。

在 `index.ts` 中使用分别导出，以支持按需引入。

:::code-group

```ts [lib/index.ts]
// 引入组件及类型
import QpsError, { type QpsErrorProps } from './components/QpsError.vue'

// 导出组件及类型
export { QpsError, type QpsErrorProps }
```

```vue [使用组件]
<script setup lang="ts">
// 开发时引入本地的组件进行测试
import { QpsError, type QpsErrorProps } from '../../lib'

// 发布到 npm 并安装组件库后，正式使用
// import { QpsError, type QpsErrorProps } from 'h5-components-mkt'
</script>
```

:::

## 移动端适配

使用本组件库之前，开发者的项目应已完成移动端适配（可在组件库文档中提醒）。

移动端适配可参考以下方案：

```bash
# 安装
pnpm i postcss-px-to-viewport
```

:::code-group

```html [index.html]
<meta
  name="viewport"
  content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
/>
```

```js [postcss.config.js]
export default {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 需要转换的单位
      viewportWidth: 375, // 设计稿的视口宽度
      unitPrecision: 5, // 单位转换后保留的精度
      propList: ['*'], // 能转化为 vw 的属性列表
      viewportUnit: 'vw', // 希望使用的视口单位
      fontViewportUnit: 'vw', // 字体使用的视口单位
      selectorBlackList: [], // 需要忽略的 CSS 选择器，不会转为视口单位，使用原有的 px 等单位
      minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
      mediaQuery: false, // 媒体查询里的单位是否需要转换单位
      replace: true, // 是否直接更换属性值，而不添加备用属性
      exclude: [/node_modules\/vitepress/], // 不转换 vitepress 的样式，让组件库文档在 PC 端正常展示
      include: undefined, // 如果设置了 include，那将只有匹配到的文件才会被转换
      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件
      landscapeUnit: 'vw', // 横屏时使用的单位
      landscapeWidth: 375 // 横屏时使用的视口宽度
    },
  },
};
```

:::

:::warning
组件库依赖了 Vant，所以不可直接排除 `node_modules`，否则 Vant 的样式不生效。这里只是排除了 `node_modules/vitepress`，不转换组件库文档的样式单位，以保持文档在 PC 端可用。
:::

## 打包组件库源码

组件库依赖了 `Vant`、`@vant/area-data`，打包时使用了 Vant 文档中的 [按需引入组件样式](https://vant-ui.github.io/vant/#/zh-CN/quickstart#fang-fa-er.-an-xu-yin-ru-zu-jian-yang-shi) 的相关配置，建议组件使用者也采用同样的配置引入 Vant 相关依赖。

:::code-group

```ts [vite.lib.config.ts]
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    dts({
      include: ['lib/**/*.ts', 'lib/**/*.d.ts', 'lib/**/*.vue'],
      outDir: 'dist/types',
      tsconfigPath: 'tsconfig.lib.json',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(cwd(), 'lib'),
    },
  },
  build: {
    lib: {
      entry: resolve(cwd(), 'lib/index.ts'),
      name: 'H5Components',
      fileName: (format) => `h5-components.${format}.js`,
      formats: ['es', 'umd'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['vue', 'vue-router', 'vant', '@vant/area-data'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vant: 'vant',
          '@vant/area-data': 'VantAreaData',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css' || assetInfo.name === 'index.css') {
            return 'index.css'
          }
          return assetInfo.name || 'asset-[hash]'
        },
        exports: 'named',
      },
    },
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: true,
  },
})
```

```json [tsconfig.lib.json]
{
  "extends": "@vue/tsconfig/tsconfig.json",
  "include": [
    "env.d.ts",
    "lib/**/*",
    "lib/**/*.vue"
  ],
  "exclude": [
    "dist",
    "node_modules",
    "playground"
  ],
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist/types",
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.lib.tsbuildinfo",
    "skipLibCheck": true,
    "paths": {
      "@/*": [
        "./lib/*"
      ]
    }
  }
}
```

```json [tsconfig.json]
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    }
  ]
}
```

```json [package.json]
{
  "scripts": {
    // 配置打包脚本
    "build:lib": "vite build -c vite.lib.config.ts",
  }, 
}
```

:::

## npm 发布

每次要发布组件库新版本时，记得修改 package.json 中的版本号。

package.json 关于组件库的配置如下：

```json
{
  "name": "h5-components-mkt",
  "version": "0.0.6",
  "private": false,
  "type": "module", // 使用 ESM 模块格式
  "main": "dist/h5-components.umd.js", // CommonJS/UMD 入口
  "module": "dist/h5-components.es.js", // ESM 入口
  "types": "dist/types/lib/index.d.ts", // 类型声明入口
  "exports": {
    ".": { // 包的默认入口
      // 当使用者使用 import 语法时，指向 ES 模块版本
      "import": "./dist/h5-components.es.js",
      // 当使用者使用 require() 函数时，指向 UMD 版本（兼容 CommonJS）
      "require": "./dist/h5-components.umd.js",
      // 为整个库指定类型声明文件
      "types": "./dist/types/lib/index.d.ts",
      // 默认样式入口，便于 tree-shaking 时保留
      "style": "./dist/index.css"
    },
    "./style.css": "./dist/index.css" // 支持直接按路径导入样式
  },
  "files": [
    "dist"
  ],
  "sideEffects": [
    "dist/index.css" // 标记样式文件有副作用，避免被误删
  ],
  "engines": {
    "node": "^20.19.0 || >=22.12.0"
  },
  "scripts": {
    "build:lib": "vite build -c vite.lib.config.ts",
  },
  "peerDependencies": { // 对等依赖，由组件库使用者提供的依赖
    "vue": "^3.5.0",
    "vue-router": "^4.6.0",
    "@vant/area-data": "^2.1.0",
    "vant": "^4.9.21"
  },
  "publishConfig": {
    "access": "public" // 作为公开包发布（而非私有 scoped 包）
  }
}
```

## 测试组件库

安装组件库并在 `main.ts` 引入组件库样式：`import 'h5-components-mkt/style.css'`。

测试组件功能、样式是否正常，尤其是移动端适配单位是否是 `vw`。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { QpsError, type QpsErrorProps } from 'h5-components-mkt'

const tip = ref<QpsErrorProps['tip']>('服务器繁忙')
const btnText = ref<QpsErrorProps['btnText']>('立即返回')
</script>

<template>
  <div class="qps-error-page">
    <QpsError :tip="tip" :btn-text="btnText" />
  </div>
</template>

<style scoped lang="scss">
.qps-error-page {
  height: 100vh;
}
</style>
```

## 组件库文档

使用 vitepress 搭建组件库文档。

文档只需在 PC 端查看，不需要兼容移动端，所以在配置 postcss 时，需要排除 `node_modules/vitepress`，不对 vitepress 的样式单位做转换。

```js [postcss.config.js]
export default {
  plugins: {
    'postcss-px-to-viewport': {
      // 不转换 vitepress 的样式，让文档在 PC 端正常展示
      exclude: [/node_modules\/vitepress/],
    },
  },
};
```
