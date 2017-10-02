<script>
  import { isVNodeComponentTags, resolveVNodeData } from '../../util/util'
  import IonLabel from '../label/label.vue'

  export default {
    name: 'ion-item',
    props: {
      tag: {
        type: String,
        default: 'div' // div(默认)、button(IonButton)、a(RouterLink)、a-button（RouterLink包含button的效果）
      },
      tagProps: Object
    },
    components: {
      IonLabel
    },
    render (h) {
      let className = 'item'
      let $start // 对应item-start, item-left
      let $end // 对应item-right, item-end
      let $label // 对应ion-label
      const $defaults = [] // 对应ion-label中的内容
      const $contents = [] // 对应item-content

      // 根据默认组件列表选择出相应的模块
      if (this.$slots.default) {
        this.$slots.default.forEach((item) => {
          if (isVNodeComponentTags(item, ['ion-checkbox'])) {
            // 包含item-start组件
            $start = item
          } else if (isVNodeComponentTags(item, 'ion-label')) {
            // 包含ion-label组件
            $label = item
          } else if (isVNodeComponentTags(item, ['ion-select', 'ion-input', 'ion-textarea', 'ion-datetime', 'ion-range'])) {
            // 包含item-content组件
            $contents.push(item)
          } else if (isVNodeComponentTags(item, ['ion-radio', 'ion-toggle'])) {
            $end = item
          } else {
            // 默认
            $defaults.push(item)
          }
        })
      }

      // 处理start相关部分
      if (this.$slots['item-start']) $start = this.$slots['item-start'][0]
      if (this.$slots['item-left']) $start = this.$slots['item-left'][0]
      if ($start) {
        resolveVNodeData($start)

        $start.data.attrs['item-start'] = ''
        if (isVNodeComponentTags($start, 'ion-icon')) {
          $start.data.staticClass += ' item-icon'
        }
      }

      // 如果不包含ion-label组件，则创建一个ion-label组件包裹默认的元素
      if (!$label) {
        $label = h(IonLabel, $defaults)
      } else {
        const props = $label.componentOptions.propsData
        if (props.floating || props.floating === '') className += ' item-label-floating'
        if (props.stacked || props.stacked === '') className += ' item-label-stacked'
        if (props.fixed || props.fixed === '') className += ' item-label-fixed'
        if (props.inset || props.inset === '') className += ' item-label-inset'
      }

      // 处理content相关部分
      if (this.$slots['item-content']) $contents.push(this.$slots['item-content'][0])
      if ($contents.length) {
        $contents.forEach((item) => {
          resolveVNodeData(item)
          item.data.attrs['item-content'] = ''

          const inputs = []
          if (isVNodeComponentTags(item, ['ion-input', 'ion-textarea'])) {
            className += ' item-input'
            if (isVNodeComponentTags(item, 'ion-textarea')) {
              className += ' item-textarea'
            }

            const props = item.componentOptions.propsData
            if (props.readonly || props.readonly === '') className += ' item-input-readonly'
            if (props.disabled || props.disabled === '') className += ' item-input-disabled'
            inputs.push(item)
          }
          if (inputs.length > 1) className += ' item-multiple-inputs'
        })
      }

      // 处理end相关部分
      if (this.$slots['item-right']) $end = this.$slots['item-right'][0]
      if (this.$slots['item-end']) $end = this.$slots['item-end'][0]
      if ($end) {
        resolveVNodeData($end)

        $end.data.attrs['item-end'] = ''
        if (isVNodeComponentTags($end, 'ion-button')) {
          $end.data.staticClass += ' item-button'
        }

        if (isVNodeComponentTags($end, 'ion-radio')) {
          $end.data.staticClass += ' item-radio'

          const props = $end.componentOptions.propsData
          if (props.checked === props.value) className += ' item-radio-checked'
          if (props.disabled || props.disabled === '') className += ' item-radio-disabled'
        }
      }

      let tag = this.tag
      let tagProps = this.tagProps
      if (tag === 'button') tag = 'ion-button'
      if (tag === 'a') tag = 'router-link'
      return h(tag, {
        'class': className,
        props: tagProps
      }, [
        $start,
        h('div', {
          'class': 'item-inner'
        }, [
          h('div', {
            'class': 'input-wrapper'
          }, [
            $label,
            ...$contents
          ]),
          $end
        ])
      ])
    }
  }
</script>

<style lang="scss">
  @import "./item";
  @import "./item.ios";
  @import "./item.media";
</style>
