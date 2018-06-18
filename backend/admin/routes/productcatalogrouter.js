import winston from 'winston'
import { success,failed } from '../../commons/responses'
import {convert as convertProductCatalog } from '../converters/productcatalogconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/productcatalog'

module.exports = app => {
  const productCatalogService = app.get('productCatalogService')
  const authService = app.get('authService')

  app.get(`${BASE}`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      productCatalogService.getAll().then(productCatalog =>
        convertAll(productCatalog, convertProductCatalog)
      ).then(productCatalog => {
        res.json(success(productCatalog))
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
      productCatalogService.create(req.body).then(productCatalog =>
        convertProductCatalog(productCatalog)
      ).then(pc => {
        res.json(success(pc))
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
      productCatalogService.findById(req.param('id')).then(productCatalogs =>
        convertProductCatalog(productCatalogs)
      ).then(productCatalogs => {
        res.json(success(productCatalogs))
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
      productCatalogService.delete(req.param('id')).then(_ => {
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
      productCatalogService.update(req.body).then(_ => {
        res.json(success())
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })

  app.put(`${BASE}/clone`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      productCatalogService.clone(req.body).then(prod => {
        res.json(success(prod))
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })
}
