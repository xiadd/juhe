const jwt = require('jsonwebtoken')

/**
 * jwt生成token
 * @param  {Object} payload   [需要加密的信息]
 * @param  {String} secret    [加密秘钥]
 * @param  {String} expiresIn [过期时间]
 * @return {String}           [token]
 */
function jwtEncode (payload, secret, expiresIn ) {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn
  })
}

module.exports = jwtEncode
