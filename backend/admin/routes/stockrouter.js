import winston from 'winston'
import { success, failed } from '../../commons/responses'
import {convert as convertStock } from '../converters/stockconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/stock'

module.exports = app => {
  const stockService = app.get('stockService')

  app.get(`${BASE}`, (req, res) => {
    stockService.getAll().then(stock =>
      convertAll(stock, convertStock)
    ).then(stock => {
      res.json(success(stock))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.get(`${BASE}/:id`, (req, res) => {
    stockService.findById(req.param('id')).then(stock =>
      convertStock(stock)
    ).then(stock => {
      res.json(success(stock))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.delete(`${BASE}/:id`, (req, res) => {
    stockService.delete(req.param('id')).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.post(`${BASE}`, (req, res) => {
    stockService.create(req.body).then(stock =>
      convertStock(stock)
    ).then(prod => {
      res.json(success(prod))
    }).catch(error => {
      LOG.error(error)
      res.status(500).json(failed())
    })
  })

  app.put(`${BASE}`, (req, res) => {
    stockService.update(req.body).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })
}
