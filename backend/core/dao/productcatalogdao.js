import ProductModel from '../../core/models/productcatalogmodel'
import Product from '../../core/models/productcatalogmodel'
import CategoryModel from '../../core/models/categorymodel'
import StockModel from '../../core/models/stockmodel'
import * as LOG from 'winston'

class ProductCatalogDao {

  async getAll () {
    let response
    await ProductModel.find({}, (err, productCatalog) => {
      if(err){
        LOG.error('Error while trying to list all the product catalog')
        LOG.error(JSON.stringify(err))
      } else {
        response = productCatalog
      }
    })

    return response || []
  }

  async findById (id) {
    let response
    await ProductModel.findById(id, (err, productCatalog) => {

      if(err){
        LOG.error('Error while trying to find a product catalog by id')
        LOG.error(JSON.stringify(err))
      } else {
        response = productCatalog
      }

    })
    return response || []
  }

  delete (id) {
    return ProductModel.remove({ _id: id })
  }

  async create (productCatalog) {
    console.log(productCatalog)
    let newProductModel = new ProductModel({
      name: productCatalog.name,
      description: productCatalog.description,
      products: [],
      category: []})

    await newProductModel.save()

    return newProductModel
  }

  update (productCatalog) {
    return ProductModel.update({ _id: productCatalog.id }, productCatalog)
  }
}

export default ProductCatalogDao
