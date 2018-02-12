import bodyParser from 'body-parser'
import path from 'path'

module.exports = app => {
  app.set('port', process.env.PORT || 3030)

  // application / json EVERYTHING <3
  app.set('json spaces', 2)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // token stuff (JWT)
  app.set('secret', process.env.AUTH_SECRET || 'CHANGE_ME')
  app.set('expiryTime', process.env.TOKEN_EXPT || '24')
  app.set('expiryFactor', process.env.TOKEN_EXPF || 'hours')

  // logging system stuff!
  app.set('loggerDirectory', process.env.LOGGING_DIR || path.join(__dirname, 'log'))
  app.set('logLevel', process.env.LOG_LEVEL || 'debug')
  app.set('logName', process.env.APP_NAME || 'express-boilerplate')
}
