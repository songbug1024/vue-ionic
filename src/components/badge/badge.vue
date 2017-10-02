<template>
  <span class="ion-badge" :class="[`badge-${this.color}`]">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'ion-badge',
    props: {
      color: String
    }
  }
</script>

<style lang="scss">
  @import "./badge";
  @import "./badge.ios";
</style>