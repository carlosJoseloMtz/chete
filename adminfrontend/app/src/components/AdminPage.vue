<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="principal-title">
          {{title}}
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="title texttitle" md-elevation="0">
          Administration
        </md-toolbar>

        <md-list>
          <md-list-item md-expand>
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text" >Users</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset"><router-link class="text" @click.native="verifyTitle('Employee')" to="/Employees">employees</router-link></md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand >
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">Commerce</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset"><router-link class="text" @click.native="verifyTitle('Catalog')" to="/Catalogs">catalog</router-link></md-list-item>
              <md-list-item class="md-inset"><router-link class="text" @click.native="verifyTitle('Categories')" to="/Categories">categories</router-link></md-list-item>
              <md-list-item class="md-inset"><router-link class="text" @click.native="verifyTitle('Products')" to="/Products">products</router-link></md-list-item>
              <md-list-item class="md-inset"><router-link class="text" @click.native="verifyTitle('Prices')" to="/Prices">prices</router-link></md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">Store</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset"><router-link class="text" @click.native="verifyTitle('Warehouse')" to="/Warehouses">warehouses</router-link></md-list-item>
              <md-list-item class="md-inset"><router-link class="text" @click.native="verifyTitle('Stock')" to="/Stocks">stocks</router-link></md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">Marketing</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset"><router-link class="text" @click.native="verifyTitle('Discounts')" to="/Discounts">discounts</router-link></md-list-item>
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

  .texttitle {
    color: white !important;
  }

  .md-app {
   height: 100vh;
}

.principal-title {
  font-weight: bold;
  font-size: 25px;
  padding-left: 40%;
}
</style>

<script>
export default {
  name: 'AdminPage',
  methods: {
    verifyTitle (value) {
      this.title = value
    }
  },
  data: () => ({
    title: null
  })
}
</script>
