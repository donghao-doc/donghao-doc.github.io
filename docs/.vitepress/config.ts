import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: `Barry's Docs`,
  description: '我的前端知识库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '解决方案', link: '/solution/wechat-scan-login' },
    ],

    sidebar: {
      // 解决方案
      '/solution/': [
        { text: '微信扫码登录', link: '/solution/wechat-scan-login' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    outline: [2, 3],
  }
})
