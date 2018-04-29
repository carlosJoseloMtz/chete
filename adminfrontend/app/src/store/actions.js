import WarehouseService from '../services/warehouse-service'
import ProductCatalogService from '../services/product-catalog-service'
import ProductService from '../services/product-service'
import CategoryService from '../services/category-service'
import StockService from '../services/stock-service'

export const loadProductData = ({commit}) => {
  ProductService.getAll().then(data => {
    if (data.data) {
      const products = data.data
      commit('SET_PRODUCTS', products)
    }
  })
}

export const loadProductCatalogData = ({commit}) => {
  ProductCatalogService.getAll().then(data => {
    if (data.data) {
      const productsCatalogs = data.data
      commit('SET_PRODUCTS_CATALOGS', productsCatalogs)
    }
  })
}

export const loadWarehouseData = ({commit}) => {
  WarehouseService.getAll().then(data => {
    if (data.data) {
      const warehouses = data.data
      commit('SET_WAREHOUSES', warehouses)
    }
  })
}

export const loadStockData = ({commit}) => {
  StockService.getAll().then(data => {
    if (data.data) {
      const stocks = data.data
      commit('SET_STOCKS', stocks)
    }
  })
}

export const loadCategoryData = ({commit}) => {
  CategoryService.getAll().then(data => {
    if (data.data) {
      const categories = data.data
      commit('SET_CATEGORIES', categories)
    }
  })
}
