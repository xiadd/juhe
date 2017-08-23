const uuidv5 = require('uuid/v5')
const { User } = require('../models')
const sendMail = require('../libs/mail')

module.exports = {
  
  /**
   * 创建用户
   * @param  {Object}  schenma [description]
   * @return {Promise}         [description]
   */
  async createUser (schenma) {
    const newUser = new User(schenma)
    return await newUser.save()
  },

  async updateUser () {

  },

  /**
   * 邮箱验证
   * @param  {String}  email [description]
   * @return {Promise}       [description]
   */
  async userConfirm (email) {
    const uuid = uuidv5(email, uuidv5.DNS)
    return await sendMail({
      from: 'xiadd',
      to: ['xiadd0102@gmail.com'],
      subject: '验证邮箱',
      html: uuid
    })
  },

  /**
   * 根据用户名获取用户信息
   * @param  {String}  username [description]
   * @return {Promise}          [description]
   */
  async findUserByName (username) {
    return await User.findOne({ username: username })
  },

  /**
   * 根据邮箱获取用户信息
   * @param  {String}  email [用户邮箱]
   * @return {Promise}       [返回await信息]
   */
  async findUserByEmail (email) {
    return await User.findOne({ email: email })
  },

  /**
   * 获取用户列表
   * @param  {Number}  pageSize [分页信息]
   * @return {Promise}          [description]
   */
  async getUserList (pageSize) {
    return await User.find().limit(pageSize)
  },

  /**
   * 根据用户id获取用户信息
   * @param  {[type]}  id [description]
   * @return {Promise}    [description]
   */
  async getUserById (id) {
    return await User.findById(id)
  }
}
