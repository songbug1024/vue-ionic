<template>
  <div class="accordion-item" :class="{'accordion-item-expanded': expanded}">
    <div class="accordion-item-bar" @click="barClick">
      <slot name="bar"></slot>
    </div>
    <div class="accordion-item-content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        expanded: false
      }
    },
    mounted () {
      this.$parent.$on('pack-up', () => this.expanded && this.doToggle())
    },
    methods: {
      barClick (e) {
        this.$parent.$emit('toggle-expanded', !this.expanded)
        this.doToggle()
      },
      doToggle () {
        this.expanded = !this.expanded

        const contentEl = this.$refs.content
        contentEl.style['height'] = this.expanded ? contentEl.scrollHeight + 'px' : '0'
      }
    }
  }
</script>
