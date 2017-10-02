<template>
  <div class="ion-segment">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ion-segment',
    props: {
      value: String
    }
  }
</script>

<style lang="scss">
  @import "./segment";
</style>