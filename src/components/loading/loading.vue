<template>
    <ion-view name="loading" :cssClass="cssClass" :enableBackdrop="enableBackdrop" :dismissOnBackdropClick="false"
              @afterEnter="afterViewEnter" @beforeLeave="beforeViewLeave" ref="view">
        <div v-if="spinner" class="loading-spinner">
            <ion-spinner v-if="typeof spinner === 'string'" :name="spinner"></ion-spinner>
            <ion-spinner v-else :name="spinner.name" :spinner="spinner"></ion-spinner>
        </div>
        <div v-if="content" class="loading-content" v-html="content"></div>
    </ion-view>
</template>

<script>
  import IonView from '../view/view.vue'
  import IonSpinner from '../spinner/spinner.vue'

  export default {
    name: 'ion-loading',
    data () {
      return {
        cssClass: '',
        spinner: '',
        content: '',
        duration: 20000,
        enableBackdrop: false,
        dismissTimeout: 0
      }
    },
    components: {
      IonView,
      IonSpinner
    },
    methods: {
      present (opts) {
        this.$refs.view.present(opts)
      },
      dismiss (role) {
        this.$refs.view.dismiss(role)
      },
      afterViewEnter () {
        if (this.duration) {
          this.dismissTimeout = setTimeout(() => {
            this.$refs.view.dismiss('timer')
            this.dismissTimeout = 0
          }, this.duration)
        }
      },
      beforeViewLeave () {
        if (this.dismissTimeout) {
          clearTimeout(this.dismissTimeout)
        }
      }
    }
  }
</script>

<style lang="scss">
    @import "./loading";
    @import "./loading.ios";
    @import "./loading.animation";
</style>
