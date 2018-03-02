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
  }
}
</script>
<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(white, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200), // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme
  .md-app {
    border: 1px solid rgba(#000, .12);
  }
</style>
