const User = require('../services/user')

exports.apiLogin = async function (req, res, next) {
  if (req.user) {
    return next()
  }

  return res.status(403).json({
    code: -1,
    msg: '请登录后再进行操作'
  })
}
