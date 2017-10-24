<script>
  export default {
    name: 'ion-segment-button',
    props: {
      value: String,
      // div/router-link...
      tag: String,
      tagProps: Object
    },
    computed: {
      activated () {
        return this.value && this.$parent && this.$parent.value === this.value
      }
    },
    methods: {
      onClick (e) {
        this.$emit('select', this.value)
        this.$parent && this.$parent.$emit('input', this.value)
      }
    },
    render (h) {
      const tag = this.tag || 'div'
      const tagProps = this.tagProps

      return h(tag, {
        'class': ['segment-button', {'segment-activated': this.activated}],
        on: {
          click: this.onClick
        },
        props: tagProps
      }, [
        h('span', {
          class: 'segment-button-content'
        }, this.$slots.default)
      ])
    }
  }
</script>

<style lang="scss">
  @import "./segment.md";
</style>
