import HttpClient from './http-client'
const url = 'http://localhost:3030/admin/api/v1/products/'

export default {
  getAll () {
    return HttpClient.get(url)
  },

  findOne (id) {
    return HttpClient.get(url + id)
  },

  save (options) {
    return HttpClient.post(url, options)
  },

  delete (id) {
    return HttpClient.delete(url + id)
  },

  update (options) {
    return HttpClient.put(url, options)
  },

  uploadImage (options) {
    return HttpClient.putMedia(`${url}img`, options)
  },

  reloadImage (options) {
    return HttpClient.put(`${url}img/reupload`, options)
  }
}
