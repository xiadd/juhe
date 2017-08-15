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

const adminSession =  session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
    db: config.redis_db,
    pass: config.redis_password
  }),
  resave: false,
  saveUninitialized: false
})

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
app.use('/admin', adminSession, adminRoutes)

// 404处理
app.use(function (req, res, next) {
  res.status(404).render('error/site_404.njk')
})

app.use(function (err, req, res, next) {
  console.log(err)
  res.json({
    code: -1,
    msg: err.message
  })
})

module.exports = app
