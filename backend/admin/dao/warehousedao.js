import WarehouseModel from '../../core/models/warehousemodel'


class WarehousesDao {
  async getAll() {
  var response = []
  await  WarehouseModel.find({},function(err, warehouse){
     if(err){
       console.log('no hay nada por mostrar')
     } else {
       response = warehouse
     }
   })
   return response
  }

  async findById(id) {
  var response
  await  WarehouseModel.findById(id,function(err, warehouse){
     if(err){
       console.log('no lo encontre :()')
     } else {
       response = warehouse
     }
   })
   return [response]
  }

  async delete(id) {
  var msj
  console.log('dentro del delete')
  await  WarehouseModel.remove({_id: id},function(err){
     if(err){
       console.log(' No se borro')
     } else {
       msj = 'se borro la wea esa '
     }
   })
   console.log(msj)
   return msj
  }

  async create() {
    var newWarehouse = new WarehouseModel({
      stock: [],
      address: [],
      type: 'warehouse'
    })

    let response = []
     await newWarehouse.save(function(err,warehouse){
       if(err){
        console.log('no se pudo guardar el warehouse')
      }
     })
     return [newWarehouse]
   }

   async update(warehouse) {
     var msj = ''
     var model = {
       type: warehouse.type
     }
    await  WarehouseModel.update({_id: warehouse.id},model,function(err, warehouses){
     if(err){
       console.log('no lo encontre :()')
     } else {
       msj = 'se actualizo'
     }
    })
    return 'se actualizo'
  }

}

export let warehousesDao = new WarehousesDao
