import winston from 'winston'
import { authService } from '../services/authservice'

const LOG = winston

module.exports = app => {
  app.get('/test', (req, res) => {
    const tstToken = {
      thisis: 'nice :D'
    }

    LOG.info('this is an info message')
    LOG.debug('this is a debug :V')

    const fakeToken =
      authService.encodeToken(tstToken)

    res.json({
      hello: 'world :) <3',
      fakeToken
    })
  })

  app.get('/authorized/test', (req, res) => {

    res.json({
      payload: authService.decodeToken(req.headers.authorization),
      isTokenValid: authService.isTokenValid(req.headers.authorization)
    })

  })
}
