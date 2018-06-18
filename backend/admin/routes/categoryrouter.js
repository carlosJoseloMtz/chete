import winston from 'winston'
import { success, failed } from '../../commons/responses'
import {convert as convertCategory } from '../converters/categoryconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/category'

module.exports = app => {
  const categoryService = app.get('categoryService')
  const authService = app.get('authService')

  app.get(`${BASE}`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      categoryService.getAll().then(category =>
        convertAll(category, convertCategory)
      ).then(category => {
        res.json(success(category))
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
      categoryService.create(req.body).then(category =>
        convertCategory(category)
      ).then(category => {
        res.json(success(category))
      }).catch(error => {
        LOG.error(error)
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })

  app.get(`${BASE}/:id`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      categoryService.findById(req.param('id')).then(category =>
        convertCategory(category)
      ).then(category => {
        res.json(success(category))
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })

  app.delete(`${BASE}/:id`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      categoryService.delete(req.param('id')).then(_ => {
        res.json(success())
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })

  app.put(`${BASE}`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      categoryService.update(req.body).then(_ => {
        res.json(success())
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })
}
