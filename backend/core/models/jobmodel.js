const mongoose = require('mongoose')
const BaseModel = require('./basemodel')

const JobSchema = new mongoose.Schema({
  ...BaseModel,

  /**
   * The job uid / code to find it on the database.
   */
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  /**
   * The relative path to the file to be executed.
   */
  executor: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Jobs', JobSchema)
