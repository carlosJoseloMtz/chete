import winston from 'winston'
import { success } from '../../services/responses'

const BASE = '/storefront/api/products'

module.exports = app => {

  /**
   * Gets the specific product from the database.
   * @param {String} code - The code of the product to look for.
   */
  app.get(`${BASE}/p/:code`, (req, res) => {
    res.json(success({
      id: 'sample'
    }))
  })

  /**
   * Searches on the product record based on the search term.
   */
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
