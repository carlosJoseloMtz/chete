import mongoose from 'mongoose'

const AddressModel = {

    street: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    zipcode: {
      type: Number,
      required: true
    },

    country: {
      type: String,
      required: true
    }

}

export default {AddressModel}
