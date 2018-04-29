<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Products" :md-error="secondStepError" :md-done.sync="second">
        <div class="md-layout md-gutter md-alignment-left-space-around">
          <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
            <h2 class="md-layout-item md-size-50">Chose products depends </h2>
            <md-field class="md-layout-item md-size-60">
               <label>Name</label>
               <md-input v-model="name"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-60">
               <label>Description</label>
               <md-input v-model="description"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-60">
               <label>Code</label>
               <md-input v-model="code"></md-input>
            </md-field>
            <md-autocomplete
               v-model="selectedEmployee"
               :md-options="catalogSelected"
               md-layout="box">
              <label>Search...</label>
           </md-autocomplete>
          <div class="md-layout-item md-size-50">
            <md-button class="md-raised md-primary" @click="setDone('second','second')">Continue</md-button>
          </div>
        </div>
      </div>
      </md-step>

      <md-step id="second" md-label="Price" :md-done.sync="first">
        <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
          <h2 class="md-layout-item md-size-60">Provide next information</h2>
          <div class="md-layout-item md-size-80">
             Being Date
             <md-datepicker v-model="beginDate">
             </md-datepicker>
          </div>
          <div class="md-layout-item md-size-80">
             Due Date
             <md-datepicker v-model="dueDate">
             </md-datepicker>
          </div>
          <md-field class="md-layout-item md-size-50">
             <label>Price</label>
             <md-input v-model="price"></md-input>
          </md-field>
          <div class="md-layout-item md-size-80">
            <md-button class="md-raised md-primary" @click="save()">Continue</md-button>
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
import ProductService from '../../services/product-service'
export default {
  name: 'Products-form',
  beforeMount: function () {
    this.$store.dispatch('loadProductCatalogData')
    this.catalogSelected = []
    for (const element in this.catalogs) {
      this.catalogSelected.push(this.catalogs[element].name)
    }
  },
  methods: {
    setDone (id, index) {
      this[id] = true
      this.secondStepError = null
      if (!this.name.trim() || !this.description.trim() || !this.code.trim() || this.selectedEmployee === null) {
        this.message = 'Some field is empty'
        this.complete = false
        this.showSnackbar = true
        return
      }
      if (index) {
        this.active = index
      }
    },
    setError () {
      if (this.complete === true) {
        this.secondStepError = 'This is an error!'
      }
    },
    submit () {
      if (this.complete === true) {
        this.$router.push('/Products')
      }
    },
    save () {
      let body = {}
      let price = null
      if (this.price === null || this.dueDate === null || !this.price.trim()) {
        this.message = 'Incorrect Information'
        this.complete = false
        this.showSnackbar = true
      } else {
        price = [{
          'beginDate': this.beginDate,
          'dueDate': this.dueDate,
          'price': this.price,
          'active': true
        }]
        for (const element in this.catalogs) {
          if (this.catalogs[element].name === this.selectedEmployee) {
            body = {
              'name': this.name,
              'price': price,
              'description': this.description,
              'code': this.code,
              'catalog': this.catalogs[element].id
            }
          }
        }
        ProductService.save(body).then(data => {
          data = JSON.parse(data)
          if (data.status === 'success') {
            this.$store.dispatch('addProduct', data.data)
            this.message = 'Product Agree'
            this.complete = true
            this.showSnackbar = true
          }
        })
      }
    }
  },
  computed: {
    catalogs () {
      return this.$store.getters.productsCatalogs
    }
  },
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false,
    beginDate: Date.now(),
    dueDate: null,
    price: null,
    name: '',
    active: 'first',
    first: false,
    second: false,
    secondStepError: null,
    selectedItem: String,
    textarea: null,
    discount: false,
    description: '',
    catalogSelected: null,
    selectedEmployee: null,
    message: String,
    net: false,
    code: '',
    useAsPrice: false,
    complete: Boolean
  })
}
</script>

<style>
</style>
