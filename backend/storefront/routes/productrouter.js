import winston from 'winston'
import { success } from '../../services/responses'

const BASE = '/storefront/api/products'

module.exports = app => {
  app.get(`${BASE}/p/:code`, (req, res) => {
    res.json(success({
      id: 'sample'
    }))
  })

  app.get(`${BASE}/search`, (req, res) => {
    res.json(success([
      {
        id: 'sample'
      },
      {
        id: 'sample2'
      }
    ]))
  })
}
