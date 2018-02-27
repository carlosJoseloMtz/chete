import mongoose  from 'mongoose'
import BaseModel from './basemodel'
import AddressModel from './addressmodel'

const WareHouseSchema = new Schema({
  ...BaseModel,

  id: {
    type: Number,
    autoIncrement: true,
    primaryKey:  true
  },

  stock: [{
    type: Schema.Types.ObjectId,
    ref: 'Stocks'
  }],

  address: [{
    type: Schema.Types.ObjectId,
    ref: 'Address'
  }],

  type: {
    type: String,
    enum: ['store','warehouse']
  }
})

module.exports = mongoose.model('WareHouses', WareHouseSchema)
