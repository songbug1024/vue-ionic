<script>
  export default {
    name: 'ion-label',
    props: {
      floating: Boolean,
      stacked: Boolean,
      fixed: Boolean,
      inset: Boolean
    },
    render (h) {
      const attrs = {}
      if (this.floating) attrs.floating = ''
      if (this.stacked) attrs.stacked = ''
      if (this.fixed) attrs.fixed = ''
      if (this.inset) attrs.inset = ''

      return h('div', {
        attrs,
        'class': 'ion-label'
      }, this.$slots.default)
    }
  }
</script>

<style lang="scss">
  @import "./label";
  @import "./label.ios";
</style>
