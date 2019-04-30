#!/usr/bin/env node

var exec = require("child_process").exec;
var fs = require("fs");
var path = require("path");

// 彩色输出
const chalk = require("chalk");
// 清理输出日志
const clear = require("clear");
// 生成字符图案
const figlet = require("figlet");

const inquirer = require("./lib/inquirer.js");
const files = require("./lib/files.js");

// 清空当前命令行输出
clear();

console.log(
  chalk.yellow(
    figlet.textSync('ginit', { horizontalLayout: 'full' })
  )
)

const run = async () => {
  const credentials = await inquirer.askGithubCredentials();
  console.log(credentials);
  exec("npm -v", (err, stdout, stderr) => {
    if(err) {
      console.log('get weather api error:' + stderr);
    } else {
      console.log(stdout);
    }
  })
  fs.mkdir("./webpacks", () => {
    files.copyFiles("webpack", __dirname + "/webpacks")
  })
}

run();
