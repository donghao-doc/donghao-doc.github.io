import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Barry's Docs",
  description: "我的全栈学习笔记",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '开发配置', link: '/dev-config/git' },
    ],

    sidebar: {
      '/dev-config/': [
        { text: 'Git 常用操作', link: '/dev-config/git' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
