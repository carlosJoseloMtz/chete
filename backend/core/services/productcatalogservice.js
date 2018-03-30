import jwt from 'jwt-simple'
import moment from 'moment'

class ProductCatalogService {

  constructor (productcatalogDao) {
    this.productcatalogDao = productcatalogDao
  }

  getAll () {
   return this.productcatalogDao.getAll()
  }

  create (productcatalog) {
    return this.productcatalogDao.create(productcatalog)
  }

  delete (id) {
    return this.productcatalogDao.delete(id)
  }

  update (productcatalog) {
    return this.productcatalogDao.update(productcatalog)
  }

  findById (id) {
    return this.productcatalogDao.findById(id)
  }
}

export let productCatalogService = new ProductCatalogService()
