import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Barry's Docs",
  description: "我的前端学习笔记",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '基础', link: '/basic/git' },
      { text: '工程化', link: '/engineering/package-json' },
      { text: '三方库', link: '/library/pixi' },
      { text: '项目', link: '/project/fastgen' },
    ],

    sidebar: {
      // 基础
      '/basic/': [
        { text: 'Git 常用操作', link: '/basic/git' },
      ],
      // 工程化
      '/engineering/': [
        { text: 'package.json', link: '/engineering/package-json' },
        { text: 'esbuild', link: '/engineering/esbuild' },
      ],
      // 三方库
      '/library/': [
        { text: 'PixiJS', link: '/library/pixi' },
      ],
      // 项目
      '/project/': [
        { text: 'FastGen CLI', link: '/project/fastgen' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    outline: [2, 3],
  }
})
