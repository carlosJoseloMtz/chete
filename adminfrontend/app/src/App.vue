<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="title text" md-elevation="0">
          Administration
        </md-toolbar>

        <md-list>
          <md-list-item md-expand :md-expanded.sync="expandNews">
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text" >Users</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset">employees</md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand :md-expanded.sync="expandNews">
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">Commerce</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset">catalogs</md-list-item>
              <md-list-item class="md-inset">categories</md-list-item>
              <md-list-item class="md-inset">products</md-list-item>
              <md-list-item class="md-inset">pruces</md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand :md-expanded.sync="expandNews">
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">Store</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset">warehouse</md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand :md-expanded.sync="expandNews">
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">Marketing</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset">discounts</md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Logout</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <login></login>
      </md-app-content>
    </md-app>
  </div>
</template>

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

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .title {
    background-color:  #000000 !important;
  }

  .text {
    color: white !important;
  }
</style>

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
