<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="">
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
              <md-list-item class="md-inset"><router-link class="text" to="/Employees">employees</router-link></md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand :md-expanded.sync="expandNews">
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">Commerce</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset"><router-link class="text" to="/Catalogs">catalog</router-link></md-list-item>
              <md-list-item class="md-inset"><router-link class="text" to="/Categories">categories</router-link></md-list-item>
              <md-list-item class="md-inset"><router-link class="text" to="/Products">products</router-link></md-list-item>
              <md-list-item class="md-inset"><router-link class="text" to="/Prices">prices</router-link></md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand :md-expanded.sync="expandNews">
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">Store</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset"><router-link class="text" to="/Warehouses">warehouses</router-link></md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand :md-expanded.sync="expandNews">
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">Marketing</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset"><router-link class="text" to="/Discounts">discounts</router-link></md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text"><router-link class="text" to="/Logout">Logout</router-link></span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .title {
    background-color:  #000000 !important;
  }

  .text {
    color: black !important;
  }

  .md-app {
   height: 100vh;
}
</style>

<script>
export default {
  name: 'AdminPage',
  data: () => ({
    menuVisible: true
  })
}
</script>
