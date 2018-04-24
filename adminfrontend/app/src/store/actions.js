import WarehouseService from '../services/warehouse-service'
import ProductCatalogService from '../services/product-catalog-service'
import ProductService from '../services/product-service'
import CategoryService from '../services/category-service'
import StockService from '../services/stock-service'

export const loadData = ({commit}) => {
  Promise.all([ProductService.getAll().then(data => {
    if (data.data) {
      console.log('product data ok')
      const products = data.data
      commit('SET_PRODUCTS', products)
    }
  }),

  ProductCatalogService.getAll().then(data => {
    if (data.data) {
      console.log('product catalog data ok')
      const productsCatalogs = data.data
      commit('SET_PRODUCTS_CATALOGS', productsCatalogs)
    }
  }),

  WarehouseService.getAll().then(data => {
    if (data.data) {
      console.log('warehouse data ok')
      const warehouses = data.data
      commit('SET_WAREHOUSES', warehouses)
    }
  }),

  StockService.getAll().then(data => {
    if (data.data) {
      console.log('stock data ok')
      const stocks = data.data
      commit('SET_STOCKS', stocks)
    }
  }),

  CategoryService.getAll().then(data => {
    if (data.data) {
      console.log('category data ok')
      const categories = data.data
      commit('SET_CATEGORIES', categories)
    }
  })])
}
