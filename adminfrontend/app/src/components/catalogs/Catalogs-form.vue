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
          <div class="md-layout-item md-size-80">
            <md-button class="md-raised md-primary" @click="setDone('first','second')">Continue</md-button>
          </div>
        </div>
      </md-step>

      <md-step id="second" md-label="Categories" :md-error="secondStepError" :md-done.sync="second">
        <div class="md-layout md-gutter md-alignment-left-space-around">
          <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
            <h2 class="md-layout-item md-size-50">Chose categories depend </h2>
            <md-autocomplete
                    v-model="selectedCategories"
                    :md-options="categorySelected"
                    md-layout="box">
              <label>Search...</label>
            </md-autocomplete>
            <div class="md-layout-item md-size-80">
              <md-button class="md-raised md-primary" @click.native="save()">Continue</md-button>
            </div>
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
import ProductCatalogService from '../../services/product-catalog-service'
export default {
  name: 'Catalogs-form',
  beforeMount: function () {
    this.categorySelected = []
    for (const element in this.categories) {
      this.categorySelected.push(this.categories[element].name)
    }
  },
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
        this.$router.push('Catalogs')
      }
    },
    save () {
      let body = {}
      if (!this.textarea.trim() || !this.name.trim()) {
        this.message = 'Incorrect Information'
        this.complete = false
        this.showSnackbar = true
      } else {
        for (const element in this.categories) {
          if (this.categories[element].name === this.selectedCategories) {
            body = {
              'name': this.name,
              'description': this.textarea,
              'category': this.categories[element].id
            }
          }
        }
        ProductCatalogService.save(body).then(data => {
          data = JSON.parse(data)
          if (data.status === 'success') {
            this.$store.dispatch('addOneProductCatalog', data.data)
            this.message = 'Catalog created'
            this.complete = true
            this.showSnackbar = true
          }
        })
      }
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
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
  .center {
    padding-top: 30px;
    padding-bottom: 10px;
    }
</style>
