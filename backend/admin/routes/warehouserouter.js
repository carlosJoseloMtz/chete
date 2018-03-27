import winston from 'winston'
import { success,failed } from '../../commons/responses'
import { warehousesService } from '../../core/services/warehouseservice'
import {convert as convertWarehouse } from '../converters/warehouseconverter'
import { convertAll } from '../../commons/utilconverter'
import * as LOG from 'winston'

const BASE = '/admin/api/v1/warehouses'

module.exports = app => {

  app.get(`${BASE}/getAll`, (req, res) => {
    warehousesService.getAll().then(warehouses =>
      convertAll(warehouses, convertWarehouse)
    ).then(warehouses => {
      res.json(success(warehouses))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.post(`${BASE}`, (req, res) => {
    console.log(req.body)
    warehousesService.create(req.body).then(warehouses =>
      convertWarehouse(warehouses)
    ).then(wh => {
      LOG.debug(wh)
      res.json(success(wh))
    }).catch(error => {
      LOG.error(error)
      res.status(500).json(failed())
    })
  })

  app.get(`${BASE}/:id`, (req, res) => {
    warehousesService.findById(req.param('id')).then(warehouses =>
      convertWarehouse(warehouses)
    ).then(warehouses => {
      res.json(success(warehouses))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.delete(`${BASE}/:id`, (req, res) => {
    warehousesService.delete(req.param('id')).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.put(`${BASE}`, (req, res) => {
    warehousesService.update(req.body).then(_ => {
      res.json(success())
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

}
