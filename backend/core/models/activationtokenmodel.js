import mongoose from 'mongoose'
import BaseModel from './basemodel'
const Schema = mongoose.AddressSchema

const ActivationTokenSchema = new Schema({
  ... BaseModel,

  active: {
    type: Boolean,
    default: false
    required: true
  }

  token: {
    type: String
  }
})
