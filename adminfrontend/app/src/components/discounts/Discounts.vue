<template>
  <div>
    <div v-if="products.length === 0">
      <md-empty-state
        md-icon="devices_other"
        md-label="You don't have any categories"
        md-description="Select button to add one.">
        <md-button class="md-primary md-raised" @click.native="openForm()">+</md-button>
      </md-empty-state>
    </div>
    <div v-else>
      <md-table>
        <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Discount</md-table-head>
        </md-table-row>
        <md-table-row  v-for="(product) in visibleProducts" :Key="product.id"
          v-bind:product="product" v-bind:visibleProducts="visibleProducts" v-bind:currentPage="currentPage">
          <md-table-cell md-numeric>{{product.id}}</md-table-cell>
          <md-table-cell>{{product.name}}</md-table-cell>
          <md-table-cell>{{product.discounts}} </md-table-cell>
        </md-table-row>
      </md-table>
      <pagination v-bind:data="products" v-on:page:update="updatePage"
        v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"> </pagination>
      <md-button  class="md-primary md-raised" @click.native="openForm()">+</md-button>
    </div>
    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>El product fue eliminado</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import Pagination from '../pagination/Pagination.vue'
import Environment from '../../commons/environment-configuration'
export default {
  name: 'Discounts',
  mounted: function () {
    this.updateResource()
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
    visibleProducts: []
  })
}
</script>
<style>
  .center {
    padding-top: 30px;
    padding-bottom: 10px;
    }
</style>
