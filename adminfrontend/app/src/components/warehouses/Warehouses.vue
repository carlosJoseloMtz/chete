<template>
  <div>
    <div v-if="warehouses.length === 0">
      <md-empty-state
        md-icon="devices_other"
        md-label="You don't have any warehouses"
        md-description="Select button to add one.">
        <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
      </md-empty-state>
    </div>
    <div v-else>
      <md-table>
        <md-table-row>
        <md-table-head>Type</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Action</md-table-head>
        </md-table-row>
        <md-table-row  v-for="(warehouse, index) in visibleWarehouses" :Key="warehouse.name"
          v-bind:warehouse="warehouse" v-bind:visibleWarehouses="visibleWarehouses" v-bind:currentPage="currentPage">
          <md-table-cell>{{warehouse.type}}</md-table-cell>
          <md-table-cell>{{warehouse.name}}</md-table-cell>
          <md-table-cell> <md-button @click.native="deleteItem(warehouse, index)" class="md-icon-button md-raised">
                          <md-icon>delete</md-icon>
                          </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <pagination v-bind:data="warehouses" v-on:page:update="updatePage"
        v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"> </pagination>
      <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
    </div>
    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>El warehouse fue eliminado</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import WarehouseService from '../../services/warehouse-service'
import Pagination from '../commons/Pagination.vue'
import Environment from '../../commons/environment-configuration'
export default {
  name: 'Warehouses',
  mounted: function () {
    this.$store.dispatch('loadWarehouseData')
    this.updateResource()
  },
  methods: {
    openForm () {
      this.$router.push('/Warehouses-form')
    },
    deleteItem (warehouse, index) {
      WarehouseService.delete(warehouse.id).then(data => {
        this.$store.dispatch('removeWarehouse', index)
        this.showSnackbar = true
      })
    },
    submit () {
      this.showSnackbar = false
    },
    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateResource()
    },
    updateResource () {
      this.visibleWarehouses = this.warehouses.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      if (this.visibleWarehouses.length === 0 && this.visibleWarehouses > 0) {
        this.updatePage(this.currentPage - 1)
      }
    }
  },
  computed: {
    warehouses () {
      return this.$store.getters.warehouses
    }
  },
  components: {
    Pagination
  },
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false,
    currentPage: Environment.startCurrentPage,
    pageSize: Environment.sizeElementPagination,
    visibleWarehouses: []
  })
}
</script>
<style>
  .center {
    padding-top: 30px;
    padding-bottom: 10px;
  }
  .add-fab-button {
    float: right;
    position: fixed;
    bottom: 25px;
    right: 25px;
    background-color: #F44336;
    z-index: 1000;
  }
</style>
