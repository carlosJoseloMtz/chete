import AuthService  from '../services/authservice'
import WarehouseService from '../services/warehouseservice'
import WarehouseDao from '../dao/warehousedao'
import ProductCatalogService from '../services/productcatalogservice'
import ProductService from '../services/productservice'
import CategoryService from '../services/categoryservice'
import ProductCatalogDao from '../dao/productcatalogdao'
import ProductDao from '../dao/productdao'
import CategoryDao from '../dao/categorydao'

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

  const productCatalogDao = new ProductCatalogDao()

  const productDao = new ProductDao()

  const categoryDao = new CategoryDao()

  const warehouseService = new WarehouseService(warehouseDao)

  const productCatalogService = new ProductCatalogService(productCatalogDao)

  const productService = new ProductService(productDao)

  const categoryService = new CategoryService(categoryDao)
  // inject the object globally to the application for later usage
  app.set('authService', authService)
  app.set('warehouseService', warehouseService)
  app.set('productCatalogService', productCatalogService)
  app.set('productService', productService)
  app.set('categoryService', categoryService)
  // TODO: maybe it would be nice to separate the service and dao loading
  app.set('warehouseDao', warehouseDao)
  app.set('productCatalogDao', productCatalogDao)
  app.set('productDao', productDao)
  app.set('categoryDao', categoryDao)
}
