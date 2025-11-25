import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Barry's Docs",
  description: "我的全栈知识库",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '知识库', link: '/knowledge/server-deploy' },
      { text: '解决方案', link: '/solution/cors' },
      { text: '作品集', link: '/project/fastgen' },
    ],

    sidebar: {
      // 知识库
      '/knowledge/': [
        { text: '服务器项目部署', link: '/knowledge/server-deploy' },
        { text: 'PixiJS', link: '/knowledge/pixi.js' },
        { text: 'Vite', link: '/knowledge/vite' },
      ],
      // 解决方案
      '/solution/': [
        { text: '跨域', link: '/solution/cors' },
        { text: 'H5 业务组件库', link: '/solution/h5-components' },
      ],
      // 作品集
      '/project/': [
        { text: 'FastGen', link: '/project/fastgen' },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/donghao-doc/donghao-doc.github.io' }
    ],
    outline: [2, 3],
    search: {
      provider: 'local'
    },
    lastUpdated: true
  }
})
