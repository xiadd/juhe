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

  async articleRemoval (id) {
    const article = await Article.findById(id)
    return await article.remove()
  },

  async articleList (pageSize, page) {
    return await Article.find().limit(pageSize).skip((page || 0) * 20)
  },

  async articleDetail (id) {
    return await Article.findById(id)
  },

  async articleUpdateAndSave (id, schema) {
    return await Article.update({_id: id}, { $set: schema })
  }
}