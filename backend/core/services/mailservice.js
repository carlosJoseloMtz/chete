import nodemailer from 'nodemailer'
import environment from '../../commons/environment-configuration.js'
import mails from '../mails/recovery-password'
import mail from '../mails/config'
import hbs from 'nodemailer-express-handlebars'
import fs from 'fs'
class MailService {
  constructor (userDao){
    this.userDao = userDao
  }

  async recoveryPassword (user) {
    let userFinded
    let html1
    await this.userDao.findOne(user).then(usr => {
      userFinded = usr
    })
    if (userFinded !== null || userFinded !== undefined) {
      await new Promise (function (resolve, reject) {
        fs.readFile(`${environment.routMail}/mailhtml.html`, 'utf8', function(err,data){
          if(err) {
            console.log(err)
          }
          data = data.replace(/{{username}}/g, `${userFinded.firstName} ${userFinded.lastName}`)
              .replace(/{{password}}/g, `${userFinded.password}`)
          html1 = data
          resolve(data)
        })
      })
        var smtpTransport = mail.config()
        var mailOptions = {
          from : `${environment.admin} <${environment.email}>`,
          to: `${userFinded.email}`,
          html: html1
        }
        return smtpTransport.sendMail(mailOptions)
    }
    else {
      return "User not exist"
    }
  }
}

export default MailService
