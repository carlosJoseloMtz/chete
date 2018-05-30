const state = {
  employees: []
}

const mutations = {
  'SET_EMPLOYEES' (state, employee) {
    state.employees = employee
  },
  'ADD_EMPLOYEE' (state, employee) {
    state.employees.push(employee)
  },
  'UPDATE_EMPLOYEE' (state, employee) {
    state.employees.filter(employe => {
      if (employe.id === employee.id) {
        employe = employee
      }
    })
  }
}

const actions = {
  addEmployee: ({commit}, employee) => {
    commit('ADD_EMPLOYEE', employee)
  },
  updateEmployee: ({commit}, employee) => {
    commit('UPDATE_EMPLOYEE', employee)
  }
}

const getters = {
  employees: state => {
    return state.employees
  },
  employeesDataLoaded: state => {
    return state.employees.length > 0
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
