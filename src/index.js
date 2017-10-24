import IonApp from './components/app/app.vue'
import IonButton from './components/button/button.vue'
import IonIcon from './components/icon/icon.vue'

import IonPage from './components/page/page.vue'
import IonHeader from './components/page/header.vue'
import IonContent from './components/page/content.vue'
import IonFooter from './components/page/footer.vue'

import IonToolbar from './components/toolbar/toolbar.vue'
import IonTitle from './components/toolbar/title.vue'
import IonButtons from './components/toolbar/buttons.vue'

import { showActionSheet } from './components/action-sheet/action-sheet'
import { showAlert, showConfirm, showPrompt } from './components/alert/alert'
import { showLoading } from './components/loading/loading'
import { showModal } from './components/modal/modal'
import { showToast } from './components/toast/toast'

export default function install (Vue, options) {
  Vue.component(IonApp.name, IonApp)
  Vue.component(IonButton.name, IonButton)
  Vue.component(IonIcon.name, IonIcon)
  Vue.component(IonPage.name, IonPage)
  Vue.component(IonHeader.name, IonHeader)
  Vue.component(IonContent.name, IonContent)
  Vue.component(IonFooter.name, IonFooter)
  Vue.component(IonToolbar.name, IonToolbar)
  Vue.component(IonTitle.name, IonTitle)
  Vue.component(IonButtons.name, IonButtons)

  Vue.prototype.$showActionSheet = showActionSheet

  Vue.prototype.$showAlert = showAlert
  Vue.prototype.$showConfirm = showConfirm
  Vue.prototype.$showPrompt = showPrompt

  Vue.prototype.$showLoading = showLoading

  Vue.prototype.$showModal = function (definition, params) {
    return showModal(definition, params, {
      $el: this.$el
    })
  }

  Vue.prototype.$toast = showToast
}
