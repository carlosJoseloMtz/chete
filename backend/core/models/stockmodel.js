import mongoose from 'mongoose'
import BaseModel from './basemodel'

const StockSchema = new Schema ({
  ... BaseModel,

  id: {
    type: Number,
    autoIncrement: true,
    primaryKey:  true
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products'
  },

  stock: {
    type: Number
  }
})

module.exports = mongoose.model('Stocks', StockSchema)
