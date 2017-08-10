const User = require('../../services/user')

module.exports = {
  async adminIndexView (req, res) {
    const user = await User.findUserByName(req.session.user)
    res.render('home/index.njk')
  },

  async UserListView (req, res, next) {
    try {
      const userList = await User.getUserList(20)
      res.render('home/userList.njk', {
        userList: userList
      })
    } catch (e) {
      next(e)
    }
  },

  async UserDetailView (req, res, next) {
    try {
      const id = req.params.id
      const user = await User.getUserById(id)
      res.render('home/userDetail.njk', {
        user: user
      })
    } catch (e) {
      next(e)
    }

  }
}