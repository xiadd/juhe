const User = require('../../services/user')
const { checkPassword } = require('../../libs/salt')
const jwtEncode = require('../../libs/generateToken')
const config = require('../../config')

module.exports = {
  async userRegister (req, res, next) {
    const userForm = req.body
    try {
      const user = await User.createUser(userForm)
      res.json({
        msg: '注册成功',
        code: 1
      })
      await User.userConfirm(userForm.email)
    } catch (e) {
      next(e)
    }
  },

  async userLogin (req, res, next) {
    const userLoginInfo = req.body
    try {
      const user = await User.findUserByName(userLoginInfo.username)
      if (checkPassword(userLoginInfo.password, user.password)) {
        const token = jwtEncode({
          username: userLoginInfo.username
        }, config.jwt_secret, '10 days')
        res.json({
          code: 1,
          data: {
            token: token
          }
        })
      } else {
        res.json({
          code: -1,
          msg: '登录失败'
        })
      }
    } catch (e) {
      next(e)
    }
  }
}
