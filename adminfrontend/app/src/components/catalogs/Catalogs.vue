<template>
  <div v-if="!showMerged">
    <div v-if="!isLoadedData">
      <md-empty-state
        md-icon="devices_other"
        md-label="You don't have any catalog"
        md-description="Select button to add one.">
        <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
      </md-empty-state>
    </div>
    <div v-else>
      <div v-if="offlineCatalogs.length > 0">
        <h3>Offline Catalogs</h3>
        <md-table >
          <md-table-row>
          <md-table-head>Name</md-table-head>
          <md-table-head>Description</md-table-head>
          <md-table-head>Merge</md-table-head>
          </md-table-row>
          <md-table-row  v-for="(catalog) in offlineCatalogs" :Key="catalog.id"
            v-bind:catalogs="catalog" v-bind:visibleCatalogs="visibleCatalogs" v-bind:currentPage="currentPage">
            <md-table-cell>{{catalog.name}}</md-table-cell>
            <md-table-cell>{{catalog.description}} </md-table-cell>
            <md-table-cell v-if="catalog.online == false">
              <md-button @click.native="catalogSelected = catalog.name, catalogSelectedId = catalog.id, showMerged = true" class="md-icon-button md-raised">
                              <md-icon>call_merge</md-icon>
              </md-button>
            </md-table-cell>
            <md-table-cell v-else></md-table-cell>
          </md-table-row>
        </md-table>
        <pagination v-bind:data="offlineCatalogs" v-on:page:update="updatePage"
          v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"> </pagination>
      </div>
      <div v-if="onlineCatalogs.length > 0">
        <h3>Online Catalogs</h3>
        <md-table>
          <md-table-row>
          <md-table-head>Name</md-table-head>
          <md-table-head>Description</md-table-head>
          </md-table-row>
          <md-table-row  v-for="(catalog) in onlineCatalogs" :Key="catalog.id"
            v-bind:catalogs="catalog" v-bind:visibleCatalogs="visibleCatalogs" v-bind:currentPage="currentPage">
            <md-table-cell>{{catalog.name}}</md-table-cell>
            <md-table-cell>{{catalog.description}} </md-table-cell>
          </md-table-row>
        </md-table>
        <pagination v-bind:data="onlineCatalogs" v-on:page:update="updatePage"
          v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"> </pagination>
        <md-button  class="md-primary md-fab add-fab-button md-icon-button" @click.native="openForm()"><md-icon>add</md-icon></md-button>
      </div>
    </div>
  </div>
  <div v-else>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Select Catalog to Merge" :md-done.sync="first">
        <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
          <h2 class="md-layout-item md-size-50">Catalog Selected: {{catalogSelected}}</h2>
          <md-autocomplete
                  v-model="selectCatalog"
                  :md-options="onlineCatalogsSelected"
                  md-layout="box">
            <label>Search...</label>
          </md-autocomplete>
          <div class="md-layout-item md-size-80">
            <md-button class="md-raised md-primary" @click.native="merge()">Continue</md-button>
            <md-button class="md-raised md-primary" @click.native="showMerged = false">Back</md-button>
          </div>
        </div>
      </md-step>
    </md-steppers>
    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>{{message}}</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import ProductCatalogService from '../../services/product-catalog-service'
import Pagination from '../commons/Pagination.vue'
import Environment from '../../commons/environment-configuration'

export default {
  name: 'Catalogs',
  mounted: function () {
    for (const element in this.onlineCatalogs) {
      this.onlineCatalogsSelected.push(this.onlineCatalogs[element].name)
    }
    this.showMerged = false
    this.$store.dispatch('loadProductCatalogData')
    this.$nextTick(function () {
      this.updateResource()
    })
  },
  methods: {
    openForm () {
      this.$router.push('Catalogs-form')
    },

    submit () {
      if (this.complete === true) {
        this.showSnackbar = false
        this.showMerged = false
      }
    },

    merge () {
      let destination
      this.onlineCatalogs.filter( oc => {
        if (oc.name === this.selectCatalog) {
          destination = oc
        }
      })
      let body = {
        base: this.catalogSelectedId,
        to: destination.id
      }
      ProductCatalogService.clone(body).then(data => {
        data = JSON.parse(data)
        if (data.status === 'success' && data.data === `the catalog base ${this.catalogSelected} dont have any product`) {
          this.message = data.data
          this.complete = true
          this.showSnackbar = true
        } else {
          this.$store.dispatch('removeProductCatalog', this.catalogSelectedId)
          this.message = `Catalogs ${this.selectCatalog} merged on ${this.catalogSelected}`
          this.complete = true
          this.showSnackbar = true
        }
      })
    },

    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateResource()
    },

    updateResource () {
      this.visibleCatalogs = this.catalogs.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      if (this.visibleCatalogs.length === 0 && this.visibleCatalogs > 0) {
        this.updatePage(this.currentPage - 1)
      }
    }
  },
  computed: {
    catalogs () {
      return this.$store.getters.productsCatalogs
    },
    isLoadedData () {
      this.updateResource()
      return this.$store.getters.productsCatalogsDataLoaded
    },
    onlineCatalogs () {
      return this.$store.getters.productsCatalogsOnline
    },
    offlineCatalogs () {
      return this.$store.getters.productsCatalogsOffline
    }
  },
  components: {
    Pagination
  },
  data: () => ({
    showSnackbar: false,
    active: 'first',
    first: false,
    second: false,
    position: 'center',
    duration: 4000,
    isInfinity: false,
    currentPage: Environment.startCurrentPage,
    pageSize: Environment.sizeElementPagination,
    visibleCatalogs: [],
    catalogSelected: String,
    catalogSelectedId: String,
    showMerged: Boolean,
    selectedCatalog: String,
    onlineCatalogsSelected: [],
    remove: false,
    selectCatalog: null,
    message: String,
    complete: Boolean
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
