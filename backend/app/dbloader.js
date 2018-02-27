import mongoose from 'mongoose'

module.exports = app => {
 mongoose.connect(app.get('dbconection'))
}
