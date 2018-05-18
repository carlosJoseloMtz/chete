import winston from 'winston'
import { success, failed } from '../../commons/responses'
import {convert as convertUser } from '../converters/userconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/user'

module.exports = app => {
  const userService = app.get('userService')

  app.post(`${BASE}/login`, (req, res) => {
    userService.findByUid(req.body)
      .then(token => res.json(success(token)))
      .catch(_ => res.status(500).json(failed()))
  })

  app.post(`${BASE}`, (req, res) => {
    userService.create(req.body).then(user =>
      convertUser(user)
    ).then(usr => {
      res.json(success(usr))
    }).catch(error => {
      LOG.error(error)
      res.status(500).json(failed())
    })
  })
}
