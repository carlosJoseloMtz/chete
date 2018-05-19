<template>
  <div class="md-layout md-gutter pd-top">
    <div class="md-layout-item md-size-33">
    </div>
    <md-card class="md-layout-item md-size-33 md-elevation-24">
      <md-card-header>
       <div class="md-title title">LOGIN</div>
     </md-card-header>
      <md-card-content class="md-layout-item md-size-100">
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>User</label>
            <md-input v-model="user"></md-input>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Password</label>
            <md-input v-model="pwd" type="password"></md-input>
          </md-field>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button type="submit" class="md-primary" @click.native="login">Login</md-button>
    </md-card-actions>
    </md-card>

    <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>{{message}}</span>
      <md-button class="md-primary" @click.native="submit">OK</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import LoginService from '../services/user-service'

export default {
  name: 'Login',
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },

    login () {
      if (this.isValid()) {
        let body = {
          uid: this.user,
          password: this.pwd
        }
        LoginService.login(body).then(data => {
          data = JSON.parse(data)
          if(data.status === 'success') {

            setTimeout(_ => {
              this.$store.dispatch('loadProductCatalogData')
              this.$store.dispatch('loadProductData')
              this.$store.dispatch('loadWarehouseData')
              this.$store.dispatch('loadStockData')
              this.$store.dispatch('loadCategoryData')
            }, 1000)
            localStorage.setItem('tk', data.data.token)
            this.message = `welcome to chete ${this.user}`
            this.complete = true
            this.showSnackbar = true
          } else {
            this.message = 'Contact ur administration please'
            this.showSnackbar = true
          }
        })
      }
    },

    isValid () {
      if (!this.user.trim() === true) {
        this.message = 'User is empty'
        this.showSnackbar = true
        return false
      }
      if(!this.pwd.trim() === true) {
        this.message = 'Password is empty'
        this.showSnackbar = true
        return false
      }
      return true
    },

    submit () {
      if (this.complete === true) {
        this.$router.push('Welcome')
      } else {
        this.showSnackbar = false
      }
    },

    clearForm () {
      this.form.password = null
      this.form.user = null
    }
  },

  data: () => ({
      user: '',
      pwd: '',
      showSnackbar: false,
      position: 'center',
      duration: 10000,
      isInfinity: false,
      message: String,
    }
  )
}
</script>

<style>
 .title {
   text-align: center;
   text-decoration-style: solid;
 }
 .pd-top {
   padding: 10vh
 }
</style>
