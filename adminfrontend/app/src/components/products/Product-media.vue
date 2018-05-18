<template>
  <div class="scroll" v-if="imageGallery.length > 0" md-label="Images Existing">
    <div class="inline" v-for="(ig, index) in imageGallery" :Key="index">
      <img v-bind:src="`${ig}-small`" @click="updateImageUrl(index)"/>
    </div>
  </div>
</template>

<script>
import ProductService from '../../services/product-service'
export default {
  name: 'Products-media',
  beforeMount: function () {
    this.$store.dispatch('loadProductCatalogData')
    this.catalogSelected = []
    for (const element in this.catalogs) {
      this.catalogSelected.push(this.catalogs[element].name)
    }
  },
  methods: {
    setDone (id, index) {
      this[id] = true
      this.secondStepError = null
      if (!this.name.trim() || !this.description.trim() || !this.code.trim() || this.selectedEmployee === null) {
        this.message = 'Some field is empty'
        this.complete = false
        this.showSnackbar = true
        return
      }
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
        this.$router.push('/Products')
      }
    },
    save () {
      let body = {}
      let price = null
      if (this.price === null || this.dueDate === null || !this.price.trim()) {
        this.message = 'Incorrect Information'
        this.complete = false
        this.showSnackbar = true
      } else {
        price = [{
          'beginDate': this.beginDate,
          'dueDate': this.dueDate,
          'price': this.price,
          'active': true
        }]
        for (const element in this.catalogs) {
          if (this.catalogs[element].name === this.selectedEmployee) {
            body = {
              'name': this.name,
              'price': price,
              'description': this.description,
              'code': this.code,
              'catalog': this.catalogs[element].id
            }
          }
        }
        ProductService.save(body).then(data => {
          data = JSON.parse(data)
          if (data.status === 'success') {
            this.$store.dispatch('addProduct', data.data)
            this.message = 'Product Agree'
            this.complete = true
            this.showSnackbar = true
          }
        })
      }
    }
  },
  computed: {
    catalogs () {
      return this.$store.getters.productsCatalogs
    }
  },
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false,
    beginDate: Date.now(),
    dueDate: null,
    price: null,
    name: '',
    active: 'first',
    first: false,
    second: false,
    secondStepError: null,
    selectedItem: String,
    textarea: null,
    discount: false,
    description: '',
    catalogSelected: null,
    selectedEmployee: null,
    message: String,
    net: false,
    code: '',
    useAsPrice: false,
    complete: Boolean
  })
}
</script>

<style>
</style>
