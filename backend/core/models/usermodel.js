import mongoose from 'mongoose'
import BaseModel from './basemodel'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  ...BaseModel,

  /**
   * The username / email / uid to be used.
   */
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

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
