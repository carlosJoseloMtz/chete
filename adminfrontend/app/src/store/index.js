import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    products: [{
      id: 1,
      name: 'some',
      price: [{
        beginDate: Date.now(),
        dueDate: Date.now(),
        price: 1.00
      }],
      discounts: [{
        beginDate: Date.now(),
        dueDate: Date.now(),
        price: 1.00,
        useAsPrice: false,
        discount: {
          value: 0,
          net: false
        }
      }],
      description: 'First Test Product',
      stock: [{
        stock: 1
      }],
      catalog: [{
        catalog: 12312
      }]
    },
    {
      id: 2,
      name: 'some 2',
      price: [{
        beginDate: Date.now(),
        dueDate: Date.now(),
        price: 123.00
      }],
      discounts: [{
        beginDate: Date.now(),
        dueDate: Date.now(),
        price: 1.00,
        useAsPrice: false,
        discount: {
          value: 0,
          net: false
        }
      }],
      description: 'Second Test Product',
      stock: [{
        stock: 1
      }],
      catalog: [{
        catalog: 12312
      }]
    }]
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
    }
  },
  mutations: {
    reducePrice: (state, text) => {
      state.products.forEach(product => {
        product.description = text
      })
    }
  }
})
