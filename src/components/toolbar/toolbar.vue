<script>
  import { isVNodeComponentTags, resolveVNodeData } from '../../util/util'

  const resolveBarButtonRole = function (vnode) {
    if (isVNodeComponentTags(vnode, 'ion-button')) {
      // 是一个ion-button
      const props = vnode.componentOptions.propsData
      vnode.componentOptions.propsData = Object.assign({role: 'bar-button'}, props)
    }
  }

  const resolveVNodeBarButtonRole = function (vnode) {
    if (!vnode.data || typeof vnode.data.staticClass === 'undefined') throw new Error('Not resolveVNodeData before set role')

    if (vnode.data.staticClass.indexOf('ion-buttons') >= 0) {
      // 包含 ion-buttons
      vnode.children.forEach((item) => resolveBarButtonRole(item))
    } else {
      resolveBarButtonRole(vnode)
    }
  }

  export default {
    name: 'ion-toolbar',
    render (h) {
      let className = 'toolbar'
      let $start // 对应start, left
      let $end // 对应right, end

      // 处理start相关部分
      if (this.$slots['start']) $start = this.$slots['start'][0]
      if (this.$slots['left']) $start = this.$slots['left'][0]
      if ($start) {
        resolveVNodeData($start)

        $start.data.attrs['start'] = ''
        resolveVNodeBarButtonRole($start)
      }

      // 处理end相关部分
      if (this.$slots['right']) $end = this.$slots['right'][0]
      if (this.$slots['end']) $end = this.$slots['end'][0]
      if ($end) {
        resolveVNodeData($end)

        $end.data.attrs['end'] = ''
        resolveVNodeBarButtonRole($end)
      }

      return h('div', {
        'class': className
      }, [
        h('div', {class: 'toolbar-background'}),
        $start,
        h('div', {
          class: 'toolbar-content'
        }, this.$slots.default),
        $end
      ])
    }
  }
</script>

<style lang="scss">
  @import "./toolbar";
  @import "./toolbar.ios";
  @import "./toolbar.button";
</style>