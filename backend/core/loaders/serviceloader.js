import { authService } from '../services/authservice'
import { warehousesService }  from '../services/warehouseservice'
import { warehousesDao }  from '../dao/warehousedao'
import { productCatalogService }  from '../services/productcatalogservice'
import { productcatalogDao }  from '../dao/productcatalogdao'


/**
 * Inject all the dependencies as required.
 */
module.exports = app => {
  authService.secret = app.get('secret')
  authService.expiryTime = app.get('expiryTime')
  authService.expiryFactor = app.get('expiryFactor')
  warehousesService.warehousesDao = warehousesDao
  productCatalogService.productcatalogDao = productcatalogDao
}
