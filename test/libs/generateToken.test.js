const User = require('../../services/user.js')
const { expect } = require('chai')

// 用户部分
describe('libs', function () {
  it('生成jwt', async function () {
    try {
      const user = await User.findUserByName('xiadd')
      expect(user).to.be.an('object')
      expect(user.username).to.be.equal('xiadd')
    } catch (err) {
      done(err)
    }
  })
})