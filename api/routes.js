const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')
const config = require('../config')

const user = require('./controllers/user')
const post = require('./controllers/post')
const comment = require('./controllers/comment')
const auth = require('../middlewares/apiAuth')

router.post('/register', user.userRegister)
router.post('/login', user.userLogin)

// 展示文章
router.get('/posts', post.postListView)

// 文章评论
router.post('/comment/new', auth.apiLogin, comment.commentCreate)

module.exports = router
