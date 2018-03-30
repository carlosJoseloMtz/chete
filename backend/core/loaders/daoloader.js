import ProductCatalogDao from '../dao/productcatalogdao'
import UserDao from '../dao/userdao'
import WarehouseDao from '../dao/warehousedao'

module.exports = app => {

  const warehouseDao = new WarehouseDao()
  const productCatalogDao = new ProductCatalogDao()
  const userDao = new UserDao()

  app.set('warehouseDao', warehouseDao)
  app.set('productCatalogDao', productCatalogDao)
  app.set('userDao', userDao)

}
