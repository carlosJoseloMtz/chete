import express from 'express'
import load from 'express-load'
import plugins from './plugins'

const app = express()

const loader = load('app/config', { verbose: true })

// load each of the plugins into the app's context!
plugins.forEach((value) => {
  loader.then(value)
})

loader.into(app)
