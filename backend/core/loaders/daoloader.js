import ProductCatalogDao from '../dao/productcatalogdao'
import UserDao from '../dao/userdao'
import WarehouseDao from '../dao/warehousedao'
import JobDao from '../dao/jobdao'

module.exports = app => {

  const warehouseDao = new WarehouseDao()
  const productCatalogDao = new ProductCatalogDao()
  const userDao = new UserDao()
  const jobDao = new JobDao()

  app.set('warehouseDao', warehouseDao)
  app.set('productCatalogDao', productCatalogDao)
  app.set('userDao', userDao)
  app.set('jobDao', jobDao)

}
