import AuthService from '../services/authservice'
import WarehouseService from '../services/warehouseservice'
import WarehouseDao from '../dao/warehousedao'


/**
 * Inject all the dependencies as required.
 */
module.exports = app => {

  // manually inject the elements to be used
  const authService =
    new AuthService(app.get('secret'),
      app.get('expiryTime'),
      app.get('expiryFactor'))

  const warehouseDao = new WarehouseDao()

  const warehouseService = new WarehouseService(warehouseDao)

  // inject the object globally to the application for later usage
  app.set('authService', authService)
  app.set('warehouseService', warehouseService)
  // TODO: maybe it would be nice to separate the service and dao loading
  app.set('warehouseDao', warehouseDao)

}
