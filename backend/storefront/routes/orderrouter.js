import winston from 'winston'
import { success } from '../../services/responses'

const BASE = '/storefront/api/orders'

module.exports = app => {

  /**
   * Creates an order based on the user's cart to the system.
   */
  app.post(`${BASE}/placeorder`, (req, res) => {
    res.json(success())
  })
}
