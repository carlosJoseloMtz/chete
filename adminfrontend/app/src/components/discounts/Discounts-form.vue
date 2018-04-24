<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Products" :md-error="secondStepError" :md-done.sync="second">
        <div class="md-layout md-gutter md-alignment-left-space-around">
          <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
            <h2 class="md-layout-item md-size-50">Select product</h2>
            <md-autocomplete
                    v-model="selectedEmployee"
                    :md-options="productSelected"
                    md-layout="box">
              <label>Search...</label>
            </md-autocomplete>
            <div class="md-layout-item md-size-80">
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
          <div  class="md-layout-item md-size-80">
            <md-checkbox v-model="useAsPrice">Use as Price</md-checkbox>
          </div>
          <div  class="md-layout-item md-size-80">
            <md-checkbox v-model="net">Use as Net</md-checkbox>
          </div>
          <md-field class="md-layout-item md-size-50">
             <label>$ Price</label>
             <md-input v-model="price"></md-input>
          </md-field>
          <div class="md-layout-item md-size-80">
            <md-button class="md-raised md-primary" @click.native="save()">Continue</md-button>
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
  name: 'Discounts-form',
  beforeMount: function () {
    this.productSelected = []
    for (const element in this.products) {
      this.productSelected.push(this.products[element].code)
    }
  },
  computed: {
    products () {
      return this.$store.getters.products
    }
  },
  methods: {
    setDone (id, index) {
      this[id] = true
      this.secondStepError = null
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
      this.$router.push('/Discounts')
    },
    save () {
      let body = {}
      let discounts = null
      if (this.price === null || this.dueDate === null || !this.price.trim()) {
        this.message = 'Incorrect Information'
        this.complete = false
        this.showSnackbar = true
      } else {
        discounts = {
          'active': true,
          'beginDate': this.beginDate,
          'dueDate': this.dueDate,
          'price': this.price,
          'useAsPrice': this.useAsPrice,
          'discount': {
            'value': this.price,
            'net': this.net
          }
        }
        for (const element in this.products) {
          if (this.products[element].code === this.selectedEmployee) {
            body = this.products[element]
          }
        }
        body.price.forEach(data => {
          if (data.active === true) {
            data.active = false
          }
        })
        body.discounts.push(discounts)
        ProductService.update(body).then(data => {
          data = JSON.parse(data)
          if (data.status === 'uccess') {
            this.$store.dispatch('updateProduct', this.body)
            this.message = 'Discount Update'
            this.complete = true
            this.showSnackbar = true
          }
        })
      }
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
    name: null,
    active: 'first',
    first: false,
    second: false,
    secondStepError: null,
    selectedItem: String,
    textarea: null,
    discount: false,
    description: null,
    productSelected: null,
    selectedEmployee: null,
    message: String,
    net: false,
    useAsPrice: false,
    complete: Boolean
  })
}
</script>
<style>
</style>
