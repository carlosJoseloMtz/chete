import winston from 'winston'
import { success, failed } from '../../services/responses'
import { validator } from '../checkout/validations'

const BASE = '/storefront/api/orders'

module.exports = app => {

  /**
   * Creates an order based on the user's cart to the system.
   */
  app.post(`${BASE}/placeorder`, (req, res) => {
    const cart = req.body
    const errors = validator(cart)
    if (errors.length === 0) {
      return res.json(success())
    }

    res.json(failed(errors))
  })
}
