const User = require('../services/user')

exports.apiLogin = async function (req, res, next) {
  console.log(req.session)
  if (req.session && req.session.user) {
    res.locals.loginUser = await User.findUserByName(req.session.user)
    return next()
  }

  return res.status(403).json({
    code: -1,
    msg: '请登录后再进行操作'
  })
}
