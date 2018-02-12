import winston from 'winston'
import { success } from '../../services/responses'

const BASE = '/admin/api/products'

module.exports = app => {

  app.get(`${BASE}/search`, (req, res) => {
    res.json(success([
      {
        id: 'sample'
      },
      {
        id: 'sample'
      }
    ]))
  })

  app.get(`${BASE}/p/:id`, (req, res) => {
    res.json(success({
      id: 'sample'
    }))
  })

  app.post(`${BASE}`, (req, res) => {
    res.json(success({
      id: 'sample'
    }))
  })

  app.patch(`${BASE}/p/:id`, (req, res) => {
    res.json(success({
      id: 'sample'
    }))
  })

  app.delete(`${BASE}/p/:id`, (req, res) => {
    res.json(success())
  })

}
