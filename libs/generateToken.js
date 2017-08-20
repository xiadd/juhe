const jwt = require('jsonwebtoken')

// 加密
function jwtEncode (payload, secret, expiresIn ) {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn
  })
}

module.exports = jwtEncode
