<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Stok" :md-done.sync="first">
        <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
          <h2 class="md-layout-item md-size-50">Provide information</h2>
          <md-field class="md-layout-item md-size-90">
             <label>Cantidad</label>
             <md-input v-model="cantidad"></md-input>
          </md-field>
          <md-autocomplete
                  class="md-layout-item md-size-90"
                  v-model="selectedEmployee"
                  :md-options="catalogs"
                  md-layout="box">
            <label>Products...</label>
          </md-autocomplete>
          <md-field class="md-layout-item md-size-90">
            <label for="catalogs">Warehouse</label>
            <md-select v-model="warehouses" name="catalogs" id="catalogs" md-dense multiple>
              <md-option v-for="warehouse in warehouses" :Key="warehouse.id">{{warehouse.name}}</md-option>
            </md-select>
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
export default {
  name: 'Stocks',
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
    warehouse: false,
    active: 'first',
    first: false,
    secondStepError: null,
    selectedItem: String,
    textarea: null,
    warehouses: [{
      id: '1',
      name: 'Star Wars'
    },
    {
      id: '2',
      name: 'Fast and Furios'
    },
    {
      id: '3',
      name: 'Avengers'
    },
    {
      id: '4',
      name: 'Thor'
    },
    {
      id: '5',
      name: 'Iron Man'
    },
    {
      id: '6',
      name: 'Wolverine'
    }]
  })
}
</script>
<style>
  .center {
    padding-top: 30px;
    padding-bottom: 10px;
    }
</style>
