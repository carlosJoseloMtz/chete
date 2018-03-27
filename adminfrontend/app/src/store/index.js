import Vue from 'vue'
import Vuex from 'vuex'
import WarehouseService from '../services/warehouse-service'

Vue.use(Vuex)
let warehouseResponse = []
export const store = new Vuex.Store({
  state: {
    warehouses: warehouseResponse
  },

  getters: {
    saleProducts: state => {
      var saleProducts = state.products.map(product => {
        return {
          name: '**' + product.name + '**',
          description: '**' + product.description + '**'
        }
      })
      return saleProducts
    }
  },

  actions: {
    reducePrice: (context, text) => {
      setTimeout(function () {
        context.commit('reducePrice', text)
      }, 2000)
    },

    removeWarehouse: (context, index) => {
      context.commit('removeWarehouse', index)
    },

    addOneWarehouse: (context, warehouse) => {
      context.commit('addOneWarehouse', index)
    }
  },

  mutations: {
    addWarehouse: (state) => {
      WarehouseService.getAll().then(data => {
        for (const element in data.data) {
          warehouseResponse.push(data.data[element])
        }
      })
    },

    addOneWarehouse: (state, index) => {
      state.warehouses.splice(index, 1)
    },

    removeWarehouse: (state, index) => {
      state.warehouses.splice(index, 1)
    },

    reducePrice: (state, text) => {
      state.products.forEach(product => {
        product.description = text
      })
    }
  }
})
