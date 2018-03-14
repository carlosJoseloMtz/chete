import jwt from 'jwt-simple'
import moment from 'moment'

class AuthService {

  constructor (secret, expiryTime, expiryFactor) {
    if (arguments.length === 0) {
      console.warn('No arguments for the service!')
    } else {
      this.secret = secret
      this.expiryTime = expiryTime
      this.expiryFactor = expiryFactor
    }
  }

  encodeToken (payload) {
    const encoded = {
      sub: payload,
      iat: moment().unix(),
      exp: moment().add(
        this.expiryTime,
        this.expiryFactor
      ).unix()
    }

    return jwt.encode(encoded, this.secret)
  }

  decodeToken (token, fullToken) {
    let payload = null

    try {
      payload = jwt.decode(token, this.secret)
    } catch (err) {
      console.error('Error while trying to decode the token', err)
    }

    return fullToken ? payload : payload.sub
  }

  isTokenValid (token) {
    const decoded = this.decodeToken(token, true)

    return decoded !== null &&
      decoded.exp >= moment().unix()
  }

}

export let authService = new AuthService()
