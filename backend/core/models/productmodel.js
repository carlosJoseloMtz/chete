// es5 use this not required because for es5
import mongoose from 'mongoose'
import BaseModel from './basemodel'

//Model for product
const ProductSchema = new Schema({
  ... BaseModel,

  id: {
    type: Number,
    autoIncrement: true,
    primaryKey:  true
  },

  price: [
    {
      beginDate{
        type: Date,
        required: true
        },

      dueDate: {
        type: Date,
        required: true
      },

      price: {
        type: Number,
        required: true
      },
    }
  ],

  discount : {
    type: Boolean
  },

  description: {
    type: String,
    required: true
  },

  stock: {
    type: Schema.Types.ObjectId,
    ref: 'Stock'
  },

  catalog: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog'
  }

})

module.exportes = mongoose.model('Product', ProductSchema)
