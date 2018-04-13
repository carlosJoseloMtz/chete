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
import CategoryService from '../../services/category-service'
export default {
  name: 'Categories-form',
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
      if (this.complete === true) {
        this.$router.push('Categories')
      }
    },
    save () {
      let body = {}
      if (!this.textarea.trim() || !this.name.trim()) {
        this.message = 'Incorrect Information'
        this.complete = false
        this.showSnackbar = true
      } else {
        body = {
          'name': this.name,
          'description': this.textarea
        }
        CategoryService.save(body).then(data => {
          data = JSON.parse(data)
          if (data.status === 'success') {
            this.$store.dispatch('addOneCategory', data.data)
            this.message = 'Category created'
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
    duration: 10000,
    isInfinity: false,
    name: null,
    active: 'first',
    first: false,
    second: false,
    secondStepError: null,
    textarea: null,
    description: null,
    categorySelected: null,
    selectedCategories: null,
    message: String,
    complete: Boolean
  })
}
</script>
<style>
</style>
