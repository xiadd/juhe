#!/usr/bin/env node
const User = require('../models').User
const { createUser } = require('../services/user')
const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('create', '创建管理员')
  .example('$0 create -u foo -p pass -e email', '创建管理员')
  .alias('u', 'username')
  .alias('p', 'password')
  .alias('e', 'email')
  .describe('u', '用户名')
  .describe('p', '密码')
  .describe('e', '邮箱')
  .demandOption(['u', 'p', 'e'])
  .help('h', '帮助')
  .alias('h', 'help')
  .argv

createUser({
  username: argv.username,
  password: argv.password,
  email: argv.email,
  valid: true,
  admin: true
}).then(function (user) {
  console.log(user)
  process.exit(1)
}, function (error) {
  console.log(error)
  process.exit(0)
})