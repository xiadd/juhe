const uuidv5 = require('uuid/v5')
const { User } = require('../models')
const sendMail = require('../libs/mail')

module.exports = {
  async createUser (schenma) {
    const newUser = new User(schenma)
    return await newUser.save()
  },

  async updateUser () {

  },

  async userConfirm (email) {
    const uuid = uuidv5(email, uuidv5.DNS)
    return await sendMail({
      from: 'xiadd',
      to: ['xiadd0102@gmail.com'],
      subject: '验证邮箱',
      html: uuid
    })
  },

  async findUserByName (username) {
    return await User.findOne({ username: username })
  },

  async findUserByEmail (email) {
    return await User.findOne({ email: email })
  }
}