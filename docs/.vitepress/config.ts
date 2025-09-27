import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Barry's Docs",
  description: "我的前端知识库",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '知识库', link: '/knowledge-base/typescript' },
      { text: '解决方案', link: '/solution/wechat-scan-login' },
      { text: '作品集', link: '/project/fastgen' },
    ],

    sidebar: {
      // 知识库
      '/knowledge-base/': [
        { text: 'TypeScript', link: '/knowledge-base/typescript' },
        { text: 'Git', link: '/knowledge-base/git' },
        { text: '微信生态', link: '/knowledge-base/wechat' },
        {
          text: '工程化',
          collapsed: false,
          items: [
            { text: 'package.json', link: '/knowledge-base/package.json' },
            { text: 'esbuild', link: '/knowledge-base/esbuild' },
          ]
        },
        {
          text: '三方库',
          collapsed: false,
          items: [
            { text: 'PixiJS', link: '/knowledge-base/pixi.js' },
          ]
        },

      ],
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
      { icon: 'github', link: 'https://github.com/donghao-doc/donghao-doc.github.io' }
    ],
    outline: [2, 3],
    search: {
      provider: 'local'
    },
    lastUpdated: true
  }
})
