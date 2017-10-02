import IonActionSheet from './action-sheet.vue'

import { appendDefinition, viewPresentPushState } from '../../util/util'

/**
 * 显示一个ActionSheet
 * @param d IonActionSheet组件的参数
 * @returns {Promise}
 */
export function showActionSheet (d) {
  return new Promise((resolve, reject) => {
    if (!d) return reject(new Error('Invalid options'))
    if (typeof d === 'string' || Array.isArray(d)) d = {buttons: d}

    if (!d.buttons) return reject(new Error('Invalid buttons option'))
    if (typeof d.buttons === 'string') d.buttons = [d.buttons]
    if (!d.buttons.length) return reject(new Error('Invalid option buttons'))

    d.buttons = d.buttons.map((b) => {
      if (typeof b === 'string') return {text: b}
      return b
    })

    viewPresentPushState({
      view: appendDefinition(document.querySelector('body'), IonActionSheet, d),
      resolve: ({role, data}) => {
        resolve({role, index: data})
      }
    })
  })
}
