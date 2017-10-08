<template>
  <div class="ion-content">
    <slot></slot>

    <div v-if="infiniteState > INFINITE_STATES.INIT" class="infinite-scroll-content">
      <slot name="infinite">
        <template v-if="infiniteState !== INFINITE_STATES.ENDED">
          <ion-spinner v-if="typeof infiniteSpinner === 'string'" :name="infiniteSpinner"></ion-spinner>
          <ion-spinner v-if="typeof infiniteSpinner === 'object'" :spinner="infiniteSpinner"></ion-spinner>
        </template>
        <span class="infinite-scroll-content-text">
          {{infiniteState === INFINITE_STATES.ENDED ? infiniteEndedText : infiniteText}}
        </span>
      </slot>
    </div>
    <transition v-if="scrollToTopEnabled" name="stt-btn">
      <ion-button v-show="showScrollToTop" class="stt-btn" @click="doScrollToTop">
        <slot name="stt-btn">
          <ion-icon :name="scrollToTopIcon"></ion-icon>
        </slot>
      </ion-button>
    </transition>
  </div>
</template>

<script>
  import throttle from 'lodash.throttle'
  import IonSpinner from '../spinner/spinner.vue'
  import IonButton from '../button/button.vue'

  if (!process.ssr) {
    window.requestAnimationFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 6000 / 60)
        }
    })()
    window.cancelAnimFrame = (function () {
      return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        function (callback) {
          window.clearTimeout(callback)
        }
    })()
  }

  // 滚动加载状态
  const INFINITE_STATES = {
    INIT: 0, // 初始状态
    READY: 1, // 准备状态
    LOADING: 2, // 加载中状态
    ENDED: 3 // 结束状态
  }

  export default {
    name: 'ion-content',
    props: {
      infiniteEnabled: {
        type: Boolean,
        default: false
      },
      infiniteThreshold: {
        type: Number,
        default: 0.1 // 一个滚动区域大小
      },
      infiniteSpinner: {
        type: [String, Object],
        default: 'ios'
      },
      infiniteText: {
        type: String,
        default: '加载中...'
      },
      infiniteEndedText: {
        type: String,
        default: '没有更多数据了'
      },
      scrollToTopEnabled: {
        type: Boolean,
        default: false
      },
      scrollToTopDuration: {
        type: Number,
        default: 320 // 动画时长320ms
      },
      scrollToTopThreshold: {
        type: Number,
        default: 1 // 一个滚动区域大小
      },
      scrollToTopIcon: {
        type: String,
        default: 'arrow-top'
      }
    },
    data () {
      return {
        isAbsoluteLayout: false, // 滚动区域是否是绝对定位
        INFINITE_STATES,
        infiniteState: INFINITE_STATES.INIT, // 加载更多状态
        infiniteHandler: null,
        showScrollToTop: false,
        scrollTopHandler: null
      }
    },
    components: {
      IonSpinner,
      IonButton
    },
    mounted () {
      this.isAbsoluteLayout = this.$parent && this.$parent.absolute

      this.$nextTick(() => {
        // 初始化滚动加载
        this.infiniteEnabled && this.initInfiniteScroll()
        // 初始化滚动到顶部
        this.scrollToTopEnabled && this.initScrollToTop()
      })
    },
    beforeDestroy () {
      // 解除滚动加载的事件
      this._disableInfiniteScroll()
      // 解除滚动到顶部的事件
      this._disableScrollToTop()
    },
    methods: {
      /**
       * 获取当前滚动的目标元素
       * @returns {Document} 如果ion-page是absolute定位的则返回content，否则泛微document
       * @private
       */
      _getScrollTarget () {
        return this.isAbsoluteLayout ? this.$el : document
      },
      /**
       * 启用滚动加载
       * @private
       */
      _enableInfiniteScroll () {
        this.infiniteHandler && this._getScrollTarget().addEventListener('scroll', this.infiniteHandler)
      },
      /**
       * 禁用滚动加载
       * @private
       */
      _disableInfiniteScroll () {
        this.infiniteHandler && this._getScrollTarget().removeEventListener('scroll', this.infiniteHandler)
      },
      /**
       * 初始化滚动加载
       */
      initInfiniteScroll () {
        this.infiniteHandler = throttle(() => {
          const $content = this.isAbsoluteLayout ? this.$el : (document.documentElement || document.body)
          const scrollTop = this.isAbsoluteLayout ? $content.scrollTop : window.pageYOffset
          const scrollHeight = $content.scrollHeight
          const winHeight = $content.clientHeight

          if (scrollHeight - (scrollTop + winHeight) < this.infiniteThreshold * winHeight) {
            this.infiniteState = INFINITE_STATES.LOADING
            this._disableInfiniteScroll()

            this.$emit('infinite', (enabled) => {
              if (enabled) {
                this._enableInfiniteScroll()
              } else {
                this.infiniteState = INFINITE_STATES.ENDED
              }
            })
          }
        }, 60)
        this._enableInfiniteScroll()
        this.infiniteState = INFINITE_STATES.READY

        // 首次触发
        this.infiniteHandler()
      },
      /**
       * 重置滚动加载
       * @param scrollToTop 滚动到顶部的高度
       */
      resetInfiniteScroll (scrollToTop = 0) {
        this._disableInfiniteScroll() // 重新刷新无限滚动时停止上一次
        this.infiniteState = INFINITE_STATES.INIT
        this.infiniteHandler = null

        // 滚动到指定位置
        if (this.isAbsoluteLayout) {
          this.$el.scrollTop = scrollToTop
        } else {
          window.scrollTo(0, scrollToTop)
        }

        return (enabled) => enabled && this.initInfiniteScroll()
      },
      /**
       * 启用滚动到顶部
       * @private
       */
      _enableScrollToTop () {
        this.scrollTopHandler && this._getScrollTarget().addEventListener('scroll', this.scrollTopHandler)
      },
      /**
       * 禁用滚动到顶部
       * @private
       */
      _disableScrollToTop () {
        this.scrollTopHandler && this._getScrollTarget().removeEventListener('scroll', this.scrollTopHandler)
      },
      /**
       * 初始化滚动到顶部事件
       */
      initScrollToTop () {
        this.scrollTopHandler = throttle(() => {
          const $content = this.isAbsoluteLayout ? this.$el : (document.documentElement || document.body)
          const scrollTop = this.isAbsoluteLayout ? $content.scrollTop : window.pageYOffset
          const clientHeight = $content.clientHeight

          this.showScrollToTop = scrollTop >= clientHeight * this.scrollToTopThreshold // 滚动超过指定窗体大小的倍数则触发
        }, 75)
        this._getScrollTarget().addEventListener('scroll', this.scrollTopHandler)
      },
      /**
       * 执行滚动到顶部的动画
       */
      doScrollToTop () {
        const $content = this.isAbsoluteLayout ? this.$el : (document.documentElement || document.body)
        let top = this.isAbsoluteLayout ? $content.scrollTop : window.pageYOffset
        const step = top / (this.scrollToTopDuration / (1000 / 60)) >> 0
        const fn = () => {
          if (top >= 0) {
            top -= step

            // 滚动到指定位置
            if (this.isAbsoluteLayout) {
              $content.scrollTop = top
            } else {
              window.scrollTo(0, top)
            }
            fn.rafTimer = window.requestAnimationFrame(fn)
          } else {
            // 滚动到指定位置
            if (this.isAbsoluteLayout) {
              $content.scrollTop = 0
            } else {
              window.scrollTo(0, 0)
            }
            window.cancelAnimationFrame(fn.rafTimer)
          }
        }

        fn.rafTimer = window.requestAnimationFrame(fn)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../globals";

  .infinite-scroll-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    font-size: 1.4rem;
    .ion-spinner {
      margin-right: 5px;
    }
  }

  .button.stt-btn {
    position: fixed;
    right: $content-margin;
    bottom: $content-margin;
    color: rgba($primary-color, .9);
    transition: all 200ms cubic-bezier(.645, .045, .355, 1);

    .ion-icon {
      padding: 0 8px;
      font-size: 4rem;
      line-height: 40px;
    }
  }

  .stt-btn-enter, .stt-btn-leave-to {
    opacity: 0;
  }
</style>
