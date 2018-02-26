const product = require('../dao/product-dao.js')

module.exports.findAll = function(req,res,next){
product.findAll(res,req,function(result){
  console.log("dentro del dao " + result)
  return next(result)
})
}

module.exports.update = function(req,res,next,item){

product.update(res,req, item, function(result){
  console.log("dentro del dao " + result)
  return next(result)
})
}
// esto es la capa de servicio
