import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Barry's Docs",
  description: "我的前端知识库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '知识库', link: '/knowledge-base/typescript' }
    ],

    sidebar: {
      // 知识库
      '/knowledge-base/': [
        { text: 'TypeScript', link: '/knowledge-base/typescript' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/donghao-doc/donghao-doc.github.io' }
    ]
  }
})
