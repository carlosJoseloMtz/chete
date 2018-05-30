const state = {
  products: []
}

const mutations = {
  'SET_PRODUCTS' (state, products) {
    state.products = products
  },
  'ADD_PRODUCT' (state, products) {
    state.products.push(products)
  },
  'REMOVE_PRODUCT' (state, product) {
    let index
    for (let p in state.products) {
      if (state.products[p].id === product) {
        index = p
      }
    }
    state.products.splice(index,1)
  },
  'UPDATE_PRODUCT' (state, products) {
    for (let product in state.products) {
      if (state.products[product].id === products.id) {
        state.products[product] = products
        break;
      }
    }
  }
}

const actions = {
  addProduct: ({commit}, product) => {
    commit('ADD_PRODUCT', product)
  },
  updateProduct: ({commit}, product) => {
    commit('UPDATE_PRODUCT', product)
  },
  removeProduct: ({commit}, product) => {
    commit('REMOVE_PRODUCT', product)
  }
}

const getters = {
  products: state => {
    return state.products
  },
  productWithActivePrice: state => {
    return sortFunctions.selectActivePrices(state.products)
  },
  productWithActiveDiscount: state => {
    return sortFunctions.selectProductsDiscounts(state.products)
  },
  productOnlyCode: state => {
    return sortFunctions.selectOnlyCode(state.products)
  },
  productDataLoaded: state => {
    return state.products.length > 0
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

const sortFunctions = {
  selectActivePrices: (pricesList) => {
    var productsList = []
    pricesList.filter(product => {
      let prod = {
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'id': product.id,
        'code': product.code
      }
      productsList.push(prod)
    })
    const tempProducts = productsList
    let arreglo = null
    for (const element in tempProducts) {
      tempProducts[element].price.forEach(data => {
        if (data.active === true && data.active !== null) {
          arreglo = data.price
        } else {
          arreglo = 'No have price asigned'
        }
      })
      tempProducts[element].price = arreglo
      arreglo = null
    }
    return tempProducts
  },
  selectProductsDiscounts: (pricesList) => {
    var productsList = []
    pricesList.filter(product => {
      let prod = {
        'name': product.name,
        'description': product.description,
        'discounts': product.discounts,
        'id': product.id,
        'code': product.code
      }
      productsList.push(prod)
    })
    const tempProducts = productsList
    let arreglo = null
    for (const element in tempProducts) {
      if (tempProducts[element].discounts.length > 0) {
        tempProducts[element].discounts.forEach(data => {
          if (data.active === true && data.active !== null && data.price !== null && data.price !== undefined) {
            arreglo = data.price
          } else {
            arreglo = 'No have discount asigned'
          }
        })
      } else {
        arreglo = 'No have discount asigned'
      }
      tempProducts[element].discounts = arreglo
      arreglo = null
    }
    return tempProducts
  },
  selectOnlyCode: (pricesList) => {
    var productsList = []
    pricesList.filter(product => {
      let prod = {
        'id': product.id,
        'code': product.code
      }
      productsList.push(prod)
    })
    return productsList
  }
}
