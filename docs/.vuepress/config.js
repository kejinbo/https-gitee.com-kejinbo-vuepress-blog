module.exports = {
  title: 'Blog',
  description: 'gentlekoala的Blog文档',
  base: '/blog/',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    // 可以安装插件 @vuepress/last-updated 更改修改时间的展示格式
    lastUpdated: '上次更新',
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '作者的博客',
        items: [
          { text: 'Github', link: 'https://github.com/kejinbo' },
          { text: '掘金', link: 'https://juejin.cn/user/3825956193044055?utm_source=gold_browser_extension' },
        ],
      },
    ],
    sidebar: [
      { title: '欢迎学习', path: '/', collapsable: false, children: [{ title: '学前必读', path: '/' }] },
      {
        title: '算法',
        path: '/algorithm',
        collapsable: false,
        children: [
          {
            title: 'leetcode',
            path: '/algorithm/leetcode/',
            collapsable: true,
            children: [
              { title: '06-Z字形变换', path: '/algorithm/leetcode/06-Z字形变换.md' },
              { title: '118-杨辉三角', path: '/algorithm/leetcode/118-杨辉三角.md' },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    [
      'cursor-effects',
      {
        size: 2, // size of the particle, default: 2
        shape: 'circle', // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
  ],
};
