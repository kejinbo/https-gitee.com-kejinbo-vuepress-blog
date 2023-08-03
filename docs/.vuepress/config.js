const fs = require('fs');
const path = require("path");
// const CopyPlugin = require("copy-webpack-plugin");
// const WriteFilePlugin = require("write-file-webpack-plugin");

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
          { text: "掘金", link: "https://juejin.cn/user/3825956193044055?utm_source=gold_browser_extension" },
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
            collapsable: true,
            children: [
              { title: "06-Z字形变换", path: "/algorithm/leetcode/06-Z字形变换.md" },
              { title: "118-杨辉三角", path: "/algorithm/leetcode/118-杨辉三角.md" },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    [
      "cursor-effects",
      {
        size: 2, // size of the particle, default: 2
        shape: "circle", // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
    // new WriteFilePlugin({
    //   test: /.(docx|doc|xlsx|xls)(\?.*)?$/,
    //   useHashIndex: true,
    // }),
    // new CopyPlugin({}),
    (options, ctx) => {
      console.log('ctx', ctx);
      // console.log(path.resolve(__dirname, "download-docs-file/index.js"));
      return {
        name: "download-docs-file",
        clientRootMixin: path.resolve(__dirname, "download-docs-file/index.js"),
      };
    },
  ],
  chainWebpack: (config, isServer) => {
    // console.log(path.join(__dirname, "public"));
    // config.devServer.contentBase = path.join(__dirname, "public");

    // config.module
    //   .rule("docxFiles")
    //   .test(/.(docx|doc|xlsx|xls)(\?.*)?$/)
    //   .use("file-loader")
    //   .loader("file-loader")
    //   .tap(() => ({
    //     name: "assets/files/[name].[hash:8].[ext]",
    //   }))
    //   .end();
  },
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      const iterator = require("markdown-it-for-inline");
      md.use(iterator, "url_new_win", "link_open", function(tokens, idx) {
        console.log('link_open', this, tokens, idx);
        throw new Error();
        const assestsPath = path.join(__dirname, 'public/files')
        const aIndex = tokens[idx].attrIndex("href");
        const aDownloadIdx = tokens[idx].attrIndex("download");

        if (aIndex > -1) {
          const href = tokens[idx].attrs[aIndex][1];
          const vaildExtNameArr = [".docx", ".doc", ".xlsx", ".xls"];
          if (path.isAbsolute(href)) {
            // console.log(tokens[idx]);
            const extNmae = path.extname(href);
            if (vaildExtNameArr.includes(extNmae)) {
              if (aDownloadIdx < 0) {
                const filePath = path.join(__dirname, href);
                console.log(filePath, fs.existsSync(filePath));
                // tokens[idx].attrs[aIndex][1] = href;
                // tokens[idx].attrPush(["download", path.basename(filePath)]);
                // tokens[idx].attrPush(["data-download-link", filePath]);
                tokens[idx].attrPush(["class", "download-docs-file-btn"]);
              }
              // const copyPath = path.join(__dirname, `../assets/${path.basename(filePath)}`);
              // console.log("path ", path.basename(filePath), path.join(__dirname, `../${path.basename(filePath)}`));
            }
          }
        }
      });
    },
  },
};
