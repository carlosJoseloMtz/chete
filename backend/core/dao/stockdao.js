import StockModel from '../../core/models/stockmodel'
import WarehouseModel from '../../core/models/warehousemodel'
import ProductModel from '../../core/models/productmodel'
import * as LOG from 'winston'

class StockDao {
  async getAll () {
    let response
    await StockModel.find({}, (err, stock) => {
      if(err){
        LOG.error('Error while trying to list all the stocks')
        LOG.error(JSON.stringify(err))
      } else {
        response = stock
      }
    }).populate('product')
    return response || []
  }

  async findById (id) {
    let response
    await StockModel.findById(id, (err, stock) => {

      if(err){
        LOG.error('Error while trying to find a stock by id')
        LOG.error(JSON.stringify(err))
      } else {
        response = stock
      }

    })
    return response || []
  }

  delete (id) {
    return StockModel.remove({ _id: id })
  }

  async create (stock) {
    let response = null
    let productResponse = null
    let newStock = new StockModel({
      product: stock.product,
      stock: stock.stock
    })
    await newStock.save().then(st => {
      response = st
    })
    await ProductModel.findById(stock.product, (err, stock) => {
      if(err){
        LOG.error('Error while trying to find a stock by id')
        LOG.error(JSON.stringify(err))
      } else {
        productResponse = stock
      }
    })
    productResponse.stock.push(newStock)
    await ProductModel.update({_id: stock.product}, {stock : productResponse.stock})

    return newStock
  }

  update (stock) {
    return StockModel.update({ _id: stock.id }, stock)
  }
}

export default StockDao
