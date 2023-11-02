const yaml = require('js-yaml');
const fs = require('node:fs');
const path = require('path');

const CONFIG_YAML = 'config.yaml';

const fileHelper = {
  /**
   *
   * @param {String} rpath 目录路径
   * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
   * @returns
   */
  getAllFiles: function getAllFiles(rpath, unDirIncludes = []) {
    let filenameList = [];
    fs.readdirSync(rpath).forEach((file) => {
      const filePath = path.join(rpath, file);
      if (fs.statSync(filePath).isDirectory() && !unDirIncludes.includes(file)) {
        filenameList = filenameList.concat(getAllFiles(filePath));
        return filenameList;
      }
      if (!fs.statSync(filePath).isDirectory() && file === CONFIG_YAML) {
        const configYaml = fs.readFileSync(filePath, 'utf8');
        const configData = yaml.load(configYaml);
        filenameList.push(configData);
      }
    });
    return filenameList;
  },
};
function generateSidebar() {
  const absolutePath = path.join(__dirname, '../../view');
  return fileHelper.getAllFiles(absolutePath, ['assests']);
}
module.exports = {
  generateSidebar,
};
