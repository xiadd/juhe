const mongoose = require('mongoose')
const Shcema = mongoose.Schema
const ObjectId  = Shcema.ObjectId

const commentSchema = new Shcema({
  author: ObjectId,
  article: ObjectId,
  content: String,
  created_at: { type: Date, default: new Date() }
})

commentSchema.pre('save', function (next) {
  this.updated_at = new Date()
  next()
})

mongoose.model('Comment', commentSchema)
