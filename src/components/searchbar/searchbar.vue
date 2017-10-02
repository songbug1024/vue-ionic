<template>
  <div class="ion-searchbar">
    <div class="searchbar-input-container">
      <i class="searchbar-search-icon"></i>
      <ion-input class="searchbar-input" v-model="inputValue" :type="type"
                 :placeholder="placeholder" :readonly="readonly"
                 :disabled="disabled" :autofocus="autofocus"
                 clearInput @blur="inputBlurred"
                 @focus="inputFocused" ref="ionInput"></ion-input>
    </div>
    <ion-button v-if="showCancelButton" class="searchbar-cancel" clear @click="cancelBtnClick">{{cancelButtonText}}
    </ion-button>
  </div>
</template>

<script>
  import IonButton from '../button/button.vue'
  import IonInput from '../input/input.vue'

  export default {
    data () {
      return {
        inputValue: ''
      }
    },
    props: {
      value: String,
      type: {
        type: String,
        default: 'search'
      },
      placeholder: {
        type: String,
        default: '搜索'
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      showCancelButton: {
        type: Boolean,
        default: true
      },
      cancelButtonText: {
        type: String,
        default: '取消'
      },
      clearAfterCancel: {
        type: Boolean,
        default: true
      }
    },
    components: {
      IonButton,
      IonInput
    },
    watch: {
      value (v) {
        if (this.inputValue !== this.value) this.inputValue = v
      },
      inputValue (v) {
        this.$emit('input', v)
      }
    },
    created () {
      this.inputValue = this.value
    },
    methods: {
      inputFocused (e) {
        this.$emit('focus', e)
      },
      inputBlurred (e) {
        this.$emit('blur', e)
      },
      cancelBtnClick (e) {
        if (this.clearAfterCancel) this.$refs.ionInput.$emit('input', '')
        this.$emit('cancel', e)
      }
    }
  }
</script>

<style lang="scss">
  @import "./searchbar";
  @import "./searchbar.ios";
</style>