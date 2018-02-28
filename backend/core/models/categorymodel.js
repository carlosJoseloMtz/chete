import mongoose from 'moongose'
import BaseModel from './basemodel'

const CategorySchema = new Schema({
  ...BaseModel,

  id: {
    type: Number,
    autoIncrement: true,
    primaryKey:  true
  },

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
    ref: 'Catalogs'
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
