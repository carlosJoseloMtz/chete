import winston from 'winston'
import { success, failed } from '../../commons/responses'
import {convert as convertProduct } from '../converters/productconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/products'

module.exports = app => {
  const productService = app.get('productService')

  app.get(`${BASE}`, (req, res) => {
    productService.getAll().then(product =>
      convertAll(product, convertProduct)
    ).then(product => {
      res.json(success(product))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.get(`${BASE}/:id`, (req, res) => {
    productService.findById(req.param('id')).then(product =>
      convertProduct(product)
    ).then(product => {
      res.json(success(product))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.delete(`${BASE}/:id`, (req, res) => {
    productService.delete(req.param('id')).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.post(`${BASE}`, (req, res) => {
    productService.create(req.body).then(product =>
      convertProduct(product)
    ).then(prod => {
      LOG.debug(prod)
      res.json(success(prod))
    }).catch(error => {
      LOG.error(error)
      res.status(500).json(failed())
    })
  })

  app.put(`${BASE}`, (req, res) => {
    productService.update(req.body).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })
}