<template>
  <div>
    <div v-if="!isLoadedData">
      <md-empty-state
        md-icon="devices_other"
        md-label="You don't have any categories"
        md-description="Select button to add one.">
        <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
      </md-empty-state>
    </div>
    <div v-else>
      <md-field>
        <md-icon>search</md-icon>
          <label>Search by code</label>
        <md-input v-model="productSearch"></md-input>
      </md-field>
      <md-table>
        <md-table-row>
        <md-table-head>code</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Discount</md-table-head>
        </md-table-row>
        <md-table-row  v-for="(product) in localProducts" :Key="product.id"
          v-bind:product="localProducts" v-bind:visibleProducts="visibleProducts" v-bind:currentPage="currentPage">
          <md-table-cell>{{product.code}}</md-table-cell>
          <md-table-cell>{{product.name}}</md-table-cell>
          <md-table-cell>{{product.discounts}} </md-table-cell>
        </md-table-row>
      </md-table>
      <pagination v-bind:data="products" v-on:page:update="updatePage"
        v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"> </pagination>
      <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
    </div>
    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>El product fue eliminado</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import Pagination from '../commons/Pagination.vue'
import Environment from '../../commons/environment-configuration'
export default {
  name: 'Discounts',
  mounted: function () {
    this.$store.dispatch('loadProductData')
    this.localProducts = this.products
    this.$nextTick(function () {
      this.updateResource()
    })
  },
  watch: {
    productSearch () {
      this.localProducts = this.products
      if (this.productSearch !== '') {
        this.localProducts = this.localProducts.filter(p => p.code.toLowerCase().includes(`${this.productSearch.trim()}`))
        this.localProducts = this.localProducts.length == 0? this.products: this.localProducts
      } else {
        this.localProducts = this.products
      }
    }
  },
  methods: {
    openForm () {
      this.$router.push('Discounts-form')
    },
    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateResource()
    },
    updateResource () {
      this.visibleProducts = this.products.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      if (this.visibleProducts.length === 0 && this.visibleProducts > 0) {
        this.updatePage(this.currentPage - 1)
      }
    }
  },
  computed: {
    products () {
      return this.$store.getters.productWithActiveDiscount
    },
    isLoadedData () {
      this.updateResource()
      return this.$store.getters.productDataLoaded
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
    visibleProducts: [],
    isDataLoad: false,
    localProducts:[],
    productSearch: ''
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
