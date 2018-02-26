import mongoose from 'mongoose'

module.exports = mongoose.model('product', {
  price: Number,
  createdDate: Date,
  dueDato: Date,
  description: String
})
