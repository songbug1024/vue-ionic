<template>
    <div class="ion-view" :class="['ion-' + name, cssClass]">
        <transition v-if="enableBackdrop" name="backdrop">
            <ion-backdrop v-show="shown" @click.native="backdropClick" @touchmove.native="backdropTouchmove"></ion-backdrop>
        </transition>
        <transition :name="name + '-wrapper'" @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave" @after-leave="afterLeave">
            <div v-show="shown" :class="[name + '-wrapper']">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
  import IonBackdrop from '../backdrop/backdrop.vue'

  export default {
    name: 'ion-view',
    props: {
      name: String,
      cssClass: [String, Array],
      enableBackdrop: {
        type: Boolean,
        default: true
      },
      dismissOnBackdropClick: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        shown: false
      }
    },
    components: {
      IonBackdrop
    },
    methods: {
      present (opts) {
        opts = opts || {}

        opts.onBeforeEnter && this.$once('beforeEnter', opts.onBeforeEnter)
        opts.onAfterEnter && this.$once('afterEnter', opts.onAfterEnter)
        opts.onDismiss && this.$once('dismiss', opts.onDismiss)
        opts.onBeforeLeave && this.$once('beforeLeave', opts.onBeforeLeave)
        opts.onAfterLeave && this.$once('afterLeave', opts.onAfterLeave)

        this.shown = true
      },
      backdropClick (e) {
        if (this.dismissOnBackdropClick) {
          this.dismiss('backdrop')
        }
      },
      backdropTouchmove (e) {
        e.preventDefault()
      },
      dismiss (role, data) {
        if (this.shown) {
          this.shown = false
          this.$emit('dismiss', {role, data})
        }
      },
      beforeEnter () {
        if (this.enableBackdrop) {
          document.querySelector('body').style['overflow'] = 'hidden'
        }
        this.$emit('beforeEnter')
      },
      afterEnter () {
        this.$emit('afterEnter')
      },
      beforeLeave () {
        this.$emit('beforeLeave')
      },
      afterLeave () {
        if (this.enableBackdrop) {
          document.querySelector('body').style['overflow'] = 'initial'
        }
        this.$emit('afterLeave')

        const view = this.$parent
        view.$destroy()
        view.$el.parentNode.removeChild(view.$el)
      }
    }
  }
</script>

<style lang="scss">
    @import "./view.animation";
</style>
