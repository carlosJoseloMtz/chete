<template>
  <div>
    <ul v-for="product in products" :Key="product.id">
      <li>{{product.name}}</li>
      <li>{{product.description}}</li>
    </ul>
    <button v-on:click="reducePrice('actions button')">Reduce Price</button>
  </div>
</template>

<script>
// para hacer un mapeo de getters. actions
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Products',
  // forma de traer el state product del store
  computed: {
    products () {
      return this.$store.state.products
    },
    // es una forma fea de un getter
    /*saleProducts () {
      return this.$store.getters.saleProducts
    }*/
    ...mapGetters ([
      'saleProducts'
    ])
  },
  methods: {
    ...mapActions ([
      'reducePrice'
    ])
    /* forma fea de implementar una accion/mutacion
    reducePrice: function (amount) {
      this.$store.dispatch('reducePrice', amount)
    }*/
  }
  /* forma de hacer una mutacion
  methods: {
    reducePrice: function () {
    // solo que no pueden realizar mutaciones directas necesitan una accion
      this.$store.commit('reducePrice')
    }
  } */
  /* forma fea de hacer la mutacion
  methods: {
    reducePrice: function () {
      this.$store.state.products.forEach(product => {
        product.description = 'algo no se'
      })
    } */
  /*
    forma fea de hacer un getter
    saleProducts () {
      var saleProducts = this.$store.state.products.map(product => {
        return {
          name: '**' + product.name + '**',
          description: product.description
       }
    })
  return saleProducts
  } */
}
</script>

<style>
</style>
