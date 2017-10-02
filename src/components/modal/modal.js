import IonModal from './modal.vue'

import { appendDefinition, viewPresentPushState } from '../../util/util'

/**
 * 显示一个Modal页面
 * @param definition 页面定义
 * @param params 页面参数
 * @param $el 当前页面元素
 * @returns {Promise} 页面处理结果，resolve时包含{role, data}，role代表关闭这个modal的触发类型：popstate（浏览器返回），dismiss（页面主动关闭）
 */
export function showModal (definition, params, {$el}) {
  return new Promise((resolve, reject) => {
    if (!definition) return reject(new Error('Invalid definition'))
    viewPresentPushState({
      view: appendDefinition(document.querySelector('body'), IonModal, {
        definition,
        definitionData: params
      }),
      viewName: definition.name,
      resolve,
      present: {
        $el
      }
    })
  })
}
