<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Catalogs" :md-done.sync="first">
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

      <md-step id="second" md-label="Categories" :md-error="secondStepError" :md-done.sync="second">
        <div class="md-layout md-gutter md-alignment-left-space-around">
          <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
            <h2 class="md-layout-item md-size-50">Chose categories depend </h2>
            <md-field>
             <label for="catalogs">Catalogs</label>
             <md-select v-model="catalogs" name="catalogs" id="catalogs" md-dense multiple>
               <md-option v-for="catalog in catalogs" :Key="catalog.id">{{catalog.name}}</md-option>
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
  name: 'Catalogs',
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
    textarea: null,
    catalogs: [{
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
