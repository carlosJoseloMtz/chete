import * as LOG from 'winston'

class UserService {

  constructor (passwordCheckStrategy,
    authService, userDao) {
    this.passwordCheckStrategy = passwordCheckStrategy
    this.authService = authService
    this.userDao = userDao
  }

  async login (username, password) {

    let user
    await this.userDao.findByUid(username)
      .then(usr => { user = usr })

    if (!this.passwordCheckStrategy.isPasswordValid(user.password, password)) {
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
