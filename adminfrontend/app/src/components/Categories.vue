<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Catalog" :md-done.sync="first">
        <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
          <h2 class="md-layout-item md-size-50">Provide next information</h2>
          <md-field class="md-layout-item md-size-90">
             <label>Name</label>
             <md-input v-model="name"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-90">
            <label>Description</label>
            <md-textarea v-model="textarea"></md-textarea>
          </md-field>
          <div>
            <md-button class="md-raised md-primary" @click="setDone('first','second')">Continue</md-button>
          </div>
        </div>
      </md-step>

      <md-step id="second" md-label="Products" :md-error="secondStepError" :md-done.sync="second">
        <div class="md-layout md-gutter md-alignment-left-space-around">
          <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
            <h2 class="md-layout-item md-size-50">Chose products depends </h2>
            <md-field>
             <label for="products">Products</label>
             <md-select v-model="products" name="products" id="products" md-dense multiple>
               <md-option v-for="product in products" :Key="product.id">{{product.name}}</md-option>
             </md-select>
           </md-field>
          <div>
            <md-button class="md-raised md-primary" @click="setDone('second','second')">Continue</md-button>
          </div>
        </div>
      </div>
      </md-step>
    </md-steppers>
  </div>
</template>
<script>
export default {
  name: 'Categories',
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    setDone (id, index) {
      this[id] = true
      this.secondStepError = null
      if (this.description === null || this.name === null) {
        return
      }
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
    name: null,
    warehouse: false,
    active: 'first',
    first: false,
    second: false,
    third: false,
    secondStepError: null,
    selectedItem: String,
    textarea: null
  })
}
</script>
<style>
</style>
