import PasswordCheckStrategy from '../strategies/passwordcheckstrategy'

module.exports = app => {
  const passwordCheckStrategy = new PasswordCheckStrategy()
  app.set('passwordCheckStrategy', passwordCheckStrategy)
}
