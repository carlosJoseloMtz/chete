<template>
  <div>
    <div v-if="!isLoadedData">
      <md-empty-state
        md-icon="devices_other"
        md-label="You don't have any stock"
        md-description="Select button to add one.">
        <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
      </md-empty-state>
    </div>
    <div v-else>
      <md-table>
        <md-table-row>
        <md-table-head>Product</md-table-head>
        <md-table-head>Quantity</md-table-head>
        </md-table-row>
        <md-table-row  v-for="(stock) in stocks" :Key="stock.id"
          v-bind:stock="stock" v-bind:stocks="stocks" v-bind:currentPage="currentPage">
          <md-table-cell>{{stock.product.code}}</md-table-cell>
          <md-table-cell>{{stock.stock}} </md-table-cell>
        </md-table-row>
      </md-table>
      <pagination v-bind:data="stocks" v-on:page:update="updatePage"
        v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"> </pagination>
      <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
    </div>
    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>El stock fue eliminado</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import Pagination from '../commons/Pagination.vue'
import Environment from '../../commons/environment-configuration'
export default {
  name: 'Stocks',
  mounted: function () {
    this.$store.dispatch('loadStockData')
    this.$nextTick(function () {
      this.updateResource()
    })
  },
  methods: {
    openForm () {
      this.$router.push('Stocks-form')
    },
    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateResource()
    },
    updateResource () {
      this.visibleStocks = this.stocks.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      if (this.visibleStocks.length === 0 && this.visibleStocks > 0) {
        this.updatePage(this.currentPage - 1)
      }
    }
  },
  components: {
    Pagination
  },
  computed: {
    stocks () {
      return this.$store.getters.stockSum
    },
    isLoadedData () {
      this.updateResource()
      return this.$store.getters.stockDataLoaded
    }
  },
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false,
    currentPage: Environment.startCurrentPage,
    pageSize: Environment.sizeElementPagination,
    visibleStocks: []
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
