import winston from 'winston'
import { success, failed } from '../../commons/responses'
import {convert as convertWarehouse } from '../converters/warehouseconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/warehouses'

module.exports = app => {

  // global variables
  const warehouseService = app.get('warehouseService')

  app.get(`${BASE}`, (req, res) => {
    warehouseService.getAll().then(warehouses =>
      convertAll(warehouses, convertWarehouse)
    ).then(warehouses => {
      res.json(success(warehouses))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.post(`${BASE}`, (req, res) => {
    warehouseService.create(req.body).then(warehouse =>
      convertWarehouse(warehouse)
    ).then(wh => {
      res.status(201).json(success(wh))
    }).catch(error => {
      LOG.error(error)
      res.status(500).json(failed())
    })
  })

  app.get(`${BASE}/:id`, (req, res) => {
    warehouseService.findById(req.param('id')).then(warehouses =>
      convertWarehouse(warehouses)
    ).then(warehouses => {
      res.json(success(warehouses))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.delete(`${BASE}/:id`, (req, res) => {
    warehouseService.delete(req.param('id')).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.put(`${BASE}`, (req, res) => {
    warehouseService.update(req.body).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

}
