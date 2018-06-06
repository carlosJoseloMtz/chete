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
  },
  activeEmployees : state => {
    return sortFunctions.activeEmployee(state.employees)
  },
  desactiveEmployees : state => {
    return sortFunctions.desactiveEmployee(state.employees)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

const sortFunctions = {
  activeEmployee: (employees) => {
    let activeEmployees = []
    employees.forEach(em => {
      if (em.active === true) {
        activeEmployees.push(em)
      }
    })
    return activeEmployees
  },
  desactiveEmployee: (employees) => {
    let desactiveEmployees = []
    employees.forEach(em => {
      if (em.active === false) {
        desactiveEmployees.push(em)
      }
    })
    return desactiveEmployees
  }
}
