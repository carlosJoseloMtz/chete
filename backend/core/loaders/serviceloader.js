import AuthService  from '../services/authservice'
import WarehouseService from '../services/warehouseservice'
import ProductCatalogService from '../services/productcatalogservice'
import ProductService from '../services/productservice'
import CategoryService from '../services/categoryservice'
import ProductCatalogDao from '../dao/productcatalogdao'
import ProductDao from '../dao/productdao'
import CategoryDao from '../dao/categorydao'
import UserService from '../services/userservice'
import WarehouseDao from '../dao/warehousedao'
import StockService from '../services/stockservice'
import StockDao from '../dao/stockdao'
import UserDao from '../dao/userdao'
import TokenDao from '../dao/tokendao'
import MailService  from '../services/mailservice'
/**
 * Inject all the dependencies as required.
 */
module.exports = app => {

  // manually inject the elements to be used
  const authService =
    new AuthService(app.get('secret'),
      app.get('expiryTime'),
      app.get('expiryFactor'))

  const productDao = new ProductDao()

  const categoryDao = new CategoryDao()

  const warehouseDao = new WarehouseDao()

  const productCatalogDao = new ProductCatalogDao()

  const stockDao = new StockDao()

  const userDao = new UserDao()

  const tokenDao = new TokenDao()

  const userService = new UserService(app.get('passwordCheckStrategy'),
    authService, app.get('userDao'), app.get('tokenDao'))

  const productCatalogService =  new ProductCatalogService(productCatalogDao)

  const productService = new ProductService(productDao)

  const categoryService = new CategoryService(categoryDao)

  const warehouseService = new WarehouseService(warehouseDao)

  const stockService = new StockService(stockDao)

  const mailService = new MailService(app.get('userDao'))

  // inject the object globally to the application for later usage
  app.set('authService', authService)
  app.set('warehouseService', warehouseService)
  app.set('productCatalogService', productCatalogService)
  app.set('productService', productService)
  app.set('categoryService', categoryService)
  app.set('stockService', stockService)
  app.set('userService', userService)
  app.set('mailService', mailService)
  // TODO: maybe it would be nice to separate the service and dao loading
  app.set('warehouseDao', warehouseDao)
  app.set('productCatalogDao', productCatalogDao)
  app.set('productDao', productDao)
  app.set('categoryDao', categoryDao)
  app.set('stockDao', stockDao)
}
