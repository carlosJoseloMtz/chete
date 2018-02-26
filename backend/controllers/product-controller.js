const product = require('../core/dto/product-dto.js')

module.exports.findAll = function findAll(req,res,next){
  product.findAll(req,res,function(result){
      console.log("some " +result)
      res.send(result)
  })
}

module.exports.update = function update(req,res){
  console.log("desde update")
  var productBody = {
    "email": req.body.email,
    "password": req.body.password
  }
  product.update(req,res,function(result){
      console.log("some " +result)
      res.send(result)
  },productBody)
}
