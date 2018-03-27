import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AddressSchema = new Schema({

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
    },

    /**
     * Geopoint is for geolocation
     * we need provide latitude and longitude
     */
    geopoint: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    }

})

module.exports = mongoose.model('Address', AddressSchema)
