<template>
  <ion-toolbar class="navbar" :class="{'navbar-transition': transition, 'transition-transparent': transition && transitionTransparent, 'navbar-close': showClose}">
    <template slot="left">
      <slot name="left">
        <ion-button v-if="!hideBack && !showClose" class="back-btn" icon-only color="dark" @click="navBack">
          <ion-icon name="thin-arrow-left"></ion-icon>
        </ion-button>
      </slot>
    </template>
    <slot>
      <div v-if="title" class="ion-title">
        <div class="toolbar-title">{{title}}</div>
      </div>
    </slot>
    <template slot="right">
      <slot name="right">
        <ion-button v-if="showClose" class="close-btn" icon-only color="dark" @click="navBack">
          <ion-icon name="close-thin"></ion-icon>
        </ion-button>
      </slot>
    </template>
  </ion-toolbar>
</template>

<script>
  import throttle from 'lodash.throttle'
  import IonToolbar from './toolbar.vue'
  import IonButton from '../button/button.vue'
  import IonIcon from '../icon/icon.vue'

  export default {
    name: 'ion-navbar',
    props: {
      title: String, // 标题
      hideBack: Boolean, // 是否隐藏返回按钮
      showClose: Boolean, // 是否显示关闭按钮
      transition: Boolean, // 是否有渐变效果
      transitionThreshold: { // 渐进效果滚动式的偏移量，最小值为navbar的高度
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        transitionTransparent: true,
        transitionHandler: null
      }
    },
    components: {
      IonIcon,
      IonButton,
      IonToolbar
    },
    mounted () {
      if (this.transition) {
        this.$nextTick(() => {
          this.transitionHandler = throttle(() => {
            const scrollTop = window.pageYOffset
            const threshold = this.transitionThreshold || 0
            const navbarHeight = this.$el.clientHeight

            this.transitionTransparent = scrollTop <= Math.max(threshold - navbarHeight, navbarHeight)
          }, 50)

          this.transitionHandler && document.addEventListener('scroll', this.transitionHandler)
        })
      }
    },
    beforeDestroy () {
      this.transitionHandler && document.removeEventListener('scroll', this.transitionHandler)
    },
    methods: {
      navBack () {
        history.back()
      }
    }
  }
</script>

<style lang="scss">
  $navbar-transition-duration: 200ms;

  .navbar {
    .back-btn .ion-icon {
      padding: 0;
      font-size: 1.1em;
    }
  }

  .toolbar.navbar-transition {
    position: fixed;

    .toolbar-background {
      transition: opacity $navbar-transition-duration;
    }
    .toolbar-title {
      transition: all $navbar-transition-duration;
    }
    .back-btn {
      transition: color $navbar-transition-duration;
    }

    &.transition-transparent {
      .toolbar-background {
        opacity: 0;
      }
      .toolbar-title {
        color: #ffffff;
        opacity: 0;
      }
      .back-btn {
        color: #ffffff;
      }
    }
  }

  .toolbar.navbar-close {
    position: fixed;
    padding-right: 10px;

    .toolbar-background {
      background-color: transparent;
      border-bottom-width: 0;
    }
  }
</style>