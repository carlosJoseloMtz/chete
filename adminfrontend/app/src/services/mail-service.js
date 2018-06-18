import HttpClient from './http-client'
const url = 'http://localhost:3030/admin/api/v1/mail/'

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

  forgotMyPassword (options) {
    return HttpClient.post(`${url}forgotMyPassword`, options)
  },

  delete (id) {
    return HttpClient.delete(url + id)
  },

  update (options) {
    return HttpClient.put(url, options)
  },
}
