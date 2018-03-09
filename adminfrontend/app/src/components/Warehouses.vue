<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step class="md-layout md-alignment-center-center" id="first" md-label="Warehouse/Store" :md-done.sync="first">
        <div class="md-layout-item md-size-100 md-alignment-center-center">
          <h2 class="md-layout-item md-size-100">Plese select one</h2>
            <md-checkbox v-model="store" ref="store">Store</md-checkbox>
            <md-checkbox v-model="warehouse" ref="warehouse">Warehouse</md-checkbox>
          <div>
            <md-button class="md-raised md-primary" @click="setDone('first','second')">Continue</md-button>
          </div>
        </div>
      </md-step>

      <md-step id="second" md-label="Address" :md-error="secondStepError" :md-done.sync="second">
        <div class="md-layout md-gutter md-alignment-left-space-around">
          <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
            <h2>Please provide the {{selectedItem}} address information</h2>
            <md-field class="md-layout-item md-size-80">
               <label>Street</label>
               <md-input></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-20">
               <label>City</label>
               <md-input></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-20">
               <label>State</label>
               <md-input></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-60">
               <label>Country</label>
               <md-input></md-input>
            </md-field>
            <md-field  class="md-layout-item md-size-15">
               <label>ZipCode</label>
               <md-input></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-around">
            <h2 class="md-layout-item md-size-100 md-layout md-grutter md-alignment-center-center center">Geo-Point</h2>
            <md-field class="md-layout-item md-size-45 item-">
               <label>Latitude</label>
               <md-input></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-45">
               <label>Longitude</label>
               <md-input></md-input>
            </md-field>
          </div>
          <div>
            <md-button class="md-raised md-primary" @click="setDone('second','third')">Continue</md-button>
          </div>
        </div>
      </md-step>
      <md-step id="third" md-label="Stck" :md-done.sync="third">
        <div>
          <md-field>
             <label>Stock</label>
             <md-input></md-input>
          </md-field>
        </div>
           <div>
             <md-button class="md-raised md-primary" @click="setDone('third','third')">Guardar</md-button>
           </div>
      </md-step>
    </md-steppers>
  </div>
</template>
<script>
export default {
  name: 'Warehouses',
  methods: {
    setDone (id, index) {
      this[id] = true
      this.secondStepError = null
      console.log(this.store)
      console.log(this.warehouse)
      if (this.store === false && this.warehouse === false) {
        return
      }

      if (this.store === true && this.warehouse === true) {
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
    store: false,
    warehouse: false,
    active: 'first',
    first: false,
    second: false,
    third: false,
    secondStepError: null,
    selectedItem: String
  })
}

</script>
<style>
.center {
  padding-top: 30px;
  padding-bottom: 10px;
  }
</style>
