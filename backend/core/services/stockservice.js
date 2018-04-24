import jwt from 'jwt-simple'
import moment from 'moment'

class StockService {

  constructor (stockDao) {
    this.stockDao = stockDao
  }

  getAll () {
    return this.stockDao.getAll()
  }

  delete (id) {
    return this.stockDao.delete(id)
  }

  create (stock) {
    return this.stockDao.create(stock)
  }

  update (stock) {
    return this.stockDao.update(stock)
  }

  findById (id) {
    return this.stockDao.findById(id)
  }
}

export default StockService
