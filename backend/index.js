import express from 'express'
import load from 'express-load'

const app = express()
const mongoose = require("mongoose")
const config = require("./database/config.js")

mongoose.connect(config.setConfig.database)
const dataController = require('./controllers/test')
const dataController2 = require('./controllers/addtest')
app.get('/findAll', dataController.getData)
app.post('/create', dataController2.postData)

load('app/config',
  { verbose: true })
  .then('app/servicelsoader')
  .then('app/bootloader')
  .then('app/loggerloader')
  .then('middlewares')
  .then('admin')
  .then('storefront')
  .into(app)
