import winston from 'winston'
import { success, failed } from '../../commons/responses'
import {convert as convertStock } from '../converters/stockconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/stock'

module.exports = app => {
  const stockService = app.get('stockService')
  const authService = app.get('authService')
  
  app.get(`${BASE}`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      stockService.getAll().then(stock =>
        convertAll(stock, convertStock)
      ).then(stock => {
        res.json(success(stock))
      }).catch(error => {
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
      stockService.findById(req.param('id')).then(stock =>
        convertStock(stock)
      ).then(stock => {
        res.json(success(stock))
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
      stockService.delete(req.param('id')).then(_ => {
        res.json(success())
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
      stockService.create(req.body).then(stock =>
        convertStock(stock)
      ).then(prod => {
        res.json(success(prod))
      }).catch(error => {
        LOG.error(error)
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
      stockService.update(req.body).then(_ => {
        res.json(success())
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })
}
