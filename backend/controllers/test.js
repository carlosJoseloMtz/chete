const User = require('../core/models/user.js')

module.exports.getData = function(req,res){
  User.find(function(err, doc) {
    if(err) {
     return res.status(500).send("WE ARE KILL U")
    } else {
      res.send(doc)
    }
  })
}
