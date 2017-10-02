import IonLoading from './loading.vue'

import { appendDefinition } from '../../util/util'

/**
 * 显示加载，返回一个dismiss函数，适合异步请求时长大于
 * @param d
 * @returns {function(): *}
 */
export function showLoadingSync (d) {
  d = d || {}
  if (typeof d === 'string') d = {content: d}
  if (typeof d === 'number') d = {duration: d}

  d = Object.assign({
    spinner: 'ios',
    content: '加载中...'
  }, d)

  const vm = appendDefinition(document.querySelector('body'), IonLoading, d)
  vm.present(d)
  return () => vm.dismiss('done')
}

export function showLoading (d) {
  return new Promise((resolve, reject) => {
    d = d || {}
    if (typeof d === 'string') d = {content: d}
    if (typeof d === 'number') d = {duration: d}

    d = Object.assign({
      spinner: 'ios',
      content: '加载中...'
    }, d)

    const onAfterEnter = d.onAfterEnter
    d.onAfterEnter = () => {
      onAfterEnter && onAfterEnter()
      resolve(() => vm.dismiss('done'))
    }

    const vm = appendDefinition(document.querySelector('body'), IonLoading, d)
    vm.present(d)
  })
}
