import mongoose from 'mongoose'
import BaseModel from './basemodel'
const Schema = mongoose.Schema

//Model for product
const ProductSchema = new Schema({
  ...BaseModel,

  approved: {
    type: Boolean,
    default: false,
    required: true
  },

  /**
   * Collection price have begin date,
   * expired date and the price valid on
   * dates (begin,expired)
   */
  price: [
    {
      beginDate: {
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
      active: {
        type: Boolean,
        default: false
      }
    }
  ],

  /**
   * discounts collection have due date date
   * it is a important parameter for say
   * what price we have to use
   */
  discounts : [{
    active: {
      type: Boolean,
      default: false
    },

    beginDate: {
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
    ref: 'Catalogs',
    unique: true
  },

  code: {
    type: String,
    index:{ unique: true }
  },

  name: {
    type: String,
    required: true
  },

  image: {
    thumbnailSrc: {
      type: String,
      default: ''
    },

    mainImageSrc: {
      type: String,
      default: ''
    },

    gallery: [{
      type: String
    }]
  }
})
module.exports = mongoose.model('Products', ProductSchema)
