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
  copyFiles: copyFiles,
}

function copyFiles(src, dst) {
  let from = path.join("./", src);
  let paths;
  try {
    paths = fs.readdirSync(from);
  } catch (error) {
    if (error) {
      paths = fs.readdirSync(src);
      from = src;
    }
  }

  console.log("from-------------------------");
  console.log(from);
  console.log("from-------------------------");

  paths.forEach((path) => {
    let _src = from + "/" + path;
    let _dst = dst + "/" + path;

    fs.stat(_src, (err, stats) => {
      if (err) throw err;

      if (stats.isFile()) {
        let readable=fs.createReadStream(_src); //创建读取流
        let writable=fs.createWriteStream(_dst); //创建写入流
        readable.pipe(writable);
      }
      if (stats.isDirectory()) {
        checkDirectory(_src, _dst, copyFiles);
      }
    })
  })
  // fs.writeFileSync(to, fs.readFileSync(from, "utf-8"));
}

function checkDirectory(src, dst, callback) {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst);
    } else {
      callback(src, dst);
    }
  })
}
