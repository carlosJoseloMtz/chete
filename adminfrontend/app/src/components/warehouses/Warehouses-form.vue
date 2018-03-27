<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step class="md-layout md-alignment-center-center" id="first" md-label="Warehouse/Store" :md-done.sync="first">
        <div class="md-layout-item md-size-100 md-alignment-center-center">
          <h2 class="md-layout-item md-size-100">Plese select one</h2>
            <md-checkbox  v-model="store" ref="storeCheck">Store</md-checkbox>
            <md-checkbox  v-model="warehouse" ref="warehouseCheck">Warehouse</md-checkbox>
          <div>
            <md-button class="md-raised md-primary" @click="setDone('first','second')">Continue</md-button>
          </div>
        </div>
      </md-step>

      <md-step id="second" md-label="Address" :md-error="secondStepError" :md-done.sync="second">
        <div class="md-layout md-gutter md-alignment-left-space-around">
          <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
            <h2>Please provide the {{selectedItem}} address information</h2>
            <md-field ref="street" class="md-layout-item md-size-80">
               <label>Street</label>
               <md-input></md-input>
            </md-field>
            <md-field ref="city" class="md-layout-item md-size-20">
               <label>City</label>
               <md-input></md-input>
            </md-field>
            <md-field ref="state" class="md-layout-item md-size-20">
               <label>State</label>
               <md-input></md-input>
            </md-field>
            <md-field ref="country" class="md-layout-item md-size-60">
               <label>Country</label>
               <md-input></md-input>
            </md-field>
            <md-field ref="zipcode" class="md-layout-item md-size-15">
               <label>ZipCode</label>
               <md-input></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-around">
            <h2 class="md-layout-item md-size-100 md-layout md-grutter md-alignment-center-center center">Geo-Point</h2>
            <md-field ref="latitude" class="md-layout-item md-size-45 item-">
               <label>Latitude</label>
               <md-input></md-input>
            </md-field>
            <md-field ref="longitude" class="md-layout-item md-size-45">
               <label>Longitude</label>
               <md-input></md-input>
            </md-field>
          </div>
          <div>
            <md-button class="md-raised md-primary" @click.native="save()">Salvar</md-button>
          </div>
        </div>
      </md-step>
    </md-steppers>
    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>El warehouse fue agredado</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import WarehouseService from '../../services/warehouse-service'
export default {
  name: 'Warehouses-form',
  methods: {
    save () {
      var options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({type: this.selectedType,
          address: {
            street: this.$refs.street.stringValue,
            city: this.$refs.city.stringValue,
            state: this.$refs.state.stringValue,
            zipcode: this.$refs.zipcode.stringValue,
            country: this.$refs.country.stringValue,
            geopoint: {
              latitude: this.$refs.latitude.stringValue,
              longitude: this.$refs.longitude.stringValue
            }
          },
          stock: []
        }),
        method: 'POST'
      }
      WarehouseService.save(options).then(data => {
        console.log(data)
      })
      this.showSnackbar = true
    },
    setDone (id, index) {
      this[id] = true
      this.secondStepError = null
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
      this.$router.push('/Warehouses')
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
    duration: 4000,
    isInfinity: false
  })
}
</script>

<style>
.center {
  padding-top: 30px;
  padding-bottom: 10px;
  }
</style>
