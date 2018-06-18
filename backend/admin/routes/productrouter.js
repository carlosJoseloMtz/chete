import winston from 'winston'
import { success, failed } from '../../commons/responses'
import {convert as convertProduct } from '../converters/productconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'
import mediaProduct from '../../core/media/media-middleware'

const BASE = '/admin/api/v1/products'

module.exports = app => {
  const productService = app.get('productService')
  const authService = app.get('authService')

  app.get(`${BASE}`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      productService.getAll().then(product =>
        convertAll(product, convertProduct)
      ).then(product => {
        res.json(success(product))
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
      productService.findById(req.param('id')).then(product =>
        convertProduct(product)
      ).then(product => {
        res.json(success(product))
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
      productService.delete(req.param('id')).then(_ => {
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
      productService.create(req.body).then(product =>
        convertProduct(product)
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
      productService.update(req.body).then(_ => {
        res.json(success())
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })


  app.put(`${BASE}/img`, mediaProduct.imageProduct('productImage'),(req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      mediaProduct.imageProduct('productImage')
      productService.updateImage(req.body, req.file.filename).then(product =>
        convertProduct(product)
      ).then(product => {
        res.json(success(product))
      }).catch(error => {
        res.status(500).json(failed())
      })
    } else {
        res.status(401).json(failed())
    }
  })

  app.put(`${BASE}/img/reupload`, (req, res) => {
    let isTokenValid
    isTokenValid =  authService.isTokenValid(req.headers.authorization)
    if (isTokenValid === true) {
      productService.reloadImage(req.body).then(product =>
        convertProduct(product)
      ).then(product => {
        res.json(success(product))
      }).catch(error => {
        res.status(500).json(`the catalog base ${original.name} dont have any product`)
      })
    } else {
        res.status(401).json(failed())
    }
  })

}
