<script>
  export default {
    name: 'ion-button',
    data () {
      return {
        activated: false
      }
    },
    props: {
      // button/router-link...
      tag: String,
      tagProps: Object,
      // bar-button/item-button
      role: {
        type: String,
        default: 'button'
      },
      // primary/secondary...
      color: String,
      // outline/clear
      vStyle: {
        type: String,
        default: 'default'
      },
      outline: Boolean,
      clear: Boolean,
      // large/small/default
      size: String,
      large: Boolean,
      small: Boolean,
      // round/fab
      shape: String,
      round: Boolean,
      fab: Boolean,
      // block/full
      display: String,
      block: Boolean,
      full: Boolean,
      // left/right/only
      icon: String,
      iconLeft: Boolean,
      iconRight: Boolean,
      iconOnly: Boolean,
      disabled: Boolean,
      type: {
        type: String,
        default: 'button' // button, reset, submit
      }
    },
    render (h) {
      const {color, role} = this
      const classes = [
        `${role}`,
        {'activated': this.activated}
      ]

      // 大小
      let size = this.size
      if (this.large) size = 'large'
      if (this.small) size = 'small'
      if (size && size !== 'default') classes.push(`${role}-${size}`)

      // 形状
      let shape = this.shape
      if (this.round) shape = 'round'
      if (this.fab) shape = 'fab'
      if (shape && shape !== 'default') classes.push(`${role}-${shape}`)

      // 显示
      let display = this.display
      if (this.block) display = 'block'
      if (this.full) display = 'full'
      if (display && display !== 'default') classes.push(`${role}-${display}`)

      // 图标
      let icon = this.icon
      if (this.iconLeft) icon = 'left'
      if (this.iconRight) icon = 'right'
      if (this.iconOnly) icon = 'only'
      if (icon) classes.push(`${role}-icon-${icon}`)

      // 风格
      let vStyle = this.vStyle
      if (this.outline) vStyle = 'outline'
      if (this.clear) vStyle = 'clear'
      classes.push(`${role}-${vStyle}`)

      // 颜色
      if (color && color !== 'default') classes.push(vStyle && vStyle !== 'default' ? `${role}-${vStyle}-${color}` : `${role}-${color}`)

      const tag = this.tag || 'button'
      const obj = {
        class: classes,
        attrs: {
          disabled: this.disabled
        },
        props: this.tagProps,
        on: {
          touchstart: this.touchStart,
          touchend: this.touchEnd,
          mousedown: this.touchStart,
          mouseup: this.touchEnd,
          click: this.onClick
        }
      }
      obj.nativeOn = obj.on
      if (tag === 'button') obj.attrs.type = this.type

      return h(tag, obj, [
        h('span', {
          'class': 'button-inner'
        }, this.$slots.default)
      ])
    },
    methods: {
      touchStart () {
        this.activated = true

        const $body = document.documentElement || document.body
        $body.addEventListener('touchend', this.touchEnd)
        $body.addEventListener('mouseup', this.touchEnd)
      },
      touchEnd () {
        this.activated = false

        const $body = document.documentElement || document.body
        $body.removeEventListener('touchend', this.touchEnd)
        $body.removeEventListener('mouseup', this.touchEnd)
      },
      onClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style lang="scss">
  @import "./button";
  @import "./button.ios";
  @import "./button.fab";
  @import "./button.icon";
</style>
