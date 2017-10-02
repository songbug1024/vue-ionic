<template>
  <div class="ion-picker" @click="showPicker">
    <slot></slot>
  </div>
</template>

<script>
  import { xhrDynamicNodes, viewPresentPushState } from '../../util/util'
  import { showToast } from '../toast/toast'
  import { showLoading } from '../loading/loading'

  export default {
    name: 'ion-picker',
    props: {
      mode: {
        type: String,
        default: 'date' // date => dtpicker, pop => popPicker
      },
      modeOptions: Object
    },
    data () {
      return {
        picker: null
      }
    },
    beforeDestroy () {
      this.picker && this.picker.dispose()

      const cancelBtn = document.querySelector('.mui-btn[data-id=btn-cancel]')
      cancelBtn && cancelBtn.removeEventListener('tap', this.pickerCancelDismiss)

      const backdrop = document.querySelector('.mui-backdrop')
      backdrop && backdrop.removeEventListener('tap', this.pickerBackdropDismiss)
    },
    methods: {
      pickerCancelDismiss () {
        this.$emit('dismiss', {role: 'cancel'})
      },
      pickerBackdropDismiss () {
        this.$emit('dismiss', {role: 'backdrop'})
      },
      async showPicker () {
        if (typeof window.mui === 'undefined') {
          const loading = await showLoading('控件加载中...')
          await xhrDynamicNodes([`${process.env.publicHost}/js/libs/mui/3.6.1/mui.min.js`, `${process.env.publicHost}/js/libs/mui.picker/2.0.0/mui.picker.min.js`]).catch((err) => showToast('日期控件加载失败，稍后再试'))
          loading()
          if (typeof window.mui === 'undefined') throw new Error('Invalid mui lib.')
        }
        if (!this.picker) {
          const TYPES = {
            date: 'DtPicker',
            pop: 'PopPicker'
          }
          const Picker = window.mui[TYPES[this.mode]]
          if (!Picker) throw new Error('Invalid picker mode.')

          this.$emit('beforeCreated')
          this.picker = new Picker(this.modeOptions)
          this.$emit('created', this.picker)

          this.picker.present = ({onDismiss}) => {
            this.picker.show((data) => {
              this.$emit('dismiss', {role: 'picked', data})
            })

            // mui-btn取消、mui-backdrop不能触发的bug
            setTimeout(() => {
              const cancelBtn = document.querySelector('.mui-btn[data-id=btn-cancel]')
              cancelBtn && cancelBtn.addEventListener('tap', this.pickerCancelDismiss)

              const backdrop = document.querySelector('.mui-backdrop')
              backdrop && backdrop.addEventListener('tap', this.pickerBackdropDismiss)
            })

            this.$once('dismiss', ({role, data}) => {
              onDismiss({role, data})

              const cancelBtn = document.querySelector('.mui-btn[data-id=btn-cancel]')
              cancelBtn && cancelBtn.removeEventListener('tap', this.pickerCancelDismiss)

              const backdrop = document.querySelector('.mui-backdrop')
              backdrop && backdrop.removeEventListener('tap', this.pickerBackdropDismiss)
            })
          }
          this.picker.dismiss = (role, data) => {
            this.picker.hide()
            this.$emit('dismiss', {role, data})
          }
        }

        this.$emit('beforeShow', this.picker)
        viewPresentPushState({
          view: this.picker,
          resolve: ({role, data}) => {
            if (role === 'picked') this.$emit('picked', data)
          }
        })
        this.$nextTick(() => this.$emit('shown', this.picker))
      }
    }
  }
</script>

<style lang="scss">
  @import "./picker";
</style>
