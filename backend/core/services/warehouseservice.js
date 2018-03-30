import jwt from 'jwt-simple'
import moment from 'moment'

class WarehouseService {

  constructor (warehouseDao) {
    if (!warehouseDao) {
      console.warn(
        'Required warehouse dao was not passed to the warehouseService!')
    }
    this.warehouseDao = warehouseDao
  }

  getAll () {
    return this.warehouseDao.getAll()
  }

  create (warehouse) {
    return this.warehouseDao.create(warehouse)
  }

  delete (id) {
    return this.warehouseDao.delete(id)
  }

  update (warehouse) {
    return this.warehouseDao.update(warehouse)
  }

  findById (id) {
    return this.warehouseDao.findById(id)
  }
}

export default WarehouseService
