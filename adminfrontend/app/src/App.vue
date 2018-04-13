<template>
  <router-view></router-view>
</template>

<script>
import Login from './components/Login.vue'
export default {
  name: 'App',
  data: () => ({
    menuVisible: false
  }),
  components: {
    'login': Login
  },
  beforeCreate () {
    this.$store.commit('getProducts')
    this.$store.commit('getWarehouses')
    this.$store.commit('getProductsCatalog')
    this.$store.commit('getCategories')
  }
}
</script>
<style lang="sass">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", ( primary: md-get-palette-color(blue, A200), accent: md-get-palette-color(red, A200), checkbox: md-get-palette-color(lightgreen,500)));

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
