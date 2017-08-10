const mongoose = require('mongoose')
const Shcema = mongoose.Schema

const salt = require('../libs/salt')

const userSchema = new Shcema({
  username: String,
  password: String,
  email: String,
  valid: { type: Boolean, default: false },
  admin: { type: Boolean, default: false }
})

userSchema.index({username: 1}, {unique: true})
userSchema.index({email: 1}, {unique: true})

userSchema.pre('save', function (next) {
  this.password = salt.passwordSalt(this.password)
  next()
})

mongoose.model('User', userSchema)