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
            <md-field class="md-layout-item md-size-60">
             <label for="products">Catalog</label>
             <md-select v-model="products" name="products" id="products" md-dense multiple>
               <md-option v-for="product in products" :Key="product.id">{{product.name}}</md-option>
             </md-select>
           </md-field>
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
             Being Date
             <md-datepicker v-model="beginDate">
             </md-datepicker>
          </div>
          <md-field class="md-layout-item md-size-50">
             <label>Price</label>
             <md-input v-model="price"></md-input>
          </md-field>
          <div class="md-layout-item md-size-80">
            <md-button class="md-raised md-primary" @click="setDone('first','second')">Continue</md-button>
          </div>
        </div>
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
// para hacer un mapeo de getters. actions
// import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Products-form',
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    setDone (id, index) {
      this[id] = true
      this.secondStepError = null
      if (index) {
        this.active = index
        if (this.store === true && this.warehouse === false) {
          this.selectedItem = 'Store'
        } else {
          this.selectedItem = 'Warehouse'
        }
      }
    },
    setError () {
      this.secondStepError = 'This is an error!'
    }
  },
  data: () => ({
    beginDate: null,
    dueDate: null,
    price: null,
    name: null,
    warehouse: false,
    active: 'first',
    first: false,
    second: false,
    third: false,
    secondStepError: null,
    selectedItem: String,
    textarea: null,
    discount: false,
    description: null
  })
  // forma de traer el state product del store
  /* computed: {
    products () {
      return this.$store.state.products
    },
    // es una forma fea de un getter
    /**
      *saleProducts () {
      *return this.$store.getters.saleProducts
    } */
  /* ...mapGetters([
      'saleProducts'
    /*])
  },
  methods: {
    ...mapActions([
      'reducePrice'
    ])
  } /*
  /*
   * forma fea de implementar una accion/mutacion
    reducePrice: function (amount) {
    this.$store.dispatch('reducePrice', amount)
  } */
  /* forma de hacer una mutacion
  methods: {
    reducePrice: function () {
    // solo que no pueden realizar mutaciones directas necesitan una accion
      this.$store.commit('reducePrice')
    }
  } */
  /* forma fea de hacer la mutacion
  methods: {
    reducePrice: function () {
      this.$store.state.products.forEach(product => {
        product.description = 'algo no se'
      })
    } */
  /*
    forma fea de hacer un getter
    saleProducts () {
      var saleProducts = this.$store.state.products.map(product => {
        return {
          name: '**' + product.name + '**',
          description: product.description
       }
    })
  return saleProducts
  } */
}
</script>

<style>
</style>
