import mongoose  from 'mongoose'
import BaseModel from './basemodel'
import AddressModel from './adressmodel'

const WhereHouseSchema = new Schema({
  ... BaseModel, AddressModel,

  id: {
    type: Number,
    autoIncrement: true,
    primaryKey:  true
  },

  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
})

module.exports = mongoose.model('WhereHouse', WhereHouseSchema)
