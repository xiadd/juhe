const util = require('util')
const User = require('../../services/user')
const { checkPassword } = require('../../libs/salt')
const jwtEncode = require('../../libs/generateToken')
const config = require('../../config')

module.exports = {
  async userRegister (req, res, next) {
    req.checkBody({
      username: {
        notEmpty: {
          errorMessage: 'username不能为空'
        },
        isLength: {
          options: [{ min: 5, max: 10 }],
          errorMessage: '用户名长度必须为2-10'
        }
      },
      password: {
        notEmpty: {
          errorMessage: 'password不能为空'
        }
      },
      email: {
        notEmpty: {
          errorMessage: 'email不能为空'
        },
        isEmail: {
          errorMessage: 'email必须为合法邮箱'
        }
      }
    })
    const userForm = req.body
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      res.json({
        code: -1,
        errors: result.array()
      })
      return
    }
    try {
      const user = await User.createUser(userForm)
      res.json({
        msg: '注册成功',
        code: 1
      })
      await User.userConfirm(userForm.email)
    } catch (e) {
      next(e)
    }
  },

  async userLogin (req, res, next) {
    req.checkBody({
      username: {
        notEmpty: {
          errorMessage: 'username不能为空'
        }
      },
      password: {
        notEmpty: {
          errorMessage: 'password不能为空'
        }
      }
    })
    const userLoginInfo = req.body
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      res.json({
        code: -1,
        errors: result.array()
      })
      return
    }
    try {
      const user = await User.findUserByName(userLoginInfo.username)
      if (checkPassword(userLoginInfo.password, user.password)) {
        const token = jwtEncode({
          username: userLoginInfo.username,
          id: user._id
        }, config.jwt_secret, '10 days')
        res.json({
          code: 1,
          data: {
            token: token
          }
        })
      } else {
        res.json({
          code: -1,
          msg: '登录失败'
        })
      }
    } catch (e) {
      next(e)
    }
  }
}
