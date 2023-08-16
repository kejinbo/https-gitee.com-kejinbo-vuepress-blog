const mdurl = require("mdurl");
const crypto = require("crypto");
function isNeedDecode(url, config) {
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

function decodeURL(url, config) {
  // url = isNeedDecode(url, config) ? mdurl.decode(url) : url;
  // return /^(\w+?:\/)?\.?\//.test(url) ? url : "./" + url;
  return mdurl.decode(url);
}

function md5(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

module.exports = {
  decodeURL,
  md5
}