const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Shcema = mongoose.Schema
const ObjectId  = Shcema.ObjectId

const articleSchema = new Shcema({
  title: String,
  tag: String,
  short_intro: String,
  content: String,
  created_at: { type: Date, default: new Date() }
})

articleSchema.plugin(mongoosePaginate)
articleSchema.pre('save', function (next) {
  this.updated_at = new Date()
  next()
})

mongoose.model('Article', articleSchema)