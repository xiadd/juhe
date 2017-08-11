const express = require('express')
const router = express.Router()

const user = require('./controllers/user')
const post = require('./controllers/post')

router.post('/register', user.userRegister)

// 展示文章
router.get('/posts', post.postListView)

module.exports = router