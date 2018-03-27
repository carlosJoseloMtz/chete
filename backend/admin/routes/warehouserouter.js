import winston from 'winston'
import { success,failed } from '../../commons/responses'
import { warehousesService } from '../../core/services/warehouseservice'
import {convert as convertWarehouse } from '../converters/warehousesconverter'
import { convertAll } from '../../commons/utilconverter'

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
      convertAll(warehouses, convertWarehouse)
    ).then(warehouses => {
      console.log(warehouses)
      res.json(success(warehouses))
    }).catch(error => {
      console.log(error)
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
    warehousesService.delete(req.param('id')).then(respuesta => {
      res.json(success(respuesta))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.put(`${BASE}`, (req, res) => {
    warehousesService.update(req.body).then(respuesta => {
      res.json(success(respuesta))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

}
