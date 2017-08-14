const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const config = require('../config')

const db = mongoose.connect(config.db, {
  useMongoClient:true,
  poolSize: 20
})

db.on('error', function (err) {
  console.log(err)
  process.exit(1)
})

require('./user')
require('./article')
require('./comment')

exports.User = mongoose.model('User')
exports.Article = mongoose.model('Article')
exports.Comment = mongoose.model('Comment')
