const fs = require("node:fs");
const path = require("path");
const decodeChar = require("./tools/decode-char");

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
      return {
        name: "download-docs-file",
        clientRootMixin: path.resolve(__dirname, "download-docs-file/index.js"),
      };
    },
  ],
  chainWebpack: (config, isServer) => {
    // console.log(path.join(__dirname, "public"));
    // config.devServer.contentBase = path.join(__dirname, "public");

    config.module
      .rule("docx-files")
      .test(/.(docx|doc|xlsx|xls)(\?.*)?$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        limit: 1000,
        name: `assets/files/[name].[hash:8].[ext]`,
      })
      .end();
  },
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      const defaultRender =
        md.renderer.rules.link_open ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options);
        };
      // 方法一：将解析到的文件，复制到public中，通过vuepress提供的功能，将public中的文件打包上去
      try {
        md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
          const aIndex = tokens[idx].attrIndex("href");
          const sizeLimit = 1 * 10000 * 1000; // 1M
          if (aIndex > -1) {
            const vaildExtNameArr = [".docx", ".doc", ".xlsx", ".xls"];
            const href = decodeChar.decodeURL(tokens[idx].attrs[aIndex][1]);
            const extNmae = path.extname(href).toLowerCase();
            console.log("href", href, extNmae);

            if (vaildExtNameArr.includes(extNmae)) {
              const copyToPath = path.resolve(__dirname, "./public/files");

              if (path.isAbsolute(href)) {
              } else {
                const docsFilePath = path.resolve(__dirname, "../", env.relativePath, "../", href);
                const docsFileDirname = path.dirname(path.join(env.relativePath, "../", href));
                const basename = path.basename(docsFilePath, extNmae);
                // console.log("docsFilePath", docsFilePath, docsFileDirname, copyToPath);
                if (!fs.existsSync(copyToPath)) {
                  fs.mkdirSync(copyToPath, { recursive: true });
                }
                // console.log("docsFilePath", docsFilePath);
                const fileInfo = fs.statSync(docsFilePath);
                const data = fs.readFileSync(docsFilePath);
                const hashCode = decodeChar.md5(data);
                console.log("hashCode", fileInfo, data, hashCode);
                if (fileInfo.size > sizeLimit) throw new Error(`${basename + extNmae}文件大小不能超过1M`);

                const hashName = basename + "." + hashCode + extNmae;
                fs.writeFileSync(path.join(copyToPath, hashName), data);
                if (fs.existsSync(path.join(copyToPath, hashName))) {
                  tokens[idx].attrs[aIndex][1] = path.join("/blog/files", hashName);
                  tokens[idx].attrPush(["download", hashName]);
                }
              }
            }
          }

          return defaultRender(tokens, idx, options, env, self);
        };
      } catch (err) {
        console.error(err);
      }
    },
  },
};
