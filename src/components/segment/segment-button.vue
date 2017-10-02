<script>
  export default {
    name: 'ion-segment-button',
    props: {
      value: String,
      tag: {
        type: String,
        default: 'div' // div(默认)、a(RouterLink)
      },
      tagProps: Object
    },
    computed: {
      activated () {
        return this.value && this.$parent && this.$parent.value === this.value
      }
    },
    methods: {
      onClick (e) {
        this.$emit('ion-select', this.value)
        this.$parent && this.$parent.$emit('input', this.value)
      }
    },
    render (h) {
      let tag = this.tag
      let tagProps = this.tagProps
      if (tag === 'a') tag = 'router-link'

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