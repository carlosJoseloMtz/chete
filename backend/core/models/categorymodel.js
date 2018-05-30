import mongoose from 'mongoose'
import BaseModel from './basemodel'
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  ...BaseModel,

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  /**
   * Category belongs only one Catalog
   * this is the way to say is one to one
   */
  catalog: {
    type: Schema.Types.ObjectId,
    ref: 'ProductsCatalogs'
  },

  /**
   * Category have many Products
   * this is the way to say is one to many
   */
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Products',
      index: true
    }
  ]
})

module.exports = mongoose.model('Categories', CategorySchema)
