<template>
  <div class="ion-content">
    <slot></slot>
    <div v-if="infiniteInitEnabled" class="infinite-scroll-content">
      <template v-if="!infiniteEnded">
        <ion-spinner v-if="typeof infiniteSpinner === 'string'" :name="infiniteSpinner"></ion-spinner>
        <ion-spinner v-if="typeof infiniteSpinner === 'object'" :spinner="infiniteSpinner"></ion-spinner>
      </template>
      <span class="infinite-scroll-content-text">{{infiniteEnded ? infiniteEndedText : infiniteText}}</span>
    </div>
    <transition v-if="scrollTopEnabled" name="stb">
      <ion-button v-show="showScrollTopBtn" class="scroll-top-btn" @click="scrollToTop" fab clear icon-only>
        <ion-icon name="return-top"></ion-icon>
      </ion-button>
    </transition>
  </div>
</template>

<script>
  import throttle from 'lodash.throttle'
  import IonSpinner from '../spinner/spinner.vue'
  import IonButton from '../button/button.vue'
  import { getWin } from '../../util/util'

  if (process.browser) {
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

  export default {
    name: 'ion-content',
    props: {
      infiniteEnabled: {
        type: Boolean,
        default: false
      },
      infiniteThreshold: {
        type: Number,
        default: 0.1
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
      scrollTopEnabled: {
        type: Boolean,
        default: false
      },
      scrollTopThreshold: {
        type: Number,
        default: 1 // 一个窗体大小
      }
    },
    data () {
      return {
        infiniteInitEnabled: false,
        infiniteEnded: false,
        infiniteHandler: null,
        showScrollTopBtn: false,
        scrollTopHandler: null
      }
    },
    components: {
      IonSpinner,
      IonButton
    },
    mounted () {
      this.$nextTick(() => {
        this.initInfiniteScroll(this.infiniteEnabled)
        this.initScrollToTop()
      })
    },
    beforeDestroy () {
      this.disableInfiniteScroll()
      this.disableScrollToTop()
    },
    methods: {
      initInfiniteScroll (enabled) {
        if (enabled) {
          this.infiniteHandler = throttle(() => {
            const win = getWin()
            const scrollTop = window.pageYOffset
            const scrollHeight = win.scrollHeight
            const winHeight = win.clientHeight

            if (scrollHeight - (scrollTop + winHeight) < this.infiniteThreshold * winHeight) {
              this.disableInfiniteScroll()
              this.$emit('infinite', (enabled) => {
                if (enabled) {
                  this.enableInfiniteScroll()
                } else {
                  this.infiniteEnded = true
                }
              })
            }
          }, 50)
          this.enableInfiniteScroll()

          // 首次触发
          this.infiniteHandler()
        }
        this.infiniteInitEnabled = !!enabled
      },
      resetInfiniteScroll (scrollToTop = 0) {
        this.disableInfiniteScroll() // 重新刷新无限滚动时停止上一次
        this.infiniteEnded = false
        this.infiniteHandler = null
        window.scrollTo(0, scrollToTop) // 滚动到最顶端

        return this.initInfiniteScroll.bind(this)
      },
      enableInfiniteScroll () {
        this.infiniteHandler && document.addEventListener('scroll', this.infiniteHandler)
      },
      disableInfiniteScroll () {
        this.infiniteHandler && document.removeEventListener('scroll', this.infiniteHandler)
      },
      initScrollToTop () {
        this.scrollTopHandler = throttle(() => {
          const scrollTop = window.pageYOffset
          const clientHeight = (document.documentElement || document.body).clientHeight

          this.showScrollTopBtn = scrollTop >= clientHeight * this.scrollTopThreshold // 滚动超过指定窗体大小的倍数则触发
        }, 75)
        document.addEventListener('scroll', this.scrollTopHandler)
      },
      disableScrollToTop () {
        this.scrollTopHandler && document.removeEventListener('scroll', this.scrollTopHandler)
      },
      scrollToTop () {
        let top = window.pageYOffset
        const duration = 320
        const step = top / (duration / (1000 / 60)) >> 0
        const fn = () => {
          if (top >= 0) {
            top -= step
            window.scrollTo(0, top)
            fn.rafTimer = window.requestAnimationFrame(fn)
          } else {
            window.scrollTo(0, 0)
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
    .spinner-ios {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }

  .button.scroll-top-btn {
    position: fixed;
    right: $content-margin;
    bottom: $content-margin;
    color: rgba($primary-color, .9);
    .ion-icon {
      padding: 0 8px;
      font-size: 4rem;
      line-height: 40px;
    }

    transition: all 200ms cubic-bezier(.645, .045, .355, 1);
  }

  .stb-enter, .stb-leave-to {
    opacity: 0;
  }
</style>
