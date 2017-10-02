<template>
  <ion-view name="action-sheet" :cssClass="cssClass" ref="view">
    <div class="action-sheet-container">
      <div class="action-sheet-group">
        <div v-if="title" class="action-sheet-title">{{title}}</div>
        <div class="action-sheet-button-wrapper" :class="{'grid-layout': buttons.length > 4, [`${layout}-layout`]: layout}">
          <ion-button v-for="(item, index) in buttons" :key="item.text" role="action-sheet-button"
                      @click="buttonClick(item, index)" class="disable-hover"
                      :class="[item.cssClass, {[`action-sheet-${item.role}`]: item.role}]">
            <ion-icon v-if="item.icon" :name="item.icon" class="action-sheet-icon"></ion-icon>
            <span v-html="item.text" class="action-sheet-text"></span>
          </ion-button>
        </div>
      </div>
      <div v-if="cancelButton" class="action-sheet-group">
        <ion-button role="action-sheet-button" class="action-sheet-cancel disable-hover" :class="cancelButton.cssClass"
                    @click="buttonClick(cancelButton)">
          <ion-icon v-if="cancelButton.icon" :name="cancelButton.icon" class="action-sheet-icon"></ion-icon>
          <span v-html="cancelButton.text" class="action-sheet-text"></span>
        </ion-button>
      </div>
    </div>
  </ion-view>
</template>

<script>
  import IonView from '../view/view.vue'
  import IonButton from '../button/button.vue'
  import IonIcon from '../icon/icon.vue'

  export default {
    name: 'ion-action-sheet',
    data () {
      return {
        cssClass: '',
        title: '',
        layout: '',
        buttons: [],
        cancelButton: null
      }
    },
    components: {
      IonView,
      IonButton,
      IonIcon
    },
    created () {
      if (this.buttons && this.buttons.length) {
        if (this.buttons.length > 4) {

        }
        const cancelIndex = this.buttons.findIndex((item) => item.role === 'cancel')
        if (cancelIndex > 0) {
          this.cancelButton = this.buttons[cancelIndex]
          this.buttons.splice(cancelIndex, 1)
        }
      }
    },
    methods: {
      present (opts) {
        this.$refs.view.present(opts)
      },
      buttonClick (button, index) {
        this.$refs.view.dismiss(button.role || 'button', index)
      },
      dismiss (role, data) {
        this.$refs.view.dismiss(role, data)
      }
    }
  }
</script>

<style lang="scss">
  @import "./action-sheet";
  @import "./action-sheet.ios";
  @import "./action-sheet.animation";
</style>
