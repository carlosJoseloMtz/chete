<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Employee" :md-done.sync="first">
        <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-center-space-around">
          <h2 class="md-layout-item md-size-50">Provide employee information</h2>
          <md-field class="md-layout-item md-size-80">
             <label>Username</label>
             <md-input v-model="username"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-80">
             <label>First Name</label>
             <md-input v-model="firstName"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-80">
             <label>Last Name</label>
             <md-input v-model="lastName"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-80">
             <label>Password</label>
             <md-input v-model="password" type="password"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-80">
             <label>Confirm Password</label>
             <md-input v-model="confirmPassword" type="password"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-80">
             <label>Email</label>
             <md-input v-model="email"></md-input>
          </md-field>
          <md-autocomplete
                  v-model="selectedStatus"
                  :md-options="statusSelected"
                  md-layout="box">
            <label>Search...</label>
          </md-autocomplete>
          <div class="md-layout-item md-size-80">
            <md-button class="md-raised md-primary" @click="setDone()">Continue</md-button>
          </div>
        </div>
        <md-snackbar  ngIf="showSnackbar" :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
          <span>{{message}}</span>
          <md-button class="md-primary" @click.native="submit">OK</md-button>
        </md-snackbar>
      </md-step>
    </md-steppers>
  </div>
</template>
<script>
import UserService from '../../services/user-service'
export default {
  name: 'Employee-form',
  beforeMount: function () {
    this.statusSelected = []
    for (const element in this.statusCollection) {
      this.statusSelected.push(this.statusCollection[element].name)
    }
  },
  methods: {
    setDone () {
      let body
      if (this.isValid()) {
        for (const element in this.statusCollection) {
          if (this.statusCollection[element].name === this.selectedStatus) {
            this.status = this.statusCollection[element].number
          }
        }
        body = {
          uid: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          status: this.status
        }
        UserService.save(body).then(data => {
          data = JSON.parse(data)
          if (data.status === 'success') {
            //this.$store.dispatch('addWarehouse', data.data)
            this.complete = true
            this.message = 'El usuario fue agredado'
            this.showSnackbar = true
          } else {
            this.message = 'Verify the information'
            this.complete = false
            this.showSnackbar = true
          }
        })
      }
    },

    isValid () {
      if (!this.username.trim() === true) {
        this.message = 'User is empty'
        this.showSnackbar = true
        return false
      }
      if (!this.firstName.trim() === true) {
        this.message = 'User is empty'
        this.showSnackbar = true
        return false
      }
      if (!this.lastName.trim() === true) {
        this.message = 'User is empty'
        this.showSnackbar = true
        return false
      }
      if (!this.password.trim() === true) {
        this.message = 'User is empty'
        this.showSnackbar = true
        return false
      }
      if (!this.confirmPassword.trim() === true) {
        this.message = 'User is empty'
        this.showSnackbar = true
        return false
      }
      if (!this.email.trim() === true) {
        this.message = 'User is empty'
        this.showSnackbar = true
        return false
      }
      if (this.password !== this.confirmPassword) {
        this.message = 'Password doesnt match'
        this.showSnackbar = true
        return false
      }
      return true
    },

    submit () {
      if (this.complete) {
        this.$router.push('/Employees')
      }
      this.showSnackbar = false
    },

    setError () {
      this.secondStepError = 'This is an error!'
    }
  },
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 10000,
    isInfinity: false,
    warehouse: false,
    active: 'first',
    first: false,
    second: false,
    third: false,
    secondStepError: null,
    selectedStatus: null,
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    message: '',
    confirmPassword: '',
    status: Number,
    statusSelected: null,
    statusCollection: [{
      name: 'Admin',
      number: 1
    },
    { name: 'Employee',
      number: 2
    }]
  })
}
</script>
<style>
</style>
