<template>
  <div class="swiper-container" ref="swiperContainer">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <slot name="container"></slot>
    <div v-if="showPager" class="swiper-pagination" ref="swiperPagination"></div>
  </div>
</template>

<script>
  import { xhrDynamicNodes } from '../../util/util'

  export default {
    name: 'ion-swiper',
    data () {
      return {
        swiper: null
      }
    },
    props: {
      pager: Boolean,
      options: Object
    },
    computed: {
      showPager () {
        return this.pager || (this.options && this.options.pager)
      }
    },
    async mounted () {
      const options = this.options
      if (!options.pagination && this.showPager) {
        options.pagination = this.$refs.swiperPagination
      }

      if (typeof window.Swiper === 'undefined') {
        await xhrDynamicNodes([`${process.env.publicHost}/js/libs/swiper/3.4.2/swiper.min.css`, `${process.env.publicHost}/js/libs/swiper/3.4.2/swiper.min.js`]).catch((err) => console.error('js库加载失败，稍后再试'))
        if (typeof window.Swiper === 'undefined') throw new Error('Invalid swiper lib.')
      }
      this.swiper = new window.Swiper(this.$refs.swiperContainer, options)
    },
    beforeDestroy () {
      if (this.swiper) this.swiper.destroy(true, true)
    }
  }
</script>

<style lang="scss">
  .swiper-container {
    width: 100%;
    height: 100%;
    padding: 0;
    display: flex;
    overflow: hidden;
  }

  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }

  .swiper-slide {
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
