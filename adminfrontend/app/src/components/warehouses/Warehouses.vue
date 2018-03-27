<template>
  <div>
    <div v-if="warehouses.length === 0">
      {{warehouses}}
      <md-empty-state
        md-icon="devices_other"
        md-label="You don't have any warehouses"
        md-description="Select button to add one.">
        <md-button class="md-primary md-raised" @click.native="openForm()">+</md-button>
      </md-empty-state>
    </div>
    <div v-else>
      <md-table>
        <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Action</md-table-head>
        </md-table-row>
        <md-table-row  v-for="(warehouse, index) in warehouses" :Key="warehouse.id">
          <md-table-cell md-numeric>{{warehouse.id}}</md-table-cell>
          <md-table-cell>{{warehouse.type}}</md-table-cell>
          <md-table-cell> <md-button @click.native="deleteItem(warehouse, index)" class="md-icon-button md-raised">
                          <md-icon>delete</md-icon>
                          </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <md-button  class="md-primary md-raised" @click.native="openForm()">+</md-button>
    </div>
    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>El warehouse fue eliminado</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import WarehouseService from '../../services/warehouse-service'
export default {
  name: 'Warehouses',
  methods: {
    openForm () {
      this.$router.push('/Warehouses-form')
    },
    deleteItem (warehouse, index) {
      WarehouseService.delete(warehouse.id).then(data => {
        this.$store.dispatch('removeWarehouse', index)
        this.showSnackbar = true
      })
    },
    submit () {
      this.showSnackbar = false
    }
  },
  computed: {
    warehouses () {
      return this.$store.state.warehouses
    }
  },
  data: () => ({
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
