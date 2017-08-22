const { Article } = require('../models')

module.exports = {
  /**
   * 新增文章
   * @param {*} schema 
   */
  async articleCreate (schema) {
    try {
      const newPost = new Article(schema)
      return await newPost.save()
    } catch (e) {
      return Promise.reject(e)
    }
  },

  /**
   * 删除文章
   * @param {string} id 
   */
  async articleRemoval (id) {
    const article = await Article.findById(id)
    return await article.remove()
  },

  /**
   * 获取文章列表
   * @param {number} pageSize 
   * @param {number} page 
   */
  async articleList (pageSize, page) {
    return await Article.paginate({}, { page: page, limit: pageSize })
  },

  /**
   * 获取文章细节
   * @param {string} id 
   */
  async articleDetail (id) {
    return await Article.findById(id)
  },

  /**
   * 修改文章
   * @param {string} id 
   * @param {*} schema 
   */
  async articleUpdateAndSave (id, schema) {
    return await Article.update({_id: id}, { $set: schema })
  },

  /**
   * 获取文章数量
   */
  async getCount () {
    return await Article.count()
  }
}
