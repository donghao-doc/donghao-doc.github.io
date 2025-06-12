import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Barry's Site",
  description: "我的全栈学习笔记",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Flutter', link: '/flutter/dev-env' },
    ],

    sidebar: [
      {
        text: '开发环境',
        link: '/flutter/dev-env'
      },
      {
        text: 'Dart',
        collapsed: false,
        items: [
          { text: '基础语法', link: '/flutter/dart-base' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/donghao-doc/donghao-doc.github.io' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3], // 只显示大纲的2级和3级标题
    },
  }
})
