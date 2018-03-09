<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Catalogs" :md-done.sync="first">
        <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
          <h2 class="md-layout-item md-size-50">Provide employee information</h2>
          <md-field class="md-layout-item md-size-80">
             <label>Name</label>
             <md-input v-model="name"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-80">
             <label>Password</label>
             <md-input v-model="password"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-80">
             <label>Email</label>
             <md-input v-model="password"></md-input>
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
  name: 'Users',
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
    password: null,
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
</style>
