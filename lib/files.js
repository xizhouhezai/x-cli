const fs = require("fs")
const path = require("path")

module.exports = {
  // 获取当前文件路径
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd())
  },
  // 判断当前文件夹是否存在该文件
  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (error) {
      return false;
    }
  },
  copyFiles: (from, to) => {
    from = path.join(__dirname, "../", from);
    console.log(from);
    // fs.writeFileSync(to, fs.readFileSync(from, "utf-8"));
    console.log(fs.readFileSync(from, "utf-8"))
  },
}
