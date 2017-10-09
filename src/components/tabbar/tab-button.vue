<script>
  import IonIcon from '../icon/icon.vue'
  import IonBadge from '../badge/badge.vue'

  export default {
    name: 'ion-tab-button',
    props: {
      index: Number,
      // div/a/router-link...
      tag: {
        type: String,
        default: 'div'
      },
      tagProps: Object,
      title: String,
      icon: String,
      selectedIcon: String,
      badge: Number,
      badgeColor: {
        type: String,
        default: 'danger'
      },
      badgeStyle: String
    },
    components: {
      IonIcon,
      IonBadge
    },
    render (h) {
      let icon = this.icon
      const {index, tag, tagProps, selectedIcon, title, badge, badgeColor, badgeStyle} = this

      const selected = index === this.$parent.selectedIndex
      if (selected && selectedIcon) icon = selectedIcon

      const obj = {
        class: ['tab-button', 'disable-hover', {
          'has-title': title,
          'has-icon': icon,
          'has-title-only': title && !icon,
          'icon-only': !title && icon,
          'tab-selected': selected
        }],
        props: tagProps,
        on: {
          click: this.onClick
        }
      }
      obj.nativeOn = obj.on

      const children = []
      // 图标
      if (icon) {
        children.push(h('ion-icon', {
          class: 'tab-button-icon',
          props: {
            name: icon
          }
        }))
      }
      // 文字
      if (title) {
        children.push(h('span', {
          class: 'tab-button-text'
        }, title))
      }
      // 角标
      if (badge && badge > 0) {
        children.push(h('ion-badge', {
          class: ['tab-badge', {[`tab-badge-${badgeStyle}`]: badgeStyle}],
          props: {
            color: badgeColor
          }
        }, badge))
      }

      return h(tag, obj, children)
    },
    methods: {
      onClick (e) {
        this.$emit('select', e)
        this.$parent.$emit('change', this.index)
      }
    }
  }
</script>
