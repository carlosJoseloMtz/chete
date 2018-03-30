import mongoose from 'mongoose'

module.exports = app => {
  mongoose.connect(app.get('dbconection'))
  mongoose.connection.on("open", function(){
    console.log("mongodb is connected!!");
  });
}
