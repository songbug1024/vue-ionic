<template>
  <div class="ion-page" :class="{'layout-absolute': absolute}">
    <slot></slot>
  </div>
</template>

<script>
  import { hasClass, getWinHeight } from '../../util/util'

  export default {
    name: 'ion-page',
    props: {
      absolute: Boolean // 使用绝对定位的布局方式
    },
    mounted () {
      const $parent = this.$el.parentNode

      if (!$parent || hasClass($parent, 'modal-wrapper')) {
        setTimeout(() => this.computeLayout())
      } else {
        this.computeLayout()
      }
    },
    methods: {
      // 计算页面布局
      computeLayout () {
        let top = 0
        let bottom = 0
        const content = this.$el.querySelector('.ion-content')

        if (content) {
          const headers = this.$el.querySelectorAll('.ion-header')
          const footers = this.$el.querySelectorAll('.ion-footer')
          const tabbar = document.querySelector('.ion-tabbar')
          const sttBtn = content.querySelector('.stt-btn') // 滚动到顶部按钮

          // tabbar显示，并且当前页面不是在Modal中
          if (tabbar && hasClass(tabbar, 'show-tabs') && !hasClass(this.$el.parentNode, 'modal-wrapper')) {
            const placement = tabbar.getAttribute('tabs-placement')

            if (!placement || placement === 'bottom') {
              bottom += tabbar.clientHeight
            } else if (placement === 'top') {
              top += tabbar.clientHeight
            }
          }

          if (headers && headers.length) {
            Array.from(headers).forEach((item, index) => {
              if (index > 0) item.style['top'] = `${top}px`
              top += item.clientHeight // 这段逻辑一定要在 item.style['top'] = `${top}px` 后面

              if (!this.absolute) item.style['position'] = 'fixed' // 修复抖动问题
            })
          }

          if (footers && footers.length) {
            Array.from(footers).reverse().forEach((item, index) => {
              if (index > 0) item.style['bottom'] = `${bottom}px`
              bottom += item.clientHeight // 这段逻辑一定要在 item.style['bottom'] = `${bottom}px` 后面
            })
          }

          if (this.absolute) {
            content.style['top'] = `${top}px`
            content.style['bottom'] = `${bottom}px`
          } else {
            content.style['padding-top'] = `${top}px`
            content.style['padding-bottom'] = `${bottom}px`
            content.style['min-height'] = `${getWinHeight()}px`
          }

          if (sttBtn) {
            sttBtn.style['bottom'] = `${bottom + 10}px` // FIXME display: none时不能获取bottom scrollTopBtn.style['bottom'].split('px')[0]
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./page";
</style>
