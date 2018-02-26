const User = require('../core/models/user.js')
const users = new User({email: "second@admin.com", password: "1234"})
const mongoose = require("mongoose")

module.exports.postData = function(req,res){
  users.save(function(){
   res.send("Create new User")
  })
}
