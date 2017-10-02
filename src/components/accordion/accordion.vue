<template>
  <div class="accordion-list">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      collapsible: {
        type: Boolean,
        default: true
      }
    },
    created () {
      this.$on('toggle-expanded', (expanded) => {
        // 只有打开某个子项时才需要折叠正打开的子项
        if (expanded && this.collapsible) this.$emit('pack-up')
      })
    }
  }
</script>

<style lang="scss">
  @import "./accordion.scss";
</style>