import winston from 'winston'
import { success } from '../../commons/responses'

const BASE = '/admin/api/categories'

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

  app.get(`${BASE}/c/:id`, (req, res) => {
    res.json(success({
      id: 'sample'
    }))
  })

  app.get(`${BASE}/c/:id/products`, (req, res) => {
    res.json(success([
      {
        id: 'sample'
      },
      {
        id: 'sample'
      }
    ]))
  })

  app.post(`${BASE}`, (req, res) => {
    res.json(success({
      id: 'sample'
    }))
  })

  app.patch(`${BASE}/c/:id`, (req, res) => {
    res.json(success({
      id: 'sample'
    }))
  })

  app.delete(`${BASE}/c/:id`, (req, res) => {
    res.json(success())
  })

}
