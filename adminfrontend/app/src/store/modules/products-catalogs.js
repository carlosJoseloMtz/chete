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
    commit('ADD_PRODUCTS_CATALOGS', productsCatalogs)
  },
  updateProductCatalog: ({commit}, productsCatalogs) => {
    commit('UPDATE_PRODUCTS_CATALOGS', productsCatalogs)
  }
}

const getters = {
  productsCatalogs: state => {
    return state.productsCatalogs
  },
  productsCatalogsDataLoaded: state => {
    return state.productsCatalogs.length > 0
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
