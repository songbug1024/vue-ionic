<script>
  import { isVNodeComponentTags } from '../../util/util'

  export default {
    name: 'ion-tabbar',
    props: {
      initIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        selectedIndex: 0
      }
    },
    created () {
      this.selectedIndex = this.initIndex
      this.$on('change', this.onChange)
    },
    render (h) {
      if (this.$slots.default) {
        let tabIndex = 0

        this.$slots.default.forEach((item) => {
          if (isVNodeComponentTags(item, ['ion-tab-button'])) {
            item.componentOptions.propsData.index = tabIndex
            tabIndex++
          }
        })
      }
      return h('div', {
        class: 'ion-tabbar'
      }, this.$slots.default)
    },
    methods: {
      onChange (index) {
        this.selectedIndex = index
      }
    }
  }
</script>

<style lang="scss">
  @import "./tabbar";
  @import "./tabbar.ios";
</style>
