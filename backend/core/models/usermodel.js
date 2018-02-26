import mongoose from 'mongoose'
import BaseModel from './basemodel'

const UserSchema = new Schema({
  ...BaseModel,

  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
})

// TODO: add the pre-save hook to encrypt the password
// TODO: add the compare method to check a given password
// and the user's by using the encryption's library

module.exports = mongoose.model('Users', UserSchema)
