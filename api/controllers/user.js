const User = require('../../services/user')

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
    
  }
}
