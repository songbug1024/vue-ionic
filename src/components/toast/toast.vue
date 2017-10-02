<template>
    <ion-view name="toast" :cssClass="[`toast-${position}`, cssClass]" :enableBackdrop="false"
              @afterEnter="afterViewEnter" @beforeLeave="beforeViewLeave" ref="view">
        <ion-icon v-if="icon" :name="icon" class="toast-icon"></ion-icon>
        <div class="toast-message" v-html="message" ref="toastMessage"></div>
        <ion-button v-if="showCloseButton" clear class="toast-button" @click="dismiss('close-btn')">
            {{ closeButtonText }}
        </ion-button>
    </ion-view>
</template>

<script>
  import { appendDefinition } from '../../util/util'

  import IonView from '../view/view.vue'
  import IonIcon from '../icon/icon.vue'
  import IonButton from '../button/button.vue'

  export default {
    name: 'ion-toast',
    data () {
      return {
        cssClass: '',
        position: 'middle', // 显示位置：top, middle, bottom
        message: '',
        icon: '',
        duration: 2500,
        showCloseButton: false,
        closeButtonText: '关闭',
        definition: null,
        definitionVm: null,
        definitionData: null,
        dismissTimeout: 0
      }
    },
    components: {
      IonView,
      IonButton,
      IonIcon
    },
    mounted () {
      if (this.definition) {
        this.definitionVm = appendDefinition(this.$refs.toastMessage, this.definition, this.definitionData)
      }
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
    @import "./toast";
    @import "./toast.ios";
    @import "./toast.animation";
</style>
