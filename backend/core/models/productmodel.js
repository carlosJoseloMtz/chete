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

  /**
   * Collection price have begin date,
   * expired date and the price valid on
   * dates (begin,expired)
   */
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

  /**
   * discounts collection have due date date
   * it is a important parameter for say
   * what price we have to use
   */
  discounts : [{
     beginDate {
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

    useAsPrice: {
      type: Boolean,
      default: false
    },

    discount: {
      value: {
        type: Number
      },
      net: {
        type: Boolean,
        default: false
      }
    }
  }],

  description: {
    type: String
  },

  stock: [{
    type: Schema.Types.ObjectId,
    ref: 'Stocks'
  }],

  catalog: {
    type: Schema.Types.ObjectId,
    ref: 'Catalogs'
  }

  code: {
    type: String,
    unique: true,
    index: true
  }

  name: {
    type: String,
    required:  true
  }

})

module.exportes = mongoose.model('Products', ProductSchema)
