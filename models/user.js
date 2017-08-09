const mongoose = require('mongoose')
const Shcema = mongoose.Schema

const userSchema = new Shcema({
  username: String,
  password: String,
  email: String,
  valid: { type: Boolean, default: false },
  admin: { type: Boolean, default: false }
})

userSchema.index({username: 1}, {unique: true})
userSchema.index({email: 1}, {unique: true})

mongoose.model('User', userSchema)