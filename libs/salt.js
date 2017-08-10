const crypto = require('crypto');

function passwordSalt (password) {
  const key = crypto.pbkdf2Sync(password, 'salt', 100000, 32, 'sha512');
  return key.toString('hex')
}

function checkPassword (password, hash) {
  return crypto.pbkdf2Sync(password, 'salt', 100000, 32, 'sha512').toString('hex') === hash
}

module.exports = {
  passwordSalt,
  checkPassword
}