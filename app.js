const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const config = require('./config')
require('./models')
const routes = require('./api/routes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routes)

app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    url: config.redis
  }),
  resave: false,
  saveUninitialized: false,
}))

app.use(function (err, req, res, next) {
  console.log(err)
  res.json({
    code: 0,
    msg: err.message
  })
})

module.exports = app