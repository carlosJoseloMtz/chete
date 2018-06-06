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
        </md-table-row>
        <md-table-row  v-for="(employee, index) in localActiveEmployees" :Key="employee.name"
          v-bind:employees="localActiveEmployees" v-bind:visibleEmployee="visibleEmployee" v-bind:currentPage="currentPage">
          <md-table-cell>{{employee.firstName}} {{employee.lastName}}</md-table-cell>
          <md-table-cell>{{employee.status}}</md-table-cell>
          <md-table-cell>{{employee.email}}</md-table-cell>
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
        <md-table-head>Action</md-table-head>
        </md-table-row>
        <md-table-row  v-for="(employee, index) in localDesactiveEmployees" :Key="employee.name"
          v-bind:employees="localDesactiveEmployees" v-bind:visibleEmployee="visibleEmployee" v-bind:currentPage="currentPage">
          <md-table-cell>{{employee.firstName}} {{employee.lastName}}</md-table-cell>
          <md-table-cell>{{employee.status}}</md-table-cell>
          <md-table-cell>{{employee.email}}</md-table-cell>
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
  methods: {
    openForm () {
      this.$router.push('Employees-form')
    },
    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateResource()
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
