import jwt from 'jwt-simple'
import moment from 'moment'
import { warehousesDao } from '../../admin/dao/warehousedao'

class WarehousesService {

  async getAll () {
    return warehousesDao.getAll()
  }

  create () {
    return warehousesDao.create()
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
