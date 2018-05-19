import TokenModel from '../models/tokenmodel'
import * as LOG from 'winston'

class TokenDao {

  async findByUser (User) {
    let user
    await TokenModel.findOne({'user': User._id}, (err, usr) => {
      if (err) {
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        user = usr
      }
    })
    return user
  }

  async create (token, user) {
    let body
    body = {
      "token": token,
      "user": user
    }
    let newtokenModel =new TokenModel(body)
    await newtokenModel.save()
    return newtokenModel
  }

  async logout (token) {
    let response
    await TokenModel.remove({'token': token}, (err, tkn) => {
      if (err) {
        LOG.error('Error while trying to find a product by id')
        LOG.error(JSON.stringify(err))
      } else {
        response = tkn
      }
    })
    return response
  }
}

export default TokenDao
