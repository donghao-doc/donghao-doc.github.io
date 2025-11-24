# Vite 常用配置

## 工具函数

### defineConfig

```ts
import { defineConfig } from 'vite'
```

`defineConfig()` 是 Vite 提供的一个辅助函数，用于 TS 类型推断和智能提示。

虽然 Vite 配置也可以直接导出一个普通对象，但使用 `defineConfig()` 可以让 IDE 提供更精准的代码补全和类型检查。

### resolve

```ts
import { resolve } from 'node:path'
```

`resolve()` 是 Node.js `path` 模块中的函数，用于将多个路径片段拼接成一个**绝对路径**。

在配置文件中，使用绝对路径可以避免相对路径繁琐和解析错误，确保项目的稳定性。

### cwd

```js
import { cwd } from 'node:process'
```

`cwd()` 是 Node.js `process` 模块中的函数，意为 “Current Working Directory”，用于获取当前 Node.js 进程的工作目录。

当在项目根目录运行 `vite build` 时，`cwd()` 就指向项目根目录。结合 `resolve(cwd(), 'lib')` 可以确保无论在哪个子目录执行命令，都能正确找到 `lib` 目录。

## 插件配置

插件可以扩展 Vite 的功能，处理不同类型的文件或执行特定的构建任务。

### vue

`vue()` 用于解析 `.vue` 单文件组件，处理 `<template>`、`<script>` 和 `<style>`，将其转换为浏览器可识别的 JS 和 CSS。

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
})
```

### AutoImport、Components、VantResolver

- `AutoImport()` 用于**自动导入**项目中用到的 API，无需手动 `import`。
- `Components()` 用于**自动注册**项目中用到的组件。
- `VantResolver()` 会自动识别并导入项目中用到的 Vant 的 API 和组件。

```ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
})
```

### dts

`dts()` 用于在构建过程中自动生成 TS 类型声明文件（`.d.ts`）。

```ts
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      // 指定要为哪些文件生成类型声明文件
      include: ['lib/**/*.ts', 'lib/**/*.d.ts', 'lib/**/*.vue'],
      // 指定生成的 .d.ts 文件输出到 dist/types 目录
      outDir: 'dist/types',
      // 指定使用专门为组件库构建配置的 tsconfig 文件
      tsconfigPath: 'tsconfig.lib.json',
    }),
  ],
})
```

## 模块解析配置

用于告诉 Vite 如何查找和解析项目中的模块。

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    // 配置路径别名
    alias: {
      // 将 `@` 符映射到项目根目录下的 lib 目录
      '@': resolve(cwd(), 'lib'),
    },
  },
})
```

## 构建配置

### 库模式

当需要打包一个组件库而非一个 Web 应用时，必须启用 Vite 的**库模式（`build.lib`）**，这是构建组件库的关键。

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // 指定组件库的入口文件，这个文件负责导出所有需要对外暴露的组件和 API
      entry: resolve(cwd(), 'lib/index.ts'),
      
      // 指定库在 UMD 格式下暴露在 window 对象上的变量名
      // 当用户通过 <script src="..."> 引入组件库时，可以通过 window.H5Components 来访问组件
      name: 'H5Components',

      // 自定义输出文件名的生成规则
      // format 参数是下方 formats 中指定的 es 或 umd
      // 因此最终会生成 h5-components.es.js 和 h5-components.umd.js 两个文件
      fileName: (format) => `h5-components.${format}.js`,

      // 指定要输出的模块格式
      formats: ['es', 'umd'],
    },
  }
})
```

### Rollup

Vite 的底层打包引擎是 Rollup，通过 `rollupOptions` 可以配置 Rollup 的行为。

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      // 标记外部依赖，不打包进产物
      external: ['vue', 'vue-router', 'vant', '@vant/area-data'],
      
      output: {
        // UMD 格式下的外部依赖的全局变量名
        globals: {
          vue: 'Vue', // 如：window.Vue
          'vue-router': 'VueRouter', // 如：window.VueRouter
          vant: 'vant',
          '@vant/area-data': 'VantAreaData',
        },
        
        // 静态资源命名
        assetFileNames: (assetInfo) => {
          // 保持样式文件名固定
          if (assetInfo.name === 'style.css' || assetInfo.name === 'index.css') {
            return 'index.css'
          }
          // 其他资源使用默认或哈希命名
          return assetInfo.name || 'asset-[hash]'
        },
        
        // 使用命名导出（相当于分别暴露），方便开发者按需引入，更好地支持 Tree-shaking
        // 如果不设置，Rollup 会根据入口文件代码自动推断导出方式（auto）
        exports: 'named',
      },
    },
  },
})
```

:::tip 为什么配置 external？
- 避免重复打包：组件库依赖了 `vue`、`vue-router` 以及 `vant`、`@vant/area-data` 等第三方 UI 库，它们是组件库的 peerDependencies（对等依赖），意味着使用本组件库的项目必须自己提供这些依赖。如果打包进去，会导致用户项目中存在多份依赖，从而引发冲突和错误。
- 减小包体积：排除了庞大的框架代码，让组件库体积更小。
:::

### 其他构建选项

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 所有构建产物的输出目录
    outDir: 'dist',
    // 启用 terser 压缩代码
    minify: 'terser',
    // 将 CSS 提取为独立的文件（分离 CSS）
    cssCodeSplit: true,
    // 生成源码映射
    sourcemap: true,
  },
})
```

:::tip
- `terser` 是 Rollup 默认的压缩工具，能提供更好的压缩率。
- 分离 CSS：将组件中的 CSS 样式提取到一个或多个独立的 `.css` 文件中，而不是内联到 JS 里。
:::
