import mongoose from 'mongoose'
import BaseModel from './basemodel'
const Schema = mongoose.Schema

const StockSchema = new Schema ({
  ... BaseModel,

  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products'
  },

  stock: {
    type: Number
  }
})

module.exports = mongoose.model('Stocks', StockSchema)
