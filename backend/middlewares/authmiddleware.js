import authRequired from '../app/authroutes'
import * as LOG from 'winston'

const generateError = (res, status) => {
  return res.status(status).json({
    error: true,
    message:
      `Could not open due to the access is ${status == 401 ? 'Unauthorized' : 'Forbidden'}`
  })
}

const authmiddleware = (req, res, next) => {
  const header = req.headers.authorization

  if (!header) {
    return generateError(res, 401)
  }

  try {
    const isValid = authService.isTokenValid(header)

    if (!isValid) {
      return generateError(res, 403)
    }
  } catch (ex) {
    console.error('Error while trying to decode the token')
    return generateError(res, 403)
  }

  next()
}


module.exports = app => {
  LOG.debug('Secured routes:')
  const authService = app.get('authService')
  authRequired.routes.forEach(route => {
    LOG.debug(`${route.method} - ${route.url}`)
    // don't quite like to do this but.. Yeap.. eval :V
    eval(`app.${route.method}('${route.url}',
        (req, res, next) => {
          const authService = app.get('authService')
          LOG.debug('Checking root using authservice', authService)
          authmiddleware(req, res, next)
        })
      `)
  })
}
