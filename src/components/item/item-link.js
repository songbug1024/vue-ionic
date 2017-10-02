export default {
  name: 'item-link',
  functional: true,
  render (h, { props, data, children }) {
    // FIXME 会出现slot不能传递的bug
    return h('ion-item', Object.assign(data, {
      props: {
        tag: 'a',
        tagProps: props
      }
    }), children)
  },
  props: {
    to: Object,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    }
  }
}
