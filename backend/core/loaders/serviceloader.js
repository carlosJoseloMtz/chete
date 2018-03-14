import { authService } from '../services/authservice'


/**
 * Inject all the dependencies as required.
 */
module.exports = app => {

  console.log('remove me :V')

  authService.secret = app.get('secret')
  authService.expiryTime = app.get('expiryTime')
  authService.expiryFactor = app.get('expiryFactor')

}
