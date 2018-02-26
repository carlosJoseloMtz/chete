import express from 'express'
import load from 'express-load'

const app = express()
const mongoose = require("mongoose")
const config = require("./database/config.js")
const bodyParser = require("body-parser")

mongoose.connect(config.setConfig.database)
const dataController = require('./controllers/test')
const dataController2 = require('./controllers/addtest')
const dataController3 = require('./controllers/product-controller')



app.get('/findAll', dataController.getData)
app.post('/create', dataController2.postData)
app.get('/products', dataController3.findAll)
app.put('/productUpdate', dataController3.update)

load('app/config',
  { verbose: true })
  .then('app/servicelsoader')
  .then('app/bootloader')
  .then('app/loggerloader')
  .then('middlewares')
  .then('admin')
  .then('storefront')
  .into(app)
