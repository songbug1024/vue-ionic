<template>
  <ion-view name="modal" :enable-backdrop="false" ref="view"></ion-view>
</template>

<script>
  import { appendDefinition, addClass, removeClass } from '../../util/util'

  import IonView from '../view/view.vue'

  export default {
    name: 'ion-modal',
    data () {
      return {
        definition: null,
        definitionVm: null,
        definitionData: null
      }
    },
    components: {
      IonView
    },
    mounted () {
      if (this.definition) {
        this.definitionVm = appendDefinition(this.$el.querySelector('.modal-wrapper'), this.definition, this.definitionData)
        this.definitionVm.$once('dismiss', (data) => {
          this.dismiss('dismiss', data)
        })
        this.$refs.view.$once('beforeEnter', (data) => this.definitionVm.$emit('viewBeforeEnter', data))
        this.$refs.view.$once('afterEnter', (data) => this.definitionVm.$emit('viewAfterEnter', data))
        this.$refs.view.$once('beforeLeave', (data) => this.definitionVm.$emit('viewBeforeLeave', data))
        this.$refs.view.$once('afterLeave', (data) => this.definitionVm.$emit('viewAfterLeave', data))
      }
    },
    methods: {
      /**
       * 弹出modal
       * @param opts
       * @param opts.$el 当前页面
       */
      present (opts) {
        const {$el} = opts
        const pageScrollTop = window.pageYOffset

        this.$refs.view.present(Object.assign({
          onAfterEnter () {
            window.scrollTo(0, 0)

            addClass($el, 'fixed')
            $el.scrollTop = pageScrollTop
          },
          onAfterLeave () {
            removeClass($el, 'fixed')
            window.scrollTo(0, pageScrollTop)
          }
        }, opts))
      },
      dismiss (role, data) {
        this.$refs.view.dismiss(role, data)
      }
    }
  }
</script>

<style lang="scss">
  @import "./modal";
  @import "./modal.animation";
</style>
