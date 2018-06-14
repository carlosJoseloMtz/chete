import nodemailer from 'nodemailer'
import environment from '../../commons/environment-configuration.js'

module.exports = {
  config () {
    return nodemailer.createTransport({
      service: environment.serviceMail,
      host: environment.hostMail,
      port: environment.portMail,
      secure: environment.secure,
      auth: {
          type: environment.type,
          user: environment.email,
          pass: environment.password
        }
    })
  }
}
