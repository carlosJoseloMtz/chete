//const Product = require('../models/product-model.js')
const User = require('../models/user.js')
var some

module.exports.findAll = function(req,res,result){
  User.find(function(err, doc) {
    if(err) {
      //return res.status(500).send("WE ARE KILL U")
    } else {
      some = doc
      //console.log(result)
      return result(some)
    }
   })
}
module.exports.update = function(req,res,item, result){
  var x = JSON.stringify(item, null,2)
  console.log("normal " + item._id)

  User.findOne({email: item.email},function(err, doc) {
    if(err) {
      console.log("esto no funciono update")
      //return res.status(500).send("WE ARE KILL U")
    } else {
      console.log(err)
      console.log("esto tecnicamente funciono update")
      return result("se actualizo" + doc)
    }
  })
}

module.exports.delete = function(req,res,result,item){
  db.collection('user'.deleteOne({"_id":objectId(id)},{$set: item}, function(err, doc) {
    if(err) {
      //return res.status(500).send("WE ARE KILL U")
    } else {
      //console.log(result)
      return result("se actualizo")
    }
  }))
}
