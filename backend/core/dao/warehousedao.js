import WarehouseModel from '../../core/models/warehousemodel'
import AddressModel from '../../core/models/addressmodel'
import StockModel from '../../core/models/stockmodel'
import * as LOG from 'winston'

class WarehousesDao {
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
    await WarehouseModel.findById(id, function (err, warehouse) {

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
    /*
     await newAddressModel.save((err,doc) => {
     if(err){
          console.log('no se pudo guardar el modelo')
     } else {
       // save the warehouse
     }
    })
    */

    let newWarehouse = new WarehouseModel({
                              type: warehouse.type,
                              address: newAddressModel,
                              stock: []})

    // chain the promises for each transaction
    await Promise.all([newAddressModel.save(), newWarehouse.save()])

    /*
    await newWarehouse.save(function(err,doc){
      if(err){
        console.log('no se pudo guardar el warehouse')
      } else {
        console.log(doc)
      }
     })
    */
     return newWarehouse
   }

   update (warehouse) {
     return WarehouseModel.update({ _id: warehouse.id }, warehouse)
   }
}

export let warehousesDao = new WarehousesDao()
