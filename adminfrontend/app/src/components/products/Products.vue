<template>
  <div>
    <md-empty-state
      md-icon="devices_other"
      md-label="You don't have any products"
      md-description="Select button to add one.">
      <md-button class="md-primary md-raised" @click.native="openForm()">+</md-button>
    </md-empty-state>
  </div>
</template>
<script>
export default {
  name: 'Products',
  methods: {
    openForm () {
      this.$router.push('Products-form')
    }
  },
  data: () => ({
  })
}
</script>
<style>
  .center {
    padding-top: 30px;
    padding-bottom: 10px;
    }
</style>
