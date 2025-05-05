import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: "Barry's Site",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'React', link: '/react/' },
      { text: '开发环境', link: '/开发环境/' }
    ],

    sidebar: {
      '/react/': [
        {
          text: '基础知识',
          collapsed: false,
          items: [
            { text: '项目构建', link: '/react/项目构建' },
            { text: 'JSX', link: '/react/jsx' },
          ]
        },
        {
          text: 'Hooks',
          collapsed: false,
          items: [
            { text: 'useState', link: '/react/useState' },
            { text: 'useEffect', link: '/react/useEffect' },
            { text: 'useContext', link: '/react/useContext' },
            { text: 'useMemo', link: '/react/useMemo' },
          ]
        }
      ],
      '/开发环境/': [
        { text: 'Git', link: '/开发环境/git' }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/donghao-doc/donghao-doc.github.io' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3], // 只显示大纲的2级和3级标题
    }
  }
})
