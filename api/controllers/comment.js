const Comment = require('../../services/comment')

module.exports = {
  async commentCreate (req, res, next) {
    const schema = req.body
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

  async getComments (req, res, next) {
    
  }
}
