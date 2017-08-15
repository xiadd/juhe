const User = require('../../services/user')
const { checkPassword } = require('../../libs/salt')

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
        console.log(req.session)
        req.session.user = userLoginInfo.username
        res.json({
          code: 1,
          msg: '登录成功'
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
