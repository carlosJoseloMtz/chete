<template>
  <div v-if="!isEmLoadedData">
    <md-empty-state
      md-icon="devices_other"
      md-label="You don't have any employee"
      md-description="Select button to add one.">
      <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
    </md-empty-state>
  </div>
  <div v-else>
    <div v-if="localActiveEmployees.length > 0">
      <h3>Active Employees</h3>
      <md-field>
        <md-icon>search</md-icon>
          <label>Search</label>
        <md-input v-model="activeSearch"></md-input>
      </md-field>
      <md-table>
        <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Status</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Action</md-table-head>
        </md-table-row>
        <md-table-row  v-for="(employee, index) in localActiveEmployees" :Key="employee.name"
          v-bind:employees="localActiveEmployees" v-bind:visibleEmployee="visibleEmployee" v-bind:currentPage="currentPage">
          <md-table-cell>{{employee.firstName}} {{employee.lastName}}</md-table-cell>
          <md-table-cell>{{employee.status}}</md-table-cell>
          <md-table-cell>{{employee.email}}</md-table-cell>
          <md-table-cell><md-button @click.native="active(false,employee.id)" class="md-icon-button md-raised">
                          <md-icon>thumb_down</md-icon></md-button></md-table-cell>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <pagination v-bind:data="localActiveEmployees" v-on:page:update="updatePage"
        v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"> </pagination>
    </div>
    <div v-if="localDesactiveEmployees.length > 0">
      <h3>Desactive Employees</h3>
      <md-field>
        <md-icon>search</md-icon>
          <label>Search</label>
        <md-input v-model="desactiveSearch"></md-input>
      </md-field>
      <md-table>
        <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Status</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Action</md-table-head>
        </md-table-row>
        <md-table-row  v-for="(employee, index) in localDesactiveEmployees" :Key="employee.name"
          v-bind:employees="localDesactiveEmployees" v-bind:visibleEmployee="visibleEmployee" v-bind:currentPage="currentPage">
          <md-table-cell>{{employee.firstName}} {{employee.lastName}}</md-table-cell>
          <md-table-cell>{{employee.status}}</md-table-cell>
          <md-table-cell>{{employee.email}}</md-table-cell>
          <md-table-cell><md-button @click.native="active(true,employee.id)" class="md-icon-button md-raised">
                          <md-icon>thumb_up</md-icon></md-button></md-table-cell>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <pagination v-bind:data="localDesactiveEmployees" v-on:page:update="updatePage"
        v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"> </pagination>
    </div>
    <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
  </div>
</template>
<script>
import Pagination from '../commons/Pagination.vue'
import Environment from '../../commons/environment-configuration'
import UserService from '../../services/user-service'

export default {
  name: 'Employee',
  mounted: function () {
    this.$store.dispatch('loadEmployeeData')
    this.localActiveEmployees = this.activeEmployees
    this.localDesactiveEmployees = this.desactiveEmployees
    this.$nextTick(function () {
      this.updateResource()
    })
  },
  watch : {
    activeSearch () {
        this.localActiveEmployees = this.activeEmployees
        if (this.activeSearch !== '') {
          this.localActiveEmployees = this.localActiveEmployees.filter(c => c.email.toLowerCase().includes(`${this.activeSearch.trim()}`))
          this.localActiveEmployees = this.localActiveEmployees.length == 0? this.activeEmployees: this.localActiveEmployees
        } else {
          this.localActiveEmployees = this.activeEmployees
        }
    },
    desactiveSearch () {
        this.localDesactiveEmployees = this.desactiveEmployees
        if (this.desactiveSearch !== '') {
          this.localDesactiveEmployees = this.localDesactiveEmployees.filter(c => c.email.toLowerCase().includes(`${this.desactiveSearch.trim()}`))
          this.localDesactiveEmployees = this.localDesactiveEmployees.length == 0? this.desactiveEmployees: this.localDesactiveEmployees
        } else {
          this.localDesactiveEmployees = this.desactiveEmployees
        }
    }
  },
  methods: {
    openForm () {
      this.$router.push('Employees-form')
    },

    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateResource()
    },

    active(status, id) {
      let body = {
        "id": id,
        "status": status
      }
      UserService.active(body).then(data => {
        data = JSON.parse(data)
        console.log(data)
        if (data.status === 'success') {
          this.$store.dispatch('updateEmployee', data.data)
          this.$store.dispatch('loadEmployeeData')
          setTimeout(_ => {
            this.localActiveEmployees = this.activeEmployees
            this.localDesactiveEmployees = this.desactiveEmployees
          }, 500);

        }
      })
    },

    updateResource () {
      this.visibleEmployee = this.employees.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      if (this.visibleEmployee.length === 0 && this.visibleEmployee > 0) {
        this.updatePage(this.currentPage - 1)
      }
    }
  },
  components: {
    Pagination
  },
  computed: {
    employees () {
      return this.$store.getters.employees
    },
    activeEmployees () {
      return this.$store.getters.activeEmployees
    },
    desactiveEmployees () {
      return this.$store.getters.desactiveEmployees
    },
    isEmLoadedData () {
      this.updateResource()
      return this.$store.getters.employeesDataLoaded
    }
  },
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false,
    currentPage: Environment.startCurrentPage,
    pageSize: Environment.sizeElementPagination,
    visibleEmployee: [],
    activeSearch: '',
    desactiveSearch: '',
    localActiveEmployees: [],
    localDesactiveEmployees: [],
  })
}
</script>
<style>
  .center {
    padding-top: 30px;
    padding-bottom: 10px;
    }
</style>
