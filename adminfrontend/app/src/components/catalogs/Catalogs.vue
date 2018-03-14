<template>
  <div>
    <md-empty-state
      md-icon="devices_other"
      md-label="You don't have any catalogs"
      md-description="Select button to add one.">
      <md-button class="md-primary md-raised" @click.native="openForm()">+</md-button>
    </md-empty-state>
  </div>
</template>
<script>
export default {
  name: 'Catalogs',
  methods: {
    openForm () {
      this.$router.push('Catalogs-form')
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
