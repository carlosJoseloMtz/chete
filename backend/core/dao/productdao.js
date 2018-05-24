import ProductModel from '../../core/models/productmodel'
import ProductCatalogModel from '../../core/models/productcatalogmodel'
import StockModel from '../../core/models/stockmodel'
import im from 'imagemagick'
import environment from '../../commons/environment-configuration'
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

  async delete (id) {
    let response
    let productCatalog
    let stock
    let index
    await  ProductModel.findById(id, (err, product) => {
        if(err){
          LOG.error('Error while trying to find a product by id')
          LOG.error(JSON.stringify(err))
        } else {
          response = product
        }
    })


    await ProductCatalogModel.findById(response.catalog, (err, catalog) => {
      if(err){
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        productCatalog = catalog
      }
    })

    productCatalog.products.forEach(function(product,indice) {
      if (id == product) {
        index = indice
        return
      }
    })

    productCatalog.products.splice(index, 1)
    await ProductCatalogModel.update({_id: response.catalog},{products: productCatalog.products})

    await StockModel.findOne({"product": id}, (err, s) => {
      if(err){
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        stock = s
      }
    })

    if (stock) {
      await StockModel.remove({ _id: stock._id })
    }

    return  await ProductModel.remove({ _id: id })
  }

  update (product) {
    return ProductModel.update({ _id: product.id }, product)
  }

  async reloadImage (product) {
    let response
    await ProductModel.findOne({"code": product.productCode}, (err, p) => {
      if(err){
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        response = p
      }
    })
    response.image.mainImageSrc = product.main === true ? response.image.gallery[product.gallery] : response.image.mainImageSrc
    response.image.thumbnailSrc = product.thumbnail === true ? response.image.gallery[product.gallery] : response.image.thumbnailSrc
    await ProductModel.update({ _id: response._id }, response)
    return response
  }

  async updateImage (product, image) {
    let response
    im.resize(
      { srcPath: `${environment.baseImageUrl}/${image}`,
        dstPath: `${environment.baseImageUrl}/${image}-small`,
        width:   200,
        height: 200,
        quality: 0.8
      }, function(err, stdout, stderr){
        if (err) throw err;
        console.log('resized image 200x200');
    });
    im.resize({
        srcPath: `${environment.baseImageUrl}/${image}`,
        width:   900,
        height: 900,
        dstPath: `${environment.baseImageUrl}/${image}-big`,
        quality: 0.8
      }, function(err, stdout, stderr){
        if (err) throw err;
        console.log('resized image 900x900');
    });
    await ProductModel.findById({"_id": product.id}, (err, p) => {
      if(err){
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        response = p
      }
    })
    response.image.gallery.push(image)
    response.image.mainImageSrc = product.main === 'true' ? image : response.image.mainImageSrc
    response.image.thumbnailSrc = product.thumbnail === 'true' ? image : response.image.thumbnailSrc
    await ProductModel.update({ _id: product.id }, response)
    return response
  }
}

export default ProductDao
