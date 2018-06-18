
export default {
  get (url, options) {
    return fetch(url, {headers: new Headers({'Content-type': 'application/json','Authorization': localStorage.getItem('tk')})}).then((res) => res.json())
  },

  async post (url, options) {
    var result
    await fetch(url, {method: 'POST', headers: new Headers({'Content-type': 'application/json','Authorization': localStorage.getItem('tk')}), body: JSON.stringify(options)}).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  },

  async put (url, options) {
    var result
    await fetch(url, {method: 'PUT', headers: new Headers({'Content-type': 'application/json','Authorization': localStorage.getItem('tk')}), body: JSON.stringify(options)}).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  },

  async putMedia (url, options) {
    var result
    await fetch(url, {method: 'PUT', headers: new Headers({'Authorization': localStorage.getItem('tk')}), body: options}).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  },

  async delete (url, options) {
    var result
    await fetch(url, {method: 'DELETE', headers: new Headers({'Authorization': localStorage.getItem('tk')})}).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  }
}
