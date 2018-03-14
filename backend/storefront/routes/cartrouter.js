import winston from 'winston'
import { success } from '../../commons/responses'

const BASE = '/storefront/api/carts'

module.exports = app => {

  /**
   * Get the current user's cart.
   */
  app.get(`${BASE}/current`, (req, res) => {
    res.json(success({
      id: 'sample'
    }))
  })

  /**
   * Add a product to the cart, if the product already exists,
   * it sums the quantity (if there's enough stock).
   */
  app.post(`${BASE}/add`, (req, res) => {
    res.json(success())
  })

  /**
   * Removes an entry from the user's cart.
   * @param {String} entry - The id of the entry to be removed from the cart.
   */
  app.delete(`${BASE}/current/:entry`, (req, res) => {
    res.json(success())
  })
}
