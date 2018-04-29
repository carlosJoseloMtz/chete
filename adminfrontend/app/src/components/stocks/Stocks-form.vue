<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Stok" :md-done.sync="first">
        <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
          <h2 class="md-layout-item md-size-50">Provide information</h2>
          <md-field class="md-layout-item md-size-90">
             <label>Stock</label>
             <md-input v-model="cantidad"></md-input>
          </md-field>
          <md-field>
            <label for="selectedProduct">Product</label>
            <md-select v-model="selectedProduct" name="selectedProduct" id="selectedProduct" md-dense>
              <md-option v-for="(product) in productOnlyCode" :key="product.id" v-bind:value="product.id" >
                {{product.code}}
              </md-option>
            </md-select>
          </md-field>
          <div class="md-layout-item md-size-80">
            <md-button class="md-raised md-primary" @click="setDone('first','second')">Continue</md-button>
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
import StockService from '../../services/stock-service'
export default {
  name: 'Stocks-form',
  mounted: function () {
    this.$store.dispatch('loadProductData')
  },
  methods: {
    setDone (id, index) {
      this[id] = true
      this.secondStepError = null
      if (!this.cantidad.trim() || this.selectedProduct === null) {
        this.message = 'Some field is empty'
        this.complete = false
        this.showSnackbar = true
      } else {
        this.save()
      }
    },
    submit () {
      if (this.complete === true) {
        this.$router.push('/Stocks')
      }
    },
    save () {
      let body = {
        'product': this.selectedProduct,
        'stock': parseInt(this.cantidad)
      }
      StockService.save(body).then(data => {
        data = JSON.parse(data)
        if (data.status === 'success') {
          this.$store.dispatch('addStock', data.data)
          this.message = 'Stock Agree'
          this.complete = true
          this.showSnackbar = true
        }
      })
    }
  },
  computed: {
    productOnlyCode () {
      return this.$store.getters.productOnlyCode
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
    productSelected: null,
    warehouseSelected: null,
    selectedProduct: null,
    selectedWarehouse: null,
    message: String,
    net: false,
    code: '',
    cantidad: null,
    useAsPrice: false,
    complete: Boolean,
    index: '',
    value: ''
  })
}
</script>
<style>
  .center {
    padding-top: 30px;
    padding-bottom: 10px;
    }
</style>
