const express = require('express')
const router = express.Router()
const user = require('./controllers/user')
const home = require('./controllers/home')
const post = require('./controllers/post')

// 用户登录
router.get('/login', user.adminUserLoginView)
router.post('/login', user.adminUserLogin)

// 退出登录
router.get('/logout', user.adminUserLogout)

// 管理员首页
router.get('/', home.adminIndexView)
router.get('/users', home.UserListView)
router.get('/users/:id', home.UserDetailView)

// 文章管理
router.get('/posts', post.articleListView)
router.get('/posts/:id', post.articleDetailView)

module.exports = router