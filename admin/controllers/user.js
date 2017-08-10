const { checkPassword } = require('../../libs/salt')
const User = require('../../services/user')

module.exports = {
  async adminUserLoginView (req, res) {
    if (req.session.user) {
      return res.redirect('/admin')
    }
    return res.render('sign/login.njk')
  },

  async adminUserLogin (req, res) {
    const userLoginInfo = req.body
    try {
      const user = await User.findUserByName(userLoginInfo.username)
      if (checkPassword(userLoginInfo.password, user.password)) {
        res.app.locals.loginUser = user
        req.session.user = userLoginInfo.username
        res.redirect('/admin')
      } else {
        res.send('登陸失败')
      }
    } catch (e) {
      res.send('用户不存在')
    }
  },

  adminUserLogout (req, res) {
    req.session.destroy()
    res.clearCookie()
    res.redirect('/admin/login')
  }
}