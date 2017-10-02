<script>
  import InputBase from './base.vue'

  export default {
    name: 'ion-textarea',
    extends: InputBase,
    render (h) {
      return h('div', {
        'class': [
          'ion-textarea',
          {
            'has-value': !!this.value
          }
        ]
      }, [
        h('textarea', {
          attrs: {
            placeholder: this.placeholder,
            readonly: this.readonly,
            disabled: this.disabled,
            autofocus: this.autofocus
          },
          'class': 'text-input',
          domProps: {
            innerHTML: this.value,
            value: this.value
          },
          on: {
            input: (e) => {
              this.$emit('input', e.target.value)
            },
            focus: (e) => {
              this.$emit('focus', e)
            },
            blur: (e) => {
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
          ref: 'textarea'
        })
      ])
    }
  }
</script>
