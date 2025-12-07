# 主题切换：SCSS 结合 CSS 变量实现动态主题

关键思路：

- 动态加载 SCSS 主题文件 → 提取 CSS 文本（主题变量） → 注入页面样式。
- 通过 localStorage 持久化客户身份，解决页面刷新后主题失效的问题。

[GitHub 代码示例](https://github.com/donghao-doc/themes-switch)

## 定义主题样式

:::code-group

```scss [common.scss]
// 公共 SCSS 变量
:root {
  --font-size-base: 14px;       // 基础字体大小
  --border-radius: 6px;         // 基础圆角
  --transition-duration: 0.3s;  // 过渡动画时长
  --theme-transition: all 0.3s ease;
}
```

```scss [default.scss]
// 默认主题
:root {
  --primary: #276ef1;       // 主色
  --bg-main: #cadcef;       // 页面主背景色
  --text-primary: #333333;  // 主文本色
  --border-color: #e8e8e8;  // 边框色
}
```

```scss [customerA.scss]
// 客户A（紫色主题）
:root {
  --primary: #7c3aed;       // 主色：紫色高饱和
  --bg-main: #f4f0ff;       // 页面主背景色
  --text-primary: #2d1846;  // 主文本色
  --border-color: #e3d7ff;  // 边框色
}
```

```scss [customerB.scss]
// 客户B（橙色主题）
:root {
  --primary: #f97316;       // 主色：明亮橙
  --bg-main: #fff4e5;       // 页面主背景色
  --text-primary: #4a2f14;  // 主文本色
  --border-color: #ffd9b3;  // 边框色
}
```

```scss [customerC.scss]
// 客户C（绿色主题）
:root {
  --primary: #22c55e;       // 主色：清新绿
  --bg-main: #e6f6ec;       // 页面主背景色
  --text-primary: #1f3b2a;  // 主文本色
  --border-color: #c6e8d1;  // 边框色
}
```

:::

## 引入默认主题

:::code-group

```scss [main.scss]
// 样式汇总（样式入口）
@import "./common.scss";
@import "./themes/default.scss";
```

```ts [main.ts]
import './assets/styles/main.scss'
```

```scss [业务组件中的样式使用主题变量]
.btn-primary {
  background-color: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: var(--border-radius);
  padding: 8px 16px;
  cursor: pointer;
  transition: var(--theme-transition);
}
```

:::

以上代码，引入的是默认主题样式，自定义主题需根据客户身份动态引入。

## 引入自定义主题

:::code-group

```ts [src/utils/themeLoader.ts]
// 客户身份与主题文件的映射关系
const customerThemeMap = {
  customerA: () => import('../assets/styles/themes/customerA.scss?inline'),
  customerB: () => import('../assets/styles/themes/customerB.scss?inline'),
  customerC: () => import('../assets/styles/themes/customerC.scss?inline'),
} as const;

export type CustomerId = keyof typeof customerThemeMap;
const isCustomerId = (id: string): id is CustomerId => {
  return id in customerThemeMap
}

const THEME_STYLE_ID = 'customer-theme-style';

// 每次切换前移除旧样式，再注入新样式，避免已加载过的主题被缓存导致 CSS 顺序不变
const applyThemeCss = (cssText: string) => {
  const prev = document.getElementById(THEME_STYLE_ID);
  if (prev && prev.parentNode) {
    prev.parentNode.removeChild(prev);
  }

  const styleEl = document.createElement('style');
  styleEl.id = THEME_STYLE_ID;
  styleEl.textContent = cssText;
  document.head.appendChild(styleEl);
};

/**
 * 加载并应用客户专属主题
 * @param {string} customerId 客户ID（如 customerA）
 */
export const loadCustomerTheme = async (customerId: string) => {
  try {
    // 校验客户身份有效性
    if (!isCustomerId(customerId)) {
      console.warn(`未找到${customerId}的专属主题`);
      return;
    }

    // 动态加载主题文件（获取 CSS 文本后手动挂载到页面）
    const themeModule = await customerThemeMap[customerId]();
    applyThemeCss(themeModule.default);

    // 持久化客户身份（刷新/跳转后自动加载）
    localStorage.setItem('current-customer', customerId);
    console.log(`✅ ${customerId}主题加载成功`);
  } catch (error) {
    console.error('❌ 主题加载失败：', error);
  }
};

/**
 * 初始化主题（页面加载/组件挂载时执行）
 */
export const initCustomerTheme = async () => {
  // 优先从本地存储获取客户身份
  const savedCustomer = localStorage.getItem('current-customer');
  if (savedCustomer) {
    await loadCustomerTheme(savedCustomer);
    return;
  }
};
```

```ts [Login.vue]
async function handleLogin() {
  if (!username.value || !password.value) {
    alert('请输入用户名/密码');
    return;
  }

  // 加载客户主题
  await loadCustomerTheme(selectedCustomer.value);

  router.push('/home');
}
```

:::

至此，已经实现根据客户身份动态引入主题样式功能。

## ?inline

`?inline` 是 Vite 的内置查询参数，作用是告诉构建工具**以“内联”模式处理这个文件，返回文件的原始文本内容，而非编译后的资源/模块**。

此方案中的 `?inline` 的目的是，直接读取 SCSS 文件中的**原始字符串内容**，而非编译后的样式模块。

:::tip

除了样式文件，`?inline` 也常用于 SVG、JSON 等文件，目的都是“获取原始文本/二进制内容，而非构建工具封装后的资源”。

```ts
// 获取 SVG 原始文本，用于内联 SVG（避免请求）
import svgText from './icon.svg?inline'

// 获取 JSON 原始文本，避免 Vite 自动解析为 JS 对象
import jsonText from './config.json?inline'

// 获取文本文件内容，直接读取 .txt 内容
import txtContent from './info.txt?inline'
```

:::

## 样式缓存问题

动态 import 的主题文件会被浏览器缓存，若修改主题文件后未生效，可在文件名后加版本号（如 `customerA.scss?v=2`）或配置 Vite 禁用缓存（仅开发环境）。

## 初始化样式

问题：当用户刷新时，仍然回到了默认主题，没有应用自己的主题。

解决：在 `main.ts` 中初始化主题。

```ts
import { initCustomerTheme } from '@/utils/themeLoader.ts'

const bootstrap = async () => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  // 在应用挂载前初始化主题（优先加载本地存储的客户主题）
  try {
    await initCustomerTheme()
  } catch (err) {
    console.error('初始化主题失败，使用默认样式', err)
  }

  app.mount('#app')
}

bootstrap()
```
