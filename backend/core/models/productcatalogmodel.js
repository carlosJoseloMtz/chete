import mongoose from 'mongoose'
import BaseModel from './basemodel'

const CatalogSchema = new Schema ({
  ... BaseModel,

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

module.exports = mongoose.model('Catalogs', CatalogSchema)
