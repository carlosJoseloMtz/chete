const mongoose = require('mongoose')
const BaseModel = require('./basemodel')

const JobExecutionSchema = mongoose.Schema({
  ...BaseModel,

  /**
   * The job to which this output belongs to.
   */
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobs'
  },

  /**
   * The output of the job execution.
   */
  output: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['success', 'failed', 'aborted'],
    required: true
  },

  executionDate: {
    type: Date,
    required: true,
    default: Date.now
  }

})

module.exports = mongoose.model('JobExecutions', JobExecutionSchema)
