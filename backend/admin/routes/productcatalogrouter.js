import winston from 'winston'
import { success,failed } from '../../commons/responses'
import {convert as convertProductCatalog } from '../converters/productcatalogconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/productcatalog'

module.exports = app => {
  const productCatalogService = app.get('productCatalogService')

  app.get(`${BASE}`, (req, res) => {
    productCatalogService.getAll().then(productCatalog =>
      convertAll(productCatalog, convertProductCatalog)
    ).then(productCatalog => {
      res.json(success(productCatalog))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.post(`${BASE}`, (req, res) => {
    productCatalogService.create(req.body).then(productCatalog =>
      convertProductCatalog(productCatalog)
    ).then(pc => {
      res.json(success(pc))
    }).catch(error => {
      LOG.error(error)
      res.status(500).json(failed())
    })
  })

  app.get(`${BASE}/:id`, (req, res) => {
    productCatalogService.findById(req.param('id')).then(productCatalogs =>
      convertProductCatalog(productCatalogs)
    ).then(productCatalogs => {
      res.json(success(productCatalogs))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.delete(`${BASE}/:id`, (req, res) => {
    productCatalogService.delete(req.param('id')).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.put(`${BASE}`, (req, res) => {
    productCatalogService.update(req.body).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

}
