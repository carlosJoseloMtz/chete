import mongoose from 'mongoose'
import BaseModel from './basemodel'
const Schema = mongoose.Schema

const TokenSchema = new Schema({
  ... BaseModel,

  active: {
    type: Boolean,
    default: true,
    required: true
  },

  token: {
    type: String,
    unique: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    unique: true
  }
})

module.exports = mongoose.model('Tokens', TokenSchema)
