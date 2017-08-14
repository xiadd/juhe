const Post = require('../../services/post')

module.exports = {
  async postListView (req, res, next) {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const count = await Post.getCount()
    try {
      const postsList = await Post.articleList(limit, page - 1)
      res.json({
        code: 1,
        data: postsList,
        pagination: {
          current: page,
          total: count%limit
        }
      })
    } catch (e) {
      next(e)
    }
  }
}
