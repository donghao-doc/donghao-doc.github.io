import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  
  title: "Barry's Docs",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '前端',
        items: [
          { text: '微信小程序', link: '/mini-program/basic', activeMatch: '/mini-program/' },
        ]
      },
    ],

    sidebar: {
      '/mini-program/': [
        { text: '小程序基础', link: '/mini-program/basic' },
        { text: '小程序配置', link: '/mini-program/config' },
        { text: '样式和组件', link: '/mini-program/style-component' },
        { text: '事件系统', link: '/mini-program/event' },
        { text: 'WXML 语法', link: '/mini-program/wxml' },
        { text: '生命周期', link: '/mini-program/lifecycle' },
        { text: '小程序 API', link: '/mini-program/api' },
        { text: '自定义组件', link: '/mini-program/component' },
        { text: 'npm 支持', link: '/mini-program/npm' },
        { text: '分包加载', link: '/mini-program/subpackage' },
        { text: '开放能力', link: '/mini-program/open-ability' },
        { text: '数据共享与通信', link: '/mini-program/communication' },
        { text: '状态管理与计算属性', link: '/mini-program/state' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/donghao-doc/donghao-doc.github.io' }
    ],
    outline: [2, 3],
    search: {
      provider: 'local'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'medium',
      }
    }
  },
  cleanUrls: true,
})
