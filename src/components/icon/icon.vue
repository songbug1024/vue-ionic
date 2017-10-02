<template>
  <i class="ion-icon" :class="['icon-' + name]"></i>
</template>

<script>
  export default {
    name: 'ion-icon',
    props: {
      name: String
    }
  }
</script>

<style lang="scss">
  @import "./icon";
</style>
