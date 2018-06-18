import winston from 'winston'
import { success, failed } from '../../commons/responses'
import * as LOG from 'winston'


const BASE = '/admin/api/v1/mail'

module.exports = app => {
  const mailService = app.get('mailService')
  const userService = app.get('userService')

  app.post(`${BASE}/forgotMyPassword`, (req, res) => {
      mailService.recoveryPassword(req.body).then(msj => {
        res.json(success(msj))
      }).catch(error => {
        res.status(500).json(failed())
      })
  })
}
