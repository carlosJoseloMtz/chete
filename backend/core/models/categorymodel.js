import mongoose from 'moongose'
import BaseModel from './basemodel'

const CategorySchema = new Schema({
  ...BaseModel,

  id: {
    type: Number,
    autoIncrement: true,
    primaryKey:  true
  },

  name: {
    type: String,
    required: true
  },

  catalog: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog'
  },

  description: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Category', CategorySchema)
