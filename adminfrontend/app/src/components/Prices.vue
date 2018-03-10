<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Products" :md-error="secondStepError" :md-done.sync="second">
        <div class="md-layout md-gutter md-alignment-left-space-around">
          <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
            <h2 class="md-layout-item md-size-50">Select product</h2>
            <md-autocomplete
                    v-model="selectedEmployee"
                    :md-options="products"
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
          <md-field class="md-layout-item md-size-50">
             <label>$ Price</label>
             <md-input v-model="price"></md-input>
          </md-field>
          <div class="md-layout-item md-size-80">
            <md-button class="md-raised md-primary" @click="setDone('second','third')">Continue</md-button>
          </div>
        </div>
      </md-step>
    </md-steppers>
  </div>
</template>
<script>
export default {
  name: 'Prices',
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
    beginDate: Date.now(),
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
}
</script>
<style>
</style>
