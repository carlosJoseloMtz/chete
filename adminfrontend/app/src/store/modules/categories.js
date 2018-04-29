const state = {
  categories: []
}

const mutations = {
  'SET_CATEGORIES' (state, categories) {
    state.categories = categories
  },
  'ADD_CATEGORY' (state, categories) {
    state.categories.push(categories)
  },
  'UPDATE_CATEGORY' (state, categories) {
    state.categories.filter(category => {
      if (category.id === categories.id) {
        category = categories
      }
    })
  }
}

const actions = {
  addCategory: ({commit}, categories) => {
    commit('ADD_CATEGORY', categories)
  },
  updateCategory: ({commit}, categories) => {
    commit('UPDATE_CATEGORY', categories)
  }
}

const getters = {
  categories: state => {
    return state.categories
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
