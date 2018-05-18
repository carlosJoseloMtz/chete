import jwt from 'jwt-simple'
import moment from 'moment'

class UserService {

  constructor (passwordCheckStrategy,
    authService, userDao) {
    this.passwordCheckStrategy = passwordCheckStrategy
    this.authService = authService
    this.userDao = userDao
  }


  findById (user) {
    return this.userDao.findById(userDao)
  }

  create (user) {
    return this.userDao.create(user)
  }

  getAll() {
    return this.userDao.getAll()
  }

  async findByUid (user) {
    let userFind
    console.log(this.userDao)
    await this.userDao.findByUid(user)
     .then(usr => { userFind = usr })
    console.log(userFind)
   if (!this.passwordCheckStrategy.isPasswordValid(userFind.password, user.password)) {
     return null
   }

   const token = this.authService.encodeToken({
     name: user.name,
     id: user._id
   })

   return token
  }
}

export default UserService
