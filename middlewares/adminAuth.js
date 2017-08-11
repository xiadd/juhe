const User = require('../services/user')

exports.adminLogin = async function (req, res, next) {
  if (req.session.user) {
    res.locals.loginUser = await User.findUserByName(req.session.user)
    return next()
  }

  return res.redirect('/admin/login')
}