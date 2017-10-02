<template>
  <ion-picker class="ion-datetime" :class="{'placeholder': placeholder && !value }" mode="date"
              :mode-options="modeOptions" @picked="onPicked" @beforeShow="onBeforeShow">
    {{value || placeholder}}
  </ion-picker>
</template>

<script>
  import dateFormat from 'dateformat'
  import IonPicker from '../picker/picker.vue'

  export default {
    name: 'ion-datetime',
    props: {
      type: {
        type: String,
        default: 'date' // datetime、date、time、month、hour
      },
      value: String,
      format: String, // 格式
      placeholder: String,
      min: String,
      max: String,
      pickerOptions: Object
    },
    components: {
      IonPicker
    },
    computed: {
      modeOptions () {
        return Object.assign({}, this.pickerOptions, {
          type: this.type,
          beginDate: this.min ? new Date(this.min) : new Date(1970),
          endDate: this.max ? new Date(this.max) : null,
        })
      }
    },
    methods: {
      onPicked ({value}) {
        if (this.format) {
          switch (this.type) {
            case 'datetime':
            case 'date':
            case 'month':
              value = dateFormat(new Date(value), this.format)
              break
            case 'time':
            case 'hour':
            default:
              // TODO 类型支持
              throw new Error('类型不支持')
              break
          }
        }
        this.$emit('input', value)
      },
      onBeforeShow (picker) {
        let value = this.value

        if (this.format) {
          switch (this.type) {
            case 'datetime':
            case 'date':
            case 'month':
              try {
                value = dateFormat(value ? new Date(value) : new Date(), this.format)
              } catch (e) {
                // 类型错误，如至今等
                value = dateFormat(new Date(), this.format)
              }
              break
            case 'time':
            case 'hour':
            default:
              // TODO 类型支持
              throw new Error('类型不支持')
              break
          }
        }

        picker.setSelectedValue(value)
      }
    }
  }
</script>

<style lang="scss">
  @import "./datetime";
</style>