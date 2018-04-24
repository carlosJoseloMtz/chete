const state = {
  warehouses: []
}

const mutations = {
  'SET_WAREHOUSES' (state, warehouses) {
    state.warehouses = warehouses
  },
  'ADD_WAREHOUSES' (state, warehouses) {
    state.warehouses.push(warehouses)
  },
  'UPDATE_WAREHOUSES' (state, warehouses) {
    state.warehouses.filter(warehouse => {
      if (warehouse.id === warehouses.id) {
        warehouse = warehouses
      }
    })
  }
}

const actions = {
  addWarehouse: ({commit}, warehouses) => {
    commit('ADD_WAREHOUSE')
  },
  updateWarehouse: ({commit}, warehouses) => {
    commit('UPDATE_WAREHOUSE')
  }
}

const getters = {
  warehouses: state => {
    return state.warehouses
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
