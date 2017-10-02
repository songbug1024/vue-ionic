import IonToast from './toast.vue'

import { appendDefinition } from '../../util/util'

export function showToast (d) {
  if (!d) return console.error(new Error('Invalid options'))
  if (typeof d === 'string') d = {message: d}

  const vm = appendDefinition(document.querySelector('body'), IonToast, d)
  vm.present(d)
  return vm
}
