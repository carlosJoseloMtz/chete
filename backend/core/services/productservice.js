import jwt from 'jwt-simple'
import moment from 'moment'

class ProductService {

  constructor (productDao) {
    this.productDao = productDao
  }

  getAll () {
    return this.productDao.getAll()
  }

  delete (id) {
    return this.productDao.delete(id)
  }

  create (product) {
    return this.productDao.create(product)
  }

  update (product) {
    return this.productDao.update(product)
  }

  updateImage (product, image) {
    return this.productDao.updateImage(product, image)
  }

  reloadImage (product) {
    return this.productDao.reloadImage(product)
  }

  findById (id) {
    return this.productDao.findById(id)
  }
}

export default ProductService
