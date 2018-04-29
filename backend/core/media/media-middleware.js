import multer from 'multer'
import environment from '../../commons/environment-configuration'

let path = ''
let name = ''
let maxSize = 5
let status = false

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path)
  },
  filename: function(req, file, cb){
    cb(null, name)
  }
})

const upload = multer({
  storage: storage,
  fileSize: environment.imageMaxSize,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true)
      status = true
    } else {
      cb(null, false)
      status = false
    }
  }
})

module.exports = {
  imageProduct (file) {
    path = environment.baseImageUrl
    name = environment.baseImageName + new Date().toISOString()
    return upload.single(file)
    //return {name: name, status:status}
  }
}
