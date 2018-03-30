import mongoose  from 'mongoose'
import BaseModel from './basemodel'

const Schema = mongoose.Schema

const WareHouseSchema = new Schema({
  ...BaseModel,

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
