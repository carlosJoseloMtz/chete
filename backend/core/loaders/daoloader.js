import ProductCatalogDao from '../dao/productcatalogdao'
import UserDao from '../dao/userdao'
import WarehouseDao from '../dao/warehousedao'
import JobDao from '../dao/jobdao'
import CategoryDao from '../dao/categorydao'
import ProductDao from '../dao/categorydao'
import StockDao from '../dao/stockdao'
import TokenDao from '../dao/tokendao'

module.exports = app => {

  const warehouseDao = new WarehouseDao()
  const productCatalogDao = new ProductCatalogDao()
  const userDao = new UserDao()
  const jobDao = new JobDao()
  const categoryDao = new CategoryDao()
  const productDao = new ProductDao()
  const stockDao = new StockDao()
  const tokenDao = new TokenDao()

  app.set('warehouseDao', warehouseDao)
  app.set('productCatalogDao', productCatalogDao)
  app.set('userDao', userDao)
  app.set('jobDao', jobDao)
  app.set('categoryDao', CategoryDao)
  app.set('productDao', ProductDao)
  app.set('stockDao', stockDao)
  app.set('tokenDao', tokenDao)
}
