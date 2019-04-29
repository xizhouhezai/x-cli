// node.js 里的github rest API 客户端
const Octokit = require('@octokit/rest');
const octokit = new Octokit();
// 保存配置信息到本地
const Configstore = require('configstore');
const pkg         = require('../package.json');
// js的工具库
const _           = require('lodash');
// 绘制命令行中的表格，仪表盘，加载指示器等
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const chalk       = require('chalk');

const inquirer    = require('./inquirer');

const conf = new Configstore(pkg.name);

module.exports = {
  // 返回octokit实力
  getInstance: () => {
    return octokit;
  },
  // 获取本地缓存token
  getStoredGithubToken: () => {
    return conf.get('github.token');
  },
  setGithubCredentails: async () => {
    const credentials = await inquirer.askGithubCredentials();

    // 获取用户名和密码后，进行github账号验证, octokit.authenticate已抛弃
    const obj = new Octokit(
      {
        auth:  _.extend(
          {type: "basic"},
          credentials
        )
      }
    )
  },

  // 获取github的token
  registerNewToken: async () => {
    // 设置验证token前的等待状态
    const status = new Spinner("Authenticating you, please wait...");
    status.start();

    try {
      // const response = await octokit.authorization.create({
      //   scopes: ['user', 'public_repo', 'repo', 'repo:status'],
      //   note: 'ginits, the command-line tool for initalizing Git repos'
      // });
      const response = await octokit.oauthAuthorizations.createAuthorization({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'ginits, the command-line tool for initalizing Git repos'
      })

      console.log(response);

      // const token = response.data.token;

      // if (token) {
      //   conf.set("github.token", token);
      //   return token;
      // } else {
      //   throw new Error("Missing Token","GitHub token was not found in the response");
      // }
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  }
}
