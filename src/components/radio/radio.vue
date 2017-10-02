<template>
  <span class="ion-radio" :class="{'radio-disabled': disabled}">
    <i class="radio-icon" :class="{'radio-checked': checked === value}">
      <i class="radio-inner"></i>
    </i>
    <ion-button role="radio" :disabled="disabled" class="item-cover" @click="itemCoverClick"></ion-button>
  </span>
</template>

<script>
  import IonButton from '../button/button.vue'

  export default {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: [Array, String, Number, Boolean],
      value: String,
      disabled: Boolean
    },
    components: {
      IonButton
    },
    methods: {
      itemCoverClick (e) {
        if (this.disabled) return
        this.$emit('change', this.value)
      }
    }
  }
</script>

<style lang="scss">
  @import "./radio.ios";
</style>
