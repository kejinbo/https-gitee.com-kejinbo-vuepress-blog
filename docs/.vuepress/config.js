module.exports = {
  title: "Blog",
  description: "gentlekoala的Blog文档",
  base: "/blog/",
  theme: "reco",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    // 可以安装插件 @vuepress/last-updated 更改修改时间的展示格式
    lastUpdated: "上次更新",
    subSidebar: "auto",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "作者的博客",
        items: [
          { text: "Github", link: "https://github.com/kejinbo" },
          { text: "掘金", link: "" },
        ],
      },
    ],
    sidebar: [
      { title: "欢迎学习", path: "/", collapsable: false, children: [{ title: "学前必读", path: "/" }] },
      {
        title: "算法",
        path: "/algorithm",
        collapsable: false,
        children: [
          {
            title: "leetcode",
            path: "/algorithm/leetcode/",
            collapsable: false,
            children: [{ title: "06-Z字形变换", path: "/algorithm/leetcode/06-Z字形变换.md" }],
          },
        ],
      },
    ],
  },
};
