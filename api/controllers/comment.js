const Comment = require('../../services/comment')

module.exports = {
  async commentCreate (req, res, next) {
    const schema = req.body
    schema.author = req.user.id
    try {
      const newComment = await Comment.newComment(schema)
      if (newComment) {
        res.json({
          code: 1,
          msg: '评论成功'
        })
      }
    } catch (e) {
      next(e)
    }
  },

  async getUserComments (req, res, next) {
    const id = req.params.id
    try {
      const comments = await Comment.getUserComments(id)
      res.json(comments)
    } catch (e) {
      next(e)
    }
  },

  async getArticleComments (req, res, next) {
    
  }
}
