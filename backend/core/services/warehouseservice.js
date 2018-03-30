import jwt from 'jwt-simple'
import moment from 'moment'

class WarehousesService {

  constructor (warehousesDao) {
    this.warehousesDao = warehousesDao
  }

  getAll () {
    return this.warehousesDao.getAll()
  }

  create (warehouse) {
    return this.warehousesDao.create(warehouse)
  }

  delete (id) {
    return this.warehousesDao.delete(id)
  }

  update (warehouse) {
    return this.warehousesDao.update(warehouse)
  }

  findById (id) {
    return this.warehousesDao.findById(id)
  }
}

export let warehousesService = new WarehousesService()
