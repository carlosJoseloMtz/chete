import express from 'express'
import load from 'express-load'

const app = express()

// load the full application!!
load('app/config',
  { verbose: true })
  .then('app/servicelsoader')
  .then('app/bootloader')
  .then('app/loggerloader')
  .then('middlewares')
  .then('admin')
  .then('storefront')
  .into(app)
