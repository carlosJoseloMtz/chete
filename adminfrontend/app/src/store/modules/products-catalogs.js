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
  },
  'REMOVE_PRODUCTS_CATALOGS' (state, productCatalogId) {
    let index
    for (let pc in state.productsCatalogs) {
      if (state.productsCatalogs[pc].id === productCatalogId) {
        index = pc
      }
    }
    state.productsCatalogs.splice(index,1)
  }
}

const actions = {
  addProductCatalog: ({commit}, productsCatalogs) => {
    commit('ADD_PRODUCTS_CATALOGS', productsCatalogs)
  },
  updateProductCatalog: ({commit}, productsCatalogs) => {
    commit('UPDATE_PRODUCTS_CATALOGS', productsCatalogs)
  },
  removeProductCatalog: ({commit}, productsCatalogs) => {
    commit('REMOVE_PRODUCTS_CATALOGS', productsCatalogs)
  }
}

const getters = {
  productsCatalogs: state => {
    return state.productsCatalogs
  },
  productsCatalogsDataLoaded: state => {
    return state.productsCatalogs.length > 0
  },
  productsCatalogsOnline: state => {
    return sortFunctions.onlineCatalogs(state.productsCatalogs)
  },
  productsCatalogsOffline: state => {
    return sortFunctions.offlineCatalogs(state.productsCatalogs)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

const sortFunctions = {
  onlineCatalogs: (productCatalog) => {
    let onlineCatalog = []
    productCatalog.forEach(oc => {
      if (oc.online === true) {
        onlineCatalog.push(oc)
      }
    })
    return onlineCatalog
  },
  offlineCatalogs: (productCatalog) => {
    let onlineCatalog = []
    productCatalog.forEach(oc => {
      if (oc.online === false) {
        onlineCatalog.push(oc)
      }
    })
    return onlineCatalog
  }
}
