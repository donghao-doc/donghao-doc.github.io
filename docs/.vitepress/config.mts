import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Barry's Docs",
  description: "记录我的全栈学习笔记",
  lang: 'zh-CN',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue', link: '/vue/project-build' },
    ],

    sidebar: {
      '/vue/': [
        { text: '项目构建', link: '/vue/project-build' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/donghao-doc/donghao-doc.github.io' }
    ],
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 3], // 只显示大纲的2级和3级标题
    },
  }
})
