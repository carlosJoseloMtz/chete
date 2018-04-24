import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import productsCatalogs from './modules/products-catalogs'
import categories from './modules/categories'
import warehouses from './modules/warehouses'
import stocks from './modules/stocks'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    products,
    productsCatalogs,
    categories,
    stocks,
    warehouses
  }
})
