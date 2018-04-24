const state = {
  productsCatalogs: []
}

const mutations = {
  'SET_PRODUCTS_CATALOGS' (state, productsCatalogs) {
    state.productsCatalogs = productsCatalogs
  },
  'ADD_PRODUCTS_CATALOGS' (state, productsCatalogs) {
    state.productsCatalogs.push(productsCatalogs)
  },
  'UPDATE_PRODUCTS_CATALOGS' (state, productsCatalogs) {
    state.productsCatalogs.filter(productCatalog => {
      if (productCatalog.id === productsCatalogs.id) {
        productCatalog = productsCatalogs
      }
    })
  }
}

const actions = {
  addProductCatalog: ({commit}, productsCatalogs) => {
    commit('ADD_PRODUCTS_CATALOGS')
  },
  updateProductCatalog: ({commit}, productsCatalogs) => {
    commit('UPDATE_PRODUCTS_CATALOGS')
  }
}

const getters = {
  productsCatalogs: state => {
    return state.productsCatalogs
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
