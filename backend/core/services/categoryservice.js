import jwt from 'jwt-simple'
import moment from 'moment'

class CategoryService {

  constructor (categorytDao) {
    this.categorytDao = categorytDao
  }

  getAll () {
    return this.categorytDao.getAll()
  }

  delete (id) {
    return this.categorytDao.delete(id)
  }

  create (product) {
    return this.categorytDao.create(product)
  }

  update (product) {
    return this.categorytDao.update(product)
  }

  findById (id) {
    return this.categorytDao.findById(id)
  }
}

export default CategoryService
