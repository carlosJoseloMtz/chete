import winston from 'winston'
import { success, failed } from '../../commons/responses'
import {convert as convertUser } from '../converters/userconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/user'

module.exports = app => {
  const userService = app.get('userService')
  const authService = app.get('authService')

  app.post(`${BASE}/login`, (req, res) => {
    userService.findByUid(req.body)
      .then(token => res.json(success(token)))
      .catch(_ => res.status(500).json(failed()))
  })

  app.delete(`${BASE}/logout/:token`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      userService.logout(req.params.token).then(result => {
        res.json(success(result))
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })

  app.post(`${BASE}`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      userService.create(req.body).then(user =>
        convertUser(user)
      ).then(usr => {
        res.json(success(usr))
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })

  app.put(`${BASE}/active`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      userService.active(req.body).then(user =>
        convertUser(user)
      ).then(usr => {
        res.json(success(usr))
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })

  app.get(`${BASE}`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
    userService.getAll().then(user =>
      convertAll(user, convertUser)
    ).then(user => {
      res.json(success(user))
    }).catch(error => {
      res.status(500).json(failed())
    })
  } else {
      res.status(401).json(failed())
  }
  })
}
