
class PasswordCheckStrategy {

  /**
   * Checks if a password is valid using the encrypt algorithm tool.
   * @param {String} current Password from the DB.
   * @param {String} possible The passsword used on the login.
   */
  isPasswordValid (current, possible) {
    console.log(current, possible)
    // TODO: use the decoding of the password based on the encrypt algorithm
    return current === possible
  }

  /**
   * Encrypts a plain text password.
   * @param {String} password The password to be encrypted.
   */
  encryptPassword (password) {
    // TODO: encrypt using the password encryption algorithm tool.
    return password
  }

}

export default PasswordCheckStrategy
