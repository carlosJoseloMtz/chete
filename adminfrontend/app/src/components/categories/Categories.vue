<template>
  <div>
    <div v-if="categories.length === 0">
      <md-empty-state
        md-icon="devices_other"
        md-label="You don't have any category"
        md-description="Select button to add one.">
        <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
      </md-empty-state>
    </div>
    <div v-else>
      <md-table>
        <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Description</md-table-head>
        </md-table-row>
        <md-table-row  v-for="(category) in visibleCategories" :Key="category.id"
          v-bind:categories="category" v-bind:visibleCategories="visibleCategories" v-bind:currentPage="currentPage">
          <md-table-cell>{{category.name}}</md-table-cell>
          <md-table-cell>{{category.description}} </md-table-cell>
        </md-table-row>
      </md-table>
      <pagination v-bind:data="categories" v-on:page:update="updatePage"
        v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"> </pagination>
      <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
    </div>
    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>LA categoria fue eliminado</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import Pagination from '../commons/Pagination.vue'
import Environment from '../../commons/environment-configuration'

export default {
  name: 'Categories',
  mounted: function () {
    this.$store.dispatch('loadCategoryData')
    this.updateResource()
  },
  methods: {
    openForm () {
      this.$router.push('Categories-form')
    },
    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateResource()
    },
    updateResource () {
      this.visibleCategories = this.categories.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      if (this.visibleCategories.length === 0 && this.visibleCategories > 0) {
        this.updatePage(this.currentPage - 1)
      }
    }
  },
  computed: {
    categories () {
      return this.$store.getters.categories
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
    visibleCategories: []
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
