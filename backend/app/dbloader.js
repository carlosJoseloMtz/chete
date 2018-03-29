import mongoose from 'mongoose'

module.exports = app => {
  // set the promise handler to the native implementation
  // TODO: check if bluebird is actually faster for handling promises
  mongoose.Promise = global.Promise

  mongoose.connect(app.get('dbconection'), { useMongoClient: true })

  mongoose.connection.on("open", function(){
    console.log("mongodb is connected!!");
  });
}
