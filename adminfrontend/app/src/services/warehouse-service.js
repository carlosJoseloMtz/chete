import HttpClient from './http-client'
const url = 'http://localhost:3030/admin/api/v1/warehouses/'

export default {
  getAll () {
    return HttpClient.get(url + 'getAll')
  },

  findOne (id) {
    console.log(url + id)
    return HttpClient.get(url + id)
  },

  save (options) {
    console.log(options)
    return HttpClient.post(url, options)
  },

  delete (id) {
    return HttpClient.delete(url + id)
  },

  update (options) {
    return HttpClient.put(url, options)
  }
}
