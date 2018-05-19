<template>
</template>
<script>
import LogoutService from '../services/user-service'
export default {
  name: 'Logout',
  beforeMount: function () {
    LogoutService.logout(localStorage.getItem('tk')).then(data => {
      data = JSON.parse(data)
      console.log(data)
      if (data.status === 'success') {
        localStorage.removeItem('tk')
        this.$router.push('/')
      } else {
        this.$router.push('/')
      }
    })
  }
}
</script>
<style>
</style>
