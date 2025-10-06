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
      { text: '作品集', link: '/project/fastgen' },
    ],

    sidebar: {
      // 解决方案
      '/solution/': [
        { text: '微信扫码登录', link: '/solution/wechat-scan-login' },
      ],
      // 作品集
      '/project/': [
        { text: 'FastGen', link: '/project/fastgen' },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    outline: [2, 3],
  }
})
