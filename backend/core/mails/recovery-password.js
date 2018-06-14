module.exports = {
  mail (usr) {
    return `Hello ${usr.firstName} ${usr.lastName} your password is ${usr.password} please try to remember that`
  }
}
