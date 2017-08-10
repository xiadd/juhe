const Article = require('../models').Article

module.exports = {
  async articleCreate (schema) {
    try {
      const newPost = new Article(schema)
      return await newPost.save()
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async articleList (pageSize) {
    return await Article.find().limit(pageSize)
  },

  async articleDetail (id) {
    return await Article.findById(id)
  }
}