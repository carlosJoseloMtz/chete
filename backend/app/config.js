import bodyParser from 'body-parser'
import path from 'path'
import mongoose from 'mongoose'
import express from 'express'
import nodemailer from 'nodemailer'


module.exports = app => {
  app.set('port', process.env.PORT || 3030)

  // database conection
  app.set('dbconection',process.env.DB_CONNECTION || 'mongodb://127.0.0.1:27017/cheteDB',{useMongoClient: true})


  // application / json EVERYTHING <3
  app.set('json spaces', 2)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/media', express.static('/home/rafa/CALECHE/productsImages'));

  // token stuff (JWT)
  app.set('secret', process.env.AUTH_SECRET || 'CHANGE_ME')
  app.set('expiryTime', process.env.TOKEN_EXPT || '24')
  app.set('expiryFactor', process.env.TOKEN_EXPF || 'hours')

  // logging system stuff!
  app.set('loggerDirectory', process.env.LOGGING_DIR || path.join(__dirname, 'log'))
  app.set('logLevel', process.env.LOG_LEVEL || 'debug')
  app.set('logName', process.env.APP_NAME || 'express-boilerplate')
}
