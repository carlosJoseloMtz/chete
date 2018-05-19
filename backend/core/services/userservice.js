import jwt from 'jwt-simple'
import moment from 'moment'

class UserService {

  constructor (passwordCheckStrategy,
    authService, userDao, tokenDao) {
    this.passwordCheckStrategy = passwordCheckStrategy
    this.authService = authService
    this.userDao = userDao
    this.tokenDao = tokenDao
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

  async logout(token) {
    let response
    await this.tokenDao.logout(token)
      .then(usr => {response = usr})
    if (response.result.n === 0) {
      return error
    }
    return 'Logout complete'
  }

  async findByUid (user) {
    let userFind
    let tken

    await this.userDao.findByUid(user)
     .then(usr => { userFind = usr })

    await this.tokenDao.findByUser(userFind._id)
     .then(tk => {tken = tk})

    if(tken === null) {
      if (!this.passwordCheckStrategy.isPasswordValid(userFind.password, user.password)) {
        return 'Password not match try again'
      }

      const token = this.authService.encodeToken({
        name: user.name,
        id: user._id
      })

      await this.tokenDao.create(token, user._id)

      return { token: token, active: false }
    }
    return error
  }
}

export default UserService
