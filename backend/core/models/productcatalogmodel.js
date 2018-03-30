import mongoose from 'mongoose'
import BaseModel from './basemodel'
const Schema = mongoose.Schema

const ProductsCatalogSchema = new Schema ({
  ... BaseModel,

  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  targetCatalog: {
    type: Schema.Types.ObjectId,
    ref: 'Catalogs'
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Products'
    }
  ],

  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Categories'
    }
  ]
})

module.exports = mongoose.model('ProductsCatalogs', ProductsCatalogSchema)
