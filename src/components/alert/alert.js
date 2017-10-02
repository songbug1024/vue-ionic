import IonAlert from './alert.vue'

import { appendDefinition, viewPresentPushState } from '../../util/util'

export function showAlert (d) {
  return new Promise((resolve, reject) => {
    if (!d) return reject(new Error('Invalid options'))
    if (typeof d === 'string') d = {message: d}
    if (d.btnText && !d.buttons) d.buttons = d.btnText

    d = Object.assign({
      title: '温馨提示',
      buttons: '知道了'
    }, d)

    if (typeof d.buttons === 'string') d.buttons = [d.buttons]

    d.buttons = d.buttons.map((b) => {
      if (typeof b === 'string') return {text: b}
      return b
    })

    if (d.inputs && d.inputs.length) {
      d.inputs = d.inputs.map((input, index) => {
        return Object.assign({
          type: 'text',
          name: `input-${index}`,
          placeholder: '',
          value: '',
          readonly: false,
          disabled: false
        }, input)
      })
    }

    viewPresentPushState({
      view: appendDefinition(document.querySelector('body'), IonAlert, d),
      resolve
    })
  })
}

export function showConfirm (d) {
  return new Promise((resolve, reject) => {
    if (!d) return reject(new Error('Invalid options'))
    if (typeof d === 'string') d = {message: d}

    d = Object.assign({
      title: '确认提示',
      cancelText: '取消',
      confirmText: '确定'
    }, d)

    d.buttons = [{
      role: 'cancel',
      text: d.cancelText
    }, {
      role: 'confirm',
      text: d.confirmText
    }]

    viewPresentPushState({
      view: appendDefinition(document.querySelector('body'), IonAlert, d),
      resolve: ({role}) => {
        resolve(role === 'confirm')
      }
    })
  })
}

export function showPrompt (d) {
  return new Promise((resolve, reject) => {
    if (!d) return reject(new Error('Invalid options'))
    if (typeof d === 'string') d = {message: d}

    d = Object.assign({
      title: '输入提示',
      cancelText: '取消',
      confirmText: '确定',
      placeholder: '',
      value: '',
      type: 'text'
    }, d)

    d.buttons = [{
      role: 'cancel',
      text: d.cancelText
    }, {
      role: 'confirm',
      text: d.confirmText
    }]

    d.inputs = [{
      type: d.type,
      name: 'input-prompt',
      placeholder: d.placeholder,
      value: d.value,
      readonly: false,
      disabled: false
    }]

    viewPresentPushState({
      view: appendDefinition(document.querySelector('body'), IonAlert, d),
      resolve: ({role, data}) => {
        resolve(role === 'confirm' ? (data && data.length ? data[0] : '') : null)
      }
    })
  })
}
