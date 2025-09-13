# esbuild

esbuild 是一个用于**打包 JS/TS 代码**的工具，它使用 Go 语言编写，**构建速度**比 Webpack 快 10-100 倍，并且支持 **Tree-shaking** 和**代码压缩**。

esbuild 会自动分析依赖关系，只打包实际被使用的模块。

## 基本使用

```bash
npm install esbuild
```

:::code-group

```json [package.json]
"scripts": {
  "build": "node scripts/build.js"
}
```

```js [scripts/build.js]
const esbuild = require('esbuild');

async function build() {
  try {
    // 构建配置
    const result = await esbuild.build({
      entryPoints: ['src/index.ts'], // 构建的入口文件
      outfile: 'bin/cli.js', // 输出文件路径
      bundle: true, // 将所有模块打包成单个文件
      minify: true, // 压缩代码以减小文件大小
      platform: 'node', // 指定运行环境（node/browser）
      target: 'node18', // 指定目标运行环境版本
      format: 'cjs', // 输出模块格式（cjs/esm/iife）
      sourcemap: false, // 是否生成 sourcemap
      write: false, // 是否写入输出文件，为 false 时，不会写入输出文件，需要手动写入
      external: ['electron'], // 排除某些依赖，不打包进最终文件
    });

    console.log('✅ 构建成功！', result); // 打包结果
  } catch (error) {
    console.error('❌ 构建失败:', error);
    process.exit(1);
  }
}

build();
```

:::
