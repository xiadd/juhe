const Post = require('../../services/post')

module.exports = {
  async newPost (req, res) {
    const post = Post.articleCreate()
    res.send('发表成功')
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