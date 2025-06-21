import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Barry's Docs",
  description: "A VitePress Site",
  lang: 'zh-CN',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue', link: '/vue/project-build' },
      { text: 'Flutter', link: '/flutter/dev-env' },
      { text: '开发配置', link: '/dev-config/git' },
    ],

    sidebar: {
      '/vue/': [
        { text: '项目构建', link: '/vue/project-build' },
      ],
      '/flutter/': [
        { text: '开发环境', link: '/flutter/dev-env' },
      ],
      '/dev-config/': [
        { text: 'Git 常用操作', link: '/dev-config/git' },
      ]
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
