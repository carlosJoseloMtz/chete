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
          <md-field :class="getValidationClass('firstName')">
            <label for="first-name">User</label>
            <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.user" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
            <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('lastName')">
            <label for="last-name">Password</label>
            <md-input type="password" name="last-name" id="last-name" autocomplete="family-name" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
            <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
          </md-field>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button type="submit" class="md-primary" :disabled="sending" @click.native="login">Login</md-button>
    </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import {
  validationMixin
} from 'vuelidate'
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mixins: [validationMixin],
  data: () => ({
    form: {
      user: null,
      password: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      age: {
        required,
        maxLength: maxLength(3)
      },
      gender: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
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
      this.$router.push('Welcome')
    },
    clearForm () {
      this.$v.$reset()
      this.form.firstName = null
      this.form.lastName = null
      this.form.age = null
      this.form.gender = null
      this.form.email = null
    },
    saveUser () {
      this.sending = true
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`
        this.userSaved = true
        this.sending = false
        this.clearForm()
      }, 1500)
    },
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveUser()
      }

      this.$router.push('Welcome')
    }
  }
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
