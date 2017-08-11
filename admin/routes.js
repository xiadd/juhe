const express = require('express')
const router = express.Router()
const { adminLogin } = require('../middlewares/adminAuth')
const user = require('./controllers/user')
const home = require('./controllers/home')
const post = require('./controllers/post')


// 用户登录
router.get('/login', user.adminUserLoginView)
router.post('/login', user.adminUserLogin)

// 退出登录
router.get('/logout', user.adminUserLogout)

router.use(adminLogin)

// 管理员首页
router.get('/', home.adminIndexView)
router.get('/users', home.UserListView)
router.get('/users/:id', home.UserDetailView)

// 文章管理
router.get('/posts', post.articleListView)
router.get('/posts/new', post.newPostView)
router.post('/posts/new', post.newPost)
router.get('/posts/:id/delete', post.deletePost)
router.post('/posts/:id/edit', post.editPost)
router.get('/posts/:id', post.articleDetailView)

module.exports = router