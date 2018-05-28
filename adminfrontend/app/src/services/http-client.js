
export default {
  get (url, options) {
    return fetch(url).then((res) => res.json())
  },

  async post (url, options) {
    var result
    await fetch(url, {method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(options)}).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  },

  async put (url, options) {
    var result
    await fetch(url, {method: 'PUT', headers: {'Content-type': 'application/json'}, body: JSON.stringify(options)}).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  },

  async putMedia (url, options) {
    var result
    // headers: {'Content-Type': 'multipart/form-data'}
    await fetch(url, {method: 'PUT', body: options}).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  },

  async delete (url, options) {
    var result
    await fetch(url, {method: 'DELETE'}).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  }
}
