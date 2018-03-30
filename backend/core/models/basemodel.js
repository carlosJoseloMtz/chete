import mongoose from 'mongoose'

const BaseModel = {

  /**
   * Holds the time on which the item was created at.
   */
  createdTime: {
    type: Date,
    required: true,
    default: Date.now
  },

  /**
   * Indicates the last update of the item.
   */
  updatedTime: {
    type: Date,
    required: true,
    default: Date.now
  },

  /**
   * The reference of the user who created the element.
   * Not required since some initial data (as the default's admin user, for example)
   * would not have it.
   */
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }

}

export default { BaseModel }
