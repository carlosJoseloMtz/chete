import HttpClient from './http-client'
const url = 'http://localhost:3030/admin/api/v1/user/'

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

  login (options) {
    return HttpClient.post(`${url}login`, options)
  },

  logout (options) {
    return HttpClient.delete(`${url}logout/${options}`)
  },

  active (options) {
    return HttpClient.put(`${url}active`, options)
  }
}
