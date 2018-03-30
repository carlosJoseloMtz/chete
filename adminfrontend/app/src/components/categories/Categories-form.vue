<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Categories" :md-done.sync="first">
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
          <div class="md-layout-item md-size-90">
            <md-button class="md-raised md-primary" @click.native="submit()">Continue</md-button>
          </div>
        </div>
      </md-step>
    </md-steppers>
  </div>
</template>
<script>
export default {
  name: 'Categories-form',
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    submit () {
      console.log('todo Ok')
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
