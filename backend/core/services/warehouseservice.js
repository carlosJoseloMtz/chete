import jwt from 'jwt-simple'
import moment from 'moment'
import { warehousesDao } from '../dao/warehousedao'

class WarehousesService {

  getAll () {
    return warehousesDao.getAll()
  }

  create (warehouse) {
    return warehousesDao.create(warehouse)
  }

  delete (id) {
    return warehousesDao.delete(id)
  }

  update (warehouse) {
    return warehousesDao.update(warehouse)
  }

  findById (id) {
    return warehousesDao.findById(id)
  }
}

export let warehousesService = new WarehousesService
