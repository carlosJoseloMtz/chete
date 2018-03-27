import { authService } from '../services/authservice'
import { warehousesService } from '../services/warehouseservice'
import { warehousesDao } from '../dao/warehousedao'


/**
 * Inject all the dependencies as required.
 */
module.exports = app => {

  authService.secret = app.get('secret')
  authService.expiryTime = app.get('expiryTime')
  authService.expiryFactor = app.get('expiryFactor')


  warehousesServices.warehousesDao = warehousesDao

}
