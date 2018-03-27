import WarehouseModel from '../../core/models/warehousemodel'
import AddressModel from '../../core/models/addressmodel'
import StockModel from '../../core/models/stockmodel'

class WarehousesDao {
  async getAll () {
  var response
  await  WarehouseModel.find({},function(err, warehouse){
     if(err){
       console.log('no hay nada por mostrar')
     } else {
       response = warehouse
     }
   }).populate('address')
   return response || []
  }

  async findById (id) {
  let response
  await  WarehouseModel.findById(id,function(err, warehouse){
     if(err){
       console.log('no lo encontre :()')
     } else {
       response = warehouse
     }
   })
   return response || []
  }

  async delete (id) {
  var msj
  await  WarehouseModel.remove({_id: id},function(err){
     if(err){
       console.log(' No se borro')
     } else {
       msj = 'se borro la wea esa '
     }
   })
   return msj
  }

  async create (warehouse) {
    var newAddressModel = new AddressModel(warehouse.address)
    await newAddressModel.save(function(err,doc){
     if(err){
          console.log('no se pudo guardar el modelo')
     }
    })

    var newWarehouse = new WarehouseModel({
                              "type": warehouse.type,
                              "address": newAddressModel,
                              "stock": []})
    await newWarehouse.save(function(err,doc){
      if(err){
        console.log('no se pudo guardar el warehouse')
      } else {
        console.log(doc)
      }
     })
     return [newWarehouse]
   }

   async update (warehouse) {
     var msj = ''
     await  WarehouseModel.update({_id: warehouse.id},warehouse,function(err, warehouses){
       if(err){
         console.log('no lo encontre :()')
       } else {
         msj = 'se actualizo'
       }
      })
      return msj
  }
}

export let warehousesDao = new WarehousesDao
