import AuthService  from '../services/authservice'
import WarehouseService from '../services/warehouseservice'
import ProductCatalogService from '../services/productcatalogservice'
import UserService from '../services/userservice'


/**
 * Inject all the dependencies as required.
 */
module.exports = app => {

  // manually inject the elements to be used
  const authService =
    new AuthService(app.get('secret'),
      app.get('expiryTime'),
      app.get('expiryFactor'))


  const warehouseService = new WarehouseService(app.get('warehouseDao'))

  const productCatalogService =
    new ProductCatalogService(app.get('productCatalogDao'))

  const userService =
    new UserService(app.get('passwordCheckStrategy'),
      authService, app.get('userDao'))


  // inject the object globally to the application for later usage
  app.set('authService', authService)
  app.set('warehouseService', warehouseService)
  app.set('productCatalogService', productCatalogService)
  app.set('userService', userService)

}
