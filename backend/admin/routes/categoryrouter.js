import winston from 'winston'
import { success, failed } from '../../commons/responses'
import {convert as convertCategory } from '../converters/categoryconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/category'

module.exports = app => {
  const categoryService = app.get('categoryService')

  app.get(`${BASE}`, (req, res) => {
    categoryService.getAll().then(category =>
      convertAll(category, convertCategory)
    ).then(category => {
      res.json(success(category))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.post(`${BASE}`, (req, res) => {
    categoryService.create(req.body).then(category =>
      convertCategory(category)
    ).then(category => {
      res.json(success(category))
    }).catch(error => {
      LOG.error(error)
      res.status(500).json(failed())
    })
  })

  app.get(`${BASE}/:id`, (req, res) => {
    categoryService.findById(req.param('id')).then(category =>
      convertCategory(category)
    ).then(category => {
      res.json(success(category))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.delete(`${BASE}/:id`, (req, res) => {
    categoryService.delete(req.param('id')).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.put(`${BASE}`, (req, res) => {
    categoryService.update(req.body).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })
}
