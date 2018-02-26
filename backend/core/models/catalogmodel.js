import mongoose from 'mongoose'
import BaseModel from './basemodel'

const CatalogSchema = new Schema ({
  ... BaseModel,

  id: {
    type: Number,
    autoIncrement: true,
    primaryKey:  true
  }

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  products: [
    {
      type: Number,
      ref: 'Product'
    }
  ],

  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ]
})

module.exports = mongoose.model('Catalog', CatalogSchema)
