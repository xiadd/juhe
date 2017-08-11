const Post = require('../../services/post')

module.exports = {

  async newPostView (req, res) {
    res.render('post/newPost.njk')
  },

  async newPost (req, res) {
    const articleSchema = req.body
    const post = Post.articleCreate(articleSchema)
    res.redirect('/admin/posts')
  },

  async editPost (req, res, next) {
    const id = req.params.id
    const articleSchema = req.body
    try {
      const post = await Post.articleUpdateAndSave(id, articleSchema)
      console.log(post)
      return res.redirect('/admin/posts')
    } catch (e) {
      console.log(e)
      next(e)
    }
  },

  async deletePost (req, res, next) {
    const id = req.params.id
    try {
      await Post.articleRemoval(id)
      res.redirect('/admin/posts')
    } catch (e) {
      next()
    }
  },

  async articleListView (req, res) {
    const articleList = await Post.articleList(20)
    return res.render('post/articleList.njk', {
      articleList: articleList
    })
  },

  async articleDetailView (req, res) {
    const id = req.params.id
    const details = await Post.articleDetail(id)
    if (!details) {
      return res.render('error/404.njk')
    }
    return res.render('post/articleDetail.njk', {
      article: details
    })
  }
}