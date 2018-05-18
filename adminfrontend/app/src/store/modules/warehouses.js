const state = {
  warehouses: []
}

const mutations = {
  'SET_WAREHOUSES' (state, warehouses) {
    state.warehouses = warehouses
  },
  'ADD_WAREHOUSE' (state, warehouses) {
    state.warehouses.push(warehouses)
  },
  'UPDATE_WAREHOUSE' (state, warehouses) {
    state.warehouses.filter(warehouse => {
      if (warehouse.id === warehouses.id) {
        warehouse = warehouses
      }
    })
  }
}

const actions = {
  addWarehouse: ({commit}, warehouses) => {
    commit('ADD_WAREHOUSE', warehouses)
  },
  updateWarehouse: ({commit}, warehouses) => {
    commit('UPDATE_WAREHOUSE', warehouses)
  }
}

const getters = {
  warehouses: state => {
    return state.warehouses
  },
  warehouseDataLoaded: state => {
    return state.warehouses.length > 0
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
