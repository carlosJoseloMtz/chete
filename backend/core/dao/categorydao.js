import CategoryModel from '../../core/models/categorymodel'
import ProductCategoryModel from '../../core/models/productcatalogmodel'
import * as LOG from 'winston'

class CategoryDao {
  async getAll () {
    let response
    await CategoryModel.find({}, (err, product) => {
      if(err){
        LOG.error(`Error while trying to list all the products`)
        LOG.error(JSON.stringify(err))
      } else {
        response = product
      }
    }).populate('category')
    return response || []
  }

  async findById (id) {
    let response
    await CategoryModel.findById(id, (err, product) => {
      if(err){
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        response = product
      }
    })
    return response || []
  }

  async create (category) {
    let newCategory = {
      description: category.description,
      products: [],
      name: category.name
    }
    let newCategoryModel = new CategoryModel(newCategory)
    await newCategoryModel.save()
    return newCategoryModel
  }

  delete (id) {
    return CategoryModel.remove({ _id: id })
  }

  update (product) {
    return CategoryModel.update({ _id: product.id }, product)
  }
}

export default CategoryDao
