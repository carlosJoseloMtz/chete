import Vue from 'vue'
import Vuex from 'vuex'
import WarehouseService from '../services/warehouse-service'
import ProductCatalogService from '../services/product-catalog-service'
import ProductService from '../services/product-service'
import CategoryService from '../services/category-service'

Vue.use(Vuex)

const sortFunctions = {
  selectActivePrices: (pricesList) => {
    var productsList = []
    pricesList.filter(product => {
      let prod = {
        'product': product.name,
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
        'product': product.name,
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
      tempProducts[element].discounts.forEach(data => {
        if (data.active === true && data.active !== null) {
          arreglo = data.price
        } else {
          arreglo = 'No have discount asigned'
        }
      })
      tempProducts[element].discounts = arreglo
      arreglo = null
    }
    return tempProducts
  }
}

export const store = new Vuex.Store({
  state: {
    warehouses: [],
    productCatalog: [],
    products: [],
    categories: []
  },

  getters: {
    productWithActivePrice: state => {
      return sortFunctions.selectActivePrices(state.products)
    },
    productWithActiveDiscount: state => {
      return sortFunctions.selectProductsDiscounts(state.products)
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
      context.commit('addOneWarehouse', warehouse)
    },

    addOneCategory: (context, category) => {
      context.commit('addOneCategory', category)
    },

    addOneProductCatalog: (context, catalog) => {
      context.commit('addOneProductCatalog', catalog)
    },

    updateProduct: (context, product) => {
      context.commit('updateProduct', product)
    }
  },

  mutations: {
    getCategories: (state) => {
      CategoryService.getAll().then(data => {
        for (const element in data.data) {
          state.categories.push(data.data[element])
        }
      })
    },

    getWarehouses: (state) => {
      WarehouseService.getAll().then(data => {
        for (const element in data.data) {
          state.warehouses.push(data.data[element])
        }
      })
    },

    getProducts: (state) => {
      ProductService.getAll().then(data => {
        for (const element in data.data) {
          state.products.push(data.data[element])
        }
      })
    },

    getProductsCatalog: (state) => {
      ProductCatalogService.getAll().then(data => {
        for (const element in data.data) {
          state.productCatalog.push(data.data[element])
        }
      })
    },

    updateProduct: (state, product) => {
      for (const element in state.products) {
        if (state.products[element].id === product.id) {
          state.products[element] = product
        } else {

        }
      }
    },

    addOneWarehouse: (state, index) => {
      state.warehouses.push(index)
    },

    addOneCategory: (state, category) => {
      state.categories.push(category)
    },

    addOneProductCatalog: (state, catalog) => {
      state.productCatalog.push(catalog)
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
