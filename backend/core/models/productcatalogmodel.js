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
let ProductsCatalogs = mongoose.model('ProductsCatalogs', ProductsCatalogSchema)
module.exports = ProductsCatalogs
