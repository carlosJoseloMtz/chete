import WarehouseModel from '../../core/models/warehousemodel'
import AddressModel from '../../core/models/addressmodel'
import StockModel from '../../core/models/stockmodel'
import * as LOG from 'winston'

class WarehouseDao {
  async getAll () {
    let response
    await WarehouseModel.find({}, (err, warehouse) => {
      if(err){
        LOG.error('Error while trying to list all the warehouses')
        LOG.error(JSON.stringify(err))
      } else {
        response = warehouse
      }
    }).populate('address')
    return response || []
  }

  async findById (id) {
    let response
    await WarehouseModel.findById(id, (err, warehouse) => {

      if(err){
        LOG.error('Error while trying to find a warehouse by id')
        LOG.error(JSON.stringify(err))
      } else {
        response = warehouse
      }

    })
    return response || []
  }

  delete (id) {
    return WarehouseModel.remove({ _id: id })
  }

  async create (warehouse) {
    let newAddressModel = new AddressModel(warehouse.address)
    await newAddressModel.save()

    let newWarehouse = new WarehouseModel({
      type: warehouse.type,
      address: newAddressModel,
      stock: [],
      name: warehouse.name
    })
    await newWarehouse.save()

    return newWarehouse
  }

  update (warehouse) {
    return WarehouseModel.update({ _id: warehouse.id }, warehouse)
  }
}

export default WarehouseDao
