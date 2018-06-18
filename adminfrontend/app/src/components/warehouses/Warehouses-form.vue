<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step class="md-layout md-alignment-center-center" id="first"
        md-label="Warehouse/Store" :md-done.sync="first">
        <div class="md-layout-item md-size-100 md-alignment-center-center">
          <h2 class="md-layout-item md-size-100">Plese select one</h2>
          <md-checkbox  v-model="store" ref="storeCheck">Store</md-checkbox>
          <md-checkbox  v-model="warehouse" ref="warehouseCheck">Warehouse</md-checkbox>
          <div>
            <md-field class="md-layout-item md-size-80">
               <label>Name</label>
               <md-input v-model="nameWarehouse"></md-input>
            </md-field>
          </div>
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
               <md-input v-model="street"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-20">
               <label>City</label>
               <md-input v-model="city"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-20">
               <label>State</label>
               <md-input v-model="state"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-60">
               <label>Country</label>
               <md-input v-model="country"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-15">
               <label>ZipCode</label>
               <md-input v-model="zipcode"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-around">
            <h2 class="md-layout-item md-size-100 md-layout md-grutter md-alignment-center-center center">Geo-Point</h2>
            <md-field class="md-layout-item md-size-45 item-">
               <label>Latitude</label>
               <md-input v-model="latitude"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-45">
               <label>Longitude</label>
               <md-input v-model="longitude"></md-input>
            </md-field>
          </div>
          <div>
            <md-button class="md-raised md-primary" @click.native="save()">Salvar</md-button>
          </div>
        </div>
      </md-step>
    </md-steppers>
    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>{{ message }}</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import WarehouseService from '../../services/warehouse-service'
export default {
  name: 'Warehouses-form',
  beforeMount: function () {
    if (localStorage.getItem('tk') === null && localStorage.getItem('tk') === undefined) {
      this.$router.push('/')
    }
  },
  methods: {
    save () {
      let body = {
        type: this.selectedType,
        name: this.nameWarehouse,
        address: {
          street: this.street,
          city: this.city,
          state: this.state,
          zipcode: this.zipcode,
          country: this.country,
          geopoint: {
            latitude: parseInt(this.latitude),
            longitude: parseInt(this.longitude)
          }
        }
      }
      WarehouseService.save(body).then(data => {
        data = JSON.parse(data)
        if (data.status === 'success') {
          this.$store.dispatch('addWarehouse', data.data)
          this.complete = true
          this.message = 'El warehouse fue agredado'
          this.showSnackbar = true
        } else {
          this.message = 'Verify the information'
          this.complete = false
          this.showSnackbar = true
        }
      })
    },

    setDone (id, index) {
      this[id] = true
      this.secondStepError = null
      let existing = false
      this.warehouses.forEach(a => {
        if (a.name === this.nameWarehouse) {
          existing = true
        }
      })
      if (this.store === false && this.warehouse === false) {
        this.message = 'Need select Store or Warehouse'
        this.complete = false
        this.showSnackbar = true
        return
      }

      if (this.store === true && this.warehouse === true) {
        this.message = 'Need select only one Store or Warehouse'
        this.complete = false
        this.showSnackbar = true
        return
      }
      if (this.nameWarehouse === '') {
        this.message = 'Name is empty'
        this.complete = false
        this.showSnackbar = true
        return
        return
      }
      if (existing === true) {
        this.message = 'Name already exist'
        this.complete = false
        this.showSnackbar = true
        return
      }

      if (index) {
        this.active = index
        if (this.store === true && this.warehouse === false) {
          this.selectedItem = 'Store'
          this.selectedType = 'store'
        } else {
          this.selectedItem = 'Warehouse'
          this.selectedType = 'warehouse'
        }
      }
    },

    setError () {
      this.secondStepError = 'This is an error!'
    },

    submit () {
      if (this.complete === true) {
        this.$router.push('/Warehouses')
      }
      this.showSnackbar = false
    }
  },
  computed: {
    warehouses () {
      return this.$store.getters.warehouses
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
    selectedItem: String,
    selectedType: false,
    showSnackbar: false,
    position: 'center',
    duration: 10000,
    isInfinity: false,
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    latitude: '',
    longitude: '',
    nameWarehouse: '',
    message: '',
    complete: false

  })
}
</script>

<style>
.center {
  padding-top: 30px;
  padding-bottom: 10px;
  }
</style>
