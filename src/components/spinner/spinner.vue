<template>
    <i class="ion-spinner" :class="['spinner-' + name, {'spinner-paused': paused}]">
        <svg viewBox="0 0 64 64" v-for="item in circles" :style="item.style">
            <circle :r="item.r" transform="translate(32,32)"></circle>
        </svg>
        <svg viewBox="0 0 64 64" v-for="item in lines" :style="item.style">
            <line :y1="item.y1" :y2="item.y2" transform="translate(32,32)"></line>
        </svg>
    </i>
</template>

<script>
  import SPINNERS from './spinners'

  export default {
    name: 'ion-spinner',
    props: {
      name: String,
      spinner: Object,
      duration: Number,
      paused: Boolean
    },
    data () {
      return {
        circles: [],
        lines: []
      }
    },
    created () {
      const spinner = this.spinner || SPINNERS.find((item) => item.name === this.name)

      if (spinner) {
        if (spinner.circles) {
          this.circles = Array.from({length: spinner.circles}).map((item, index) => {
            const duration = this.duration || spinner.duration
            const data = spinner.fn(duration, index, spinner.circles)
            data.style.animationDuration = duration + 'ms'
            return data
          })
        }
        if (spinner.lines) {
          this.lines = Array.from({length: spinner.lines}).map((item, index) => {
            const duration = this.duration || spinner.duration
            const data = spinner.fn(duration, index, spinner.lines)
            data.style.animationDuration = duration + 'ms'
            return data
          })
        }
      }
    }
  }
</script>

<style lang="scss">
    @import "./spinner";
    @import "./spinner.ios";
    @import "./spinner.bubbles";
    @import "./spinner.circles";
    @import "./spinner.crescent";
    @import "./spinner.dots";
    @import "./spinner.wave";
</style>
