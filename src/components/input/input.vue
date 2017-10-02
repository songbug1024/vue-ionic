<script>
  import InputBase from './base.vue'
  import IonButton from '../button/button.vue'

  export default {
    name: 'ion-input',
    extends: InputBase,
    components: {
      IonButton
    },
    props: {
      type: {
        type: String,
        default: 'text'
      },
      clearInput: Boolean
    },
    data () {
      return {
        focusing: false
      }
    },
    render (h) {
      return h('div', {
        attr: {
          'clear-input': this.clearInput
        },
        'class': [
          'ion-input',
          {
            'input-has-value': !!this.value,
            'input-has-focus': this.focusing
          }
        ]
      }, [
        h('input', {
          attrs: {
            type: this.type,
            placeholder: this.placeholder,
            readonly: this.readonly,
            disabled: this.disabled,
            autofocus: this.autofocus
          },
          'class': 'text-input',
          domProps: {
            value: this.value
          },
          on: {
            input: (e) => {
              this.$emit('input', e.target.value)
            },
            focus: (e) => {
              this.focusing = true
              this.$emit('focus', e)

              // 修复readonly下依然后焦点的bug
              if (this.readonly) e.target.blur(e)
            },
            blur: (e) => {
              this.focusing = false
              this.$emit('blur', e)
            },
            click: (e) => {
              this.$emit('click', e)
            },
            keyup: (e) => {
              this.$emit('keyup', e)
            },
            keypress: (e) => {
              this.$emit('keypress', e)
            },
            keydown: (e) => {
              this.$emit('keydown', e)
            }
          },
          ref: 'input'
        }),
        this.clearInput ? h('transition', {
          attrs: {
            name: 'clear-input'
          }
        }, (!!this.value && this.focusing) ? [
          h('ion-button', {
            attrs: {
              type: 'button',
              clear: ''
            },
            'class': 'text-input-clear-icon',
            nativeOn: {
              click: (e) => {
                this.$emit('input', '')
                // 让input获得焦点
                this.$refs.input.focus()
              }
            }
          })
        ] : null) : null
      ])
    }
  }
</script>
