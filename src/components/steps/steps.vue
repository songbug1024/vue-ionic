<script>
  export default {
    name: 'ion-steps',
    props: {
      current: {
        type: Number,
        default: 1
      },
      status: {
        type: String,
        default: 'process' // 'wait', 'process', 'finish', 'error'
      },
      direction: {
        type: String,
        default: 'horizontal'
      }
    },
    render (h) {
      let index = 1

      return h('div', {
        class: ['ion-steps', 'ion-steps-' + this.direction],
      }, this.$slots.default.map((item, i) => {
        if (item.componentOptions) {
          let status

          if (this.current === index) {
            status = this.status
          } else if (this.current > index) {
            status = 'finish'
          } else {
            status = 'wait'
          }
          item.componentOptions.propsData.index = index++
          item.componentOptions.propsData.status = status
        }
        return item
      }))
    }
  }
</script>

<style lang="scss">
  @import "./steps";
</style>
