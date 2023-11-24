const fs = require("node:fs");
const path = require("path");
const decodeChar = require("./tools/decode-char");
const { generateSidebar } = require('./utils/config.js');

module.exports = {
  title: "Blog",
  description: "gentlekoala的Blog文档",
  base: "/",
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
      ...generateSidebar()
    ],
  },
  plugins: [
    '@vuepress/nprogress', // 加载进度条
    'reading-progress', // 阅读进度条
    [
      "cursor-effects",
      {
        size: 2, // size of the particle, default: 2
        shape: "circle", // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
  ],
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
          const sizeLimit = 1 * 1024 * 1024; // 1M
          if (aIndex > -1) {
            const vaildExtNameArr = [".docx", ".doc", ".xlsx", ".xls"];
            const href = decodeChar.decodeURL(tokens[idx].attrs[aIndex][1]);
            const extNmae = path.extname(href).toLowerCase();
            const folderName = 'files';

            if (vaildExtNameArr.includes(extNmae)) {
              const copyToPath = path.resolve(__dirname, `./public/${folderName}`);
              let docsFilePath = '';

              // 处理【相对路径】和【绝对路径】
              if (path.isAbsolute(href)) {
                // /Desktop/测试用例.docx
                // C:/Users/xxxx/Desktop/测试用例.docx
                const parsePath = path.parse(href);
                if (parsePath.root === '/' || parsePath.root === '\\') {
                  docsFilePath = path.join(__dirname, href);
                } else {
                  docsFilePath = href;
                }
              } else {
                // ../assests/测试.docx
                // http(s):\xxx\测试.xls
                if (href.startsWith('http')) return defaultRender(tokens, idx, options, env, self);

                docsFilePath = path.resolve(__dirname, "../", env.relativePath, "../", href);
              }
              const basename = path.basename(docsFilePath, extNmae);

              // 如果拷贝的路径不存在，则创建一个
              if (!fs.existsSync(copyToPath)) {
                fs.mkdirSync(copyToPath, { recursive: true });
              }
              // console.log("docsFilePath", docsFilePath);
              const fileInfo = fs.statSync(docsFilePath);
              if (fileInfo.size > sizeLimit) throw new Error(`${basename + extNmae}文件大小不能超过1M`);

              const data = fs.readFileSync(docsFilePath);
              const hashCode = decodeChar.md5(data);
              const hashName = basename + "." + hashCode + extNmae;
              const copyFilePath = path.join(copyToPath, hashName);

              fs.writeFileSync(copyFilePath, data);
              if (fs.existsSync(copyFilePath)) {
                tokens[idx].attrs[aIndex][1] = path.join("/blog/files", hashName);
                tokens[idx].attrPush(["download", hashName]);
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
