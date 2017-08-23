const User = require('../services/user')

/**
 * 验证管理员是否登录
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.adminLogin = async function (req, res, next) {
  if (req.session && req.session.user) {
    res.locals.loginUser = await User.findUserByName(req.session.user)
    return next()
  }

  return res.redirect('/admin/login')
}
