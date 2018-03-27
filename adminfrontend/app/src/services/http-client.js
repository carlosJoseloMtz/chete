
export default {
  get (url, options) {
    return fetch(url).then((res) => res.json())
  },

  async post (url, options) {
    var result
    await fetch(url, options).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  },

  async put (url, options) {
    var result
    await fetch(url, options).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  },

  async delete (url, options) {
    var result
    await fetch(url, {method: 'delete'}).then(response => response.json()).then(data => {
      result = data
    }).catch((error) => {
      console.log('Error', error)
    })
    return JSON.stringify(result)
  }
}
