const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const log4js = require('log4js')
const session = require('express-session')
const expressValidator = require('express-validator')
const jwt = require('express-jwt')
const RedisStore = require('connect-redis')(session)
const config = require('./config')
const templateGlobal = require('./libs/staticTemplate')
require('./models')
const logConfig = require('./log')
const routes = require('./api/routes')
const adminRoutes = require('./admin/routes')
const app = express()

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: 'logs/log4jsconnect.log' }
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' },
    log4jslog: { appenders: ['file'], level: 'debug' }
  }
})
const logger = log4js.getLogger('log4jslog')

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

const apiJwt = jwt({
  secret: config.jwt_secret,
  credentialsRequired: false,
  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
})

nunjucks
  .configure('views', {
    autoescape: true,
    express: app
  })
  .addGlobal('loadCss', templateGlobal.loadCss)
  .addGlobal('loadScript', templateGlobal.loadScript)

app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(expressValidator())

app.use('/api', apiJwt, routes)
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
