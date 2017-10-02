<template>
    <div class="ion-app">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'ion-app'
  }
</script>

<style lang="scss">
    @import "./normalize";
    @import "./app";
    @import "./structure";
    @import "./typography";
</style>
