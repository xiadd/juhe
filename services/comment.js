const { Comment } = require('../models')

module.exports = {
  async newComment (schema) {
    try {
      const newComment = new Comment(schema)
      return await newComment.save()
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
