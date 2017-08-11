const Post = require('../../services/post')

module.exports = {
  async postListView (req, res, next) {
    const page = req.query.page
    try {
      const postsList = await Post.articleList(20, page)
      res.json({
        code: 1,
        data: postsList
      })
    } catch (e) {
      next(e)
    }
  }
}