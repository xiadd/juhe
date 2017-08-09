const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const config = require('./config')
const templateGlobal = require('./libs/staticTemplate')
require('./models')
const routes = require('./api/routes')
const adminRoutes = require('./admin/routes')
const app = express()

nunjucks
  .configure('views', {
    autoescape: true,
    express: app
  })
  .addGlobal('loadCss', templateGlobal.loadCss)
  .addGlobal('loadScript', templateGlobal.loadScript)

app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routes)
app.use('/admin', adminRoutes)

app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    url: config.redis
  }),
  resave: false,
  saveUninitialized: false,
}))

app.use(function (err, req, res, next) {
  res.json({
    code: 0,
    msg: err.message
  })
})

module.exports = app