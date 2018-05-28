import ProductModel from '../../core/models/productcatalogmodel'
import Product from '../../core/models/productmodel'
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
    let response
    let newProductModel = new ProductModel({
      name: productCatalog.name,
      description: productCatalog.description,
      products: [],
      online: productCatalog.online,
      category: productCatalog.category})

    await newProductModel.save()

    return newProductModel
  }

  update (productCatalog) {
    return ProductModel.update({ _id: productCatalog.id }, productCatalog)
  }

  async clone (productCatalog) {
    let original
    let destiny
    let success = true
    let products
    let error
    await  ProductModel.findById(productCatalog.base, (err, product) => {
        if(err){
          LOG.error('Error while trying to find a product by id')
          LOG.error(JSON.stringify(err))
        } else {
          original = product
        }
    })

    await  ProductModel.findById(productCatalog.to, (err, product) => {
        if(err){
          LOG.error('Error while trying to find a product by id')
          LOG.error(JSON.stringify(err))
        } else {
          destiny = product
        }
    })

    products = original.products
    destiny.category = original.category
    products.forEach( product =>  {
      destiny.products.push(product)
    })

    await ProductModel.findByIdAndUpdate(productCatalog.to ,{products : destiny.products})

    if (original.products.length > 0) {
      original.products.forEach(async (product, indice) =>  {
        await Product.findByIdAndUpdate(product, {catalog: destiny._id, approved: true, category: destiny.category }).then(prod => {
            success = true
        }).catch(_ => {
          success = false
        })
      })
      if (success) {
        await ProductModel.remove({_id: original._id})
      }
      return success == true ?'catalog updated successfull': 'one or more product cant be updated'
    } else {
      return `the catalog base ${original.name} dont have any product`
    }
  }
}

export default ProductCatalogDao
