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

  app.get(`${BASE}`, (req, res) => {
    warehousesService.create().then(warehouses =>
      convertAll(warehouses, convertWarehouse)
    ).then(warehouses => {
      res.json(success(warehouses))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.get(`${BASE}/findById`, (req, res) => {
    warehousesService.findById('5aab6692d55c2c170fa834cf').then(warehouses =>
      convertAll(warehouses, convertWarehouse)
    ).then(warehouses => {
      res.json(success(warehouses))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.get(`${BASE}/delete`, (req, res) => {
    warehousesService.delete('5aab554424261b7fdbb5ef2e').then(respuesta => {
      console.log(respuesta)
      res.json(success(respuesta))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

  app.get(`${BASE}/update`, (req, res) => {
    warehousesService.update({
      "id": "5aab555a79c0c5013b5ec6ae",
      "type": "warehouses"
    }).then(respuesta => {
      res.json(success(respuesta))
    }).catch(error => {
      res.status(500).json(failed())
    })
  })

}
