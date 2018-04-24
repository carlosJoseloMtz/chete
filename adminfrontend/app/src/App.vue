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
  async created () {
    await this.$store.dispatch('loadData')
  }
}
</script>
<style lang="sass">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", ( primary: md-get-palette-color(blue, A200), accent: md-get-palette-color(red, A200), checkbox: md-get-palette-color(lightgreen,500)));

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
