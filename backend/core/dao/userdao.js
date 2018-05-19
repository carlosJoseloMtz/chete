import UserModel from '../models/usermodel'
import * as LOG from 'winston'

class UserDao {

  async getAll () {
    let response
    await UserModel.find({}, (err, product) => {
      if(err){
        LOG.error('Error while trying to list all the products')
        LOG.error(JSON.stringify(err))
      } else {
        response = product
      }
    })
    return response || []
  }

  async findById (id) {
    let users
    await UserModel.findById(id, (err, product) => {

      if(err){
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        response = product
      }

    })
    return users || []
  }

  async create (user) {
    let responses
    let newUser = {
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      status: user.status
    }
    let newUserModel = new UserModel(newUser)
    await newUserModel.save((err, newuser) => {
      if (err) {
        LOG.error('We cant create new product')
        LOG.error(err)
      } else {
        responses = newuser
      }
    })
    return newUserModel
  }

  async findByUid (User) {
    let user
    await UserModel.findOne({'uid': User.uid}, (err, usr) => {
      if (err) {
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        user = usr
      }
    })
    return user
  }
}

export default UserDao
