import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Barry's Docs",
  description: "我的前端学习笔记",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '工程化', link: '/engineering/package-json' },
      { text: '项目', link: '/project/fastgen' },
    ],

    sidebar: {
      '/engineering/': [
        { text: 'package.json', link: '/engineering/package-json' },
      ],
      '/project/': [
        { text: 'FastGen CLI', link: '/project/fastgen' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
