import { decodeURL } from './decode-char'
export function imgUploadFile(md) {
  // 方法二：使用 file-loader 对载入标签进行打包的逻辑，将文档路径写在img
  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex("src");
    if (aIndex > -1) {
      tokens[idx].attrs[aIndex][1] = decodeURL(tokens[idx].attrs[aIndex][1]);
      const fileSrc = tokens[idx].attrs[aIndex][1];
      const vaildExtNameArr = [".docx", ".doc", ".xlsx", ".xls"];
      const extNmae = path.extname(fileSrc);
      // console.log('extNmae', extNmae);
      if (vaildExtNameArr.includes(extNmae)) {
        // 添加特定的类名，对包含docx文件的img标签进行隐藏
        tokens[idx].attrPush(["class", "custom-file-download"]);
        tokens[idx].attrPush(["data-file-name", path.basename(fileSrc)]);
      }
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}
