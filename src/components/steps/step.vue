<script>
  export default {
    name: 'ion-step',
    props: {
      icon: String,
      title: String,
      content: String,
      index: Number,
      status: {
        type: String,
        default: 'process' // 'wait', 'process', 'finish', 'error'
      }
    },
    render (h) {
      var body = []
      if (this.title) body.push(h('div', {class: 'ion-step-title'}, this.title))
      if (this.content) body.push(h('div', {class: 'ion-step-content'}, this.content))

      return h('div', {
        class: ['ion-step', 'ion-step-status-' + this.status]
      }, [
        h('div', {
          class: 'ion-step-tail'
        }),
        h('div', {
          class: 'ion-step-inner'
        }, [
          this.$slots.head || h('div', {
            class: 'ion-step-head'
          }, [
            h('span', {
              class: 'ion-step-head-inner'
            }, [
              this.icon
                ? h('i', {class: ['ion-step-icon', 'ion-step-icon-' + this.icon]})
                : h('span', {class: 'ion-step-number'}, this.index)
            ])
          ]),
          this.$slots.body || h('div', {
            class: 'ion-step-body'
          }, body)
        ]),
      ])
    }
  }
</script>

<style lang="scss">
  @import "./step";
</style>
