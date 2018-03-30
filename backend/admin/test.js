import winston from 'winston'
import { success, failed } from '../commons/responses'

const LOG = winston

module.exports = app => {
  const authService = app.get('authService')
  const userService = app.get('userService')
  const jobExecutorStrategy = app.get('jobExecutorStrategy')

  app.get('/jobtest/:jobname', (req, res) => {
    const jobname = req.params.jobname

    jobExecutorStrategy.execute(jobname)
    res.json(success())
  })

  app.get('/logintest', (req, res) => {
    const username = req.query.username
    const password = req.query.pwd

    userService.login(username, password)
      .then(token => res.json(success(token)))
      .catch(_ => res.status(500).json(failed()))
  })

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
