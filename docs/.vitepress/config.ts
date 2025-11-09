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
    ],

    sidebar: [

    ],

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
