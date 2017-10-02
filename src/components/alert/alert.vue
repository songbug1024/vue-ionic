<template>
  <ion-view name="alert" :cssClass="cssClass" ref="view">
    <div class="alert-head">
      <h2 v-if="title" class="alert-title">{{title}}</h2>
      <h3 v-if="subTitle" class="alert-sub-title" v-html="subTitle"></h3>
    </div>
    <div class="alert-message" v-html="message" ref="alertMessage"></div>
    <div v-if="inputs && inputs.length" class="alert-input-group">
      <div v-for="item in inputs" :key="item.name" class="alert-input-wrapper">
        <input :name="item.name" :placeholder="item.placeholder" :value="item.value" :type="item.type"
               class="alert-input" autofocus @keyup.enter="inputSubmit" ref="inputs">
      </div>
    </div>
    <div class="alert-button-group" :class="{vertical: buttons.length > 2}">
      <ion-button v-for="item in buttons" :key="item.text" role="alert-button" @click="buttonClick(item)"
                  :class="[item.cssClass, {[`alert-${item.role}`]: item.role}]">
        {{item.text}}
      </ion-button>
    </div>
  </ion-view>
</template>

<script>
  import { appendDefinition } from '../../util/util'

  import IonView from '../view/view.vue'
  import IonButton from '../button/button.vue'

  export default {
    name: 'ion-alert',
    data () {
      return {
        cssClass: '',
        title: '',
        subTitle: '',
        message: '',
        buttons: [],
        inputs: [],
        definition: null,
        definitionVm: null,
        definitionData: null
      }
    },
    components: {
      IonView,
      IonButton
    },
    mounted () {
      if (this.definition) {
        this.definitionVm = appendDefinition(this.$refs.alertMessage, this.definition, this.definitionData)
      }
    },
    methods: {
      present (opts) {
        this.$refs.view.present(opts)
      },
      buttonClick (button) {
        if (button.handler) {
          const result = button.handler(this.getValues(), this)

          if (result && typeof result.then === 'function') {
            result.then((result) => {
              if (!(result === false)) this.$refs.view.dismiss(button.role || 'button', this.getValues())
            })
          } else if (!(result === false)) {
            this.$refs.view.dismiss(button.role || 'button', this.getValues())
          }
        } else {
          this.$refs.view.dismiss(button.role || 'button', this.getValues())
        }
      },
      getValues () {
        let values

        if (this.inputs && this.inputs.length) {
          values = this.$refs.inputs.map((item) => item.value)
        } else if (this.definitionVm && typeof this.definitionVm.getValues === 'function') {
          values = this.definitionVm.getValues()
        }
        return values
      },
      inputSubmit () {
        const confirm = this.buttons.find((item) => item.role === 'confirm')
        confirm && this.buttonClick(confirm)
      },
      dismiss (role, data) {
        this.$refs.view.dismiss(role, data)
      }
    }
  }
</script>

<style lang="scss">
  @import "./alert";
  @import "./alert.ios";
  @import "./alert.animation";
</style>
