// 创建交互式命令行
const inquirer = require('inquirer');

module.exports = {
  askGithubCredentials: () => {
    const questions = [
      {
        name: "ginit",
        type: "list",
        message: "你需要安装哪一个？",
        choices: ["npm + vue + vue-router", "yarn + vue + vue-router"],
        filter: (value) =>　{
          console.log(value)
          return value
        }
      },
    ];

    return inquirer.prompt(questions);
  }
}
