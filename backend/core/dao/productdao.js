import ProductModel from '../../core/models/productmodel'
import ProductCatalogModel from '../../core/models/productcatalogmodel'
import * as LOG from 'winston'

class ProductDao {
  async getAll () {
    let response
    await ProductModel.find({}, (err, product) => {
      if(err){
        LOG.error('Error while trying to list all the products')
        LOG.error(JSON.stringify(err))
      } else {
        response = product
      }
    }).populate('stock','catalog')
    return response || []
  }

  async findById (id) {
    let response
    await ProductModel.findById(id, (err, product) => {

      if(err){
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        response = product
      }

    })
    return response || []
  }

  async create (product) {
    let response
    let productResponse
    let newProduct = {
      approved: false,
      price: product.price,
      discounts: [],
      description: product.description,
      stock: [],
      catalog: product.catalog,
      code: product.code,
      name: product.name
    }
    let newProductModel = new ProductModel(newProduct)
    await newProductModel.save((err, newproduct ) => {
      if(err){
        LOG.error('We cant create new product')
        LOG.error(err)
      } else {
        productResponse = newproduct
      }
    })
    await ProductCatalogModel.findById(product.catalog, (err,catalog) => {
      if(err){
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        response = catalog
      }
    })
    response.products.push(newProductModel)
    await ProductCatalogModel.update({_id: response._id},{products: response.products})

    return newProductModel
  }

  delete (id) {
    return ProductModel.remove({ _id: id })
  }

  update (product) {
    return ProductModel.update({ _id: product.id }, product)
  }
}

export default ProductDao
