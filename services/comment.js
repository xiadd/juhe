const { Comment } = require('../models')

module.exports = {
  /**
   * 新增评论
   * 
   * @param {object} schema 
   * @returns 
   */
  async newComment (schema) {
    try {
      const newComment = new Comment(schema)
      return await newComment.save()
    } catch (e) {
      return Promise.reject(e)
    }
  },
  
  /**
   * 获取用户评论
   * 
   * @param {any} id 
   * @returns {promise} 
   */
  async getUserComments (id) {
    try {
      const comments = Comment.find({ author: id })
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async getArticleComments () {

  },

  /**
   * 获取评论总数
   * @return {promise}
   * @param {any} query 
   */
  async getCommentCount(query) {

  }
}
