const mdurl = require("mdurl");
export function isNeedDecode(url, config) {
  config = config || "*";

  if (config === "*") {
    return true;
  }

  if (config === "./" || config === ".") {
    return !/^(\w+?:\/)?\//.test(url);
  }

  if (config instanceof RegExp) {
    return config.test(url);
  }

  config = [].concat(config);
  return config.some(a => url.startsWith(a));
}

export function decodeURL(url, config) {
  url = isNeedDecode(url, config) ? mdurl.decode(url) : url;
  return /^(\w+?:\/)?\.?\//.test(url) ? url : "./" + url;
}