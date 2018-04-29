const state = {
  stocks: []
}

const mutations = {
  'SET_STOCKS' (state, stocks) {
    state.stocks = stocks
  },
  'ADD_STOCK' (state, stocks) {
    state.stocks.push(stocks)
  },
  'UPDATE_STOCK' (state, stocks) {
    state.stocks.filter(stock => {
      if (stock.id === stocks.id) {
        stock = stocks
      }
    })
  }
}

const actions = {
  addStock: ({commit}, stocks) => {
    commit('ADD_STOCK', stocks)
  },
  updateStock: ({commit}, stocks) => {
    commit('UPDATE_STOCK', stocks)
  }
}

const getters = {
  stocks: state => {
    return state.stocks
  },
  stockSum: state => {
    return sortFunctions.stockSum(state.stocks)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

const sortFunctions = {
  stockSum: (stockList) => {
    let stocksLocal = []
    let existing = 0
    stockList.forEach(sl => {
      sl.stock = sl.stock === null || sl.stock === undefined ? 0 : sl.stock
      if (stocksLocal.length > 0) {
        stocksLocal.forEach(s => {
          if (s.product.code === sl.product.code) {
            existing += existing + 1
          }
        })
        if (existing !== null && existing > 0) {
          stocksLocal.filter(s => {
            if (s.product.code === sl.product.code) {
              s.stock += sl.stock
            }
          })
        } else {
          stocksLocal.push({
            product: sl.product,
            stock: sl.stock
          })
        }
      } else {
        stocksLocal.push({
          product: sl.product,
          stock: sl.stock
        })
      }
      existing = 0
    })
    return stocksLocal
  }
}
