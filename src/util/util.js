import Vue from 'vue'

export function appendDefinition ($el, definition, data = {}) {
  const Vm = Vue.extend(definition)
  const vm = new Vm({data}).$mount()

  $el.appendChild(vm.$el)
  return vm
}

/**
 * 根据一、多个标签判断一个vNode是不是一个Vue Component
 * @param vnode
 * @param tags 标签名，支持一个、多个
 * @returns {boolean}
 */
export function isVNodeComponentTags (vnode, tags) {
  if (typeof tags === 'string') tags = [tags]

  for (let i = 0; i < tags.length; i++) {
    if ((new RegExp(`vue-component-\\d+-${tags[i]}`, 'g')).test(vnode.tag)) return true
  }
  return false
}

/**
 * 解决vNode元素在初始化没有相关数据的问题
 * @param vnode
 */
export function resolveVNodeData (vnode) {
  vnode.data = Object.assign({
    attrs: {}, // 属性
    staticClass: '', // 静态class
    staticStyle: {} // 静态style
  }, vnode.data)
}

export function setClass (el, name, enable) {
  if (enable) {
    addClass(el, name)
  } else {
    removeClass(el, name)
  }
}

export function hasClass (el, name) {
  return new RegExp(' ' + name + ' ').test(' ' + el.className + ' ')
}

export function addClass (el, name) {
  if (!hasClass(el, name)) {
    el.className += ' ' + name
  }
  return el
}

export function removeClass (el, name) {
  var newClass = ' ' + el.className.replace(/[\t\r\n]/g, ' ') + ' '
  if (hasClass(el, name)) {
    while (newClass.indexOf(' ' + name + ' ') >= 0) {
      newClass = newClass.replace(' ' + name + ' ', ' ')
    }
    el.className = newClass.replace(/^\s+|\s+$/g, '')
  }
  return el
}

export function getWin () {
  return document.documentElement || document.body
}

export function getWinWidth () {
  return document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth
}

export function getWinHeight () {
  return document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight
}

/**
 * 动态插入js或css node节点
 * @param urls String|Array 文件地址
 * @returns {Promise.<TResult>}
 */
export function xhrDynamicNodes (urls) {
  if (typeof urls === 'string') urls = [urls]

  return Promise.all(urls.map((url) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              if (/\s*\.js$/.test(url)) { // js文件
                const node = document.createElement('script')
                node.text = xhr.responseText
                resolve(node)
              } else if (/\s*\.css$/.test(url)) { // css文件
                const node = document.createElement('style')
                node.type = 'text/css'
                node.innerHTML = xhr.responseText
                resolve(node)
              } else { // 其他文件暂不支持
                reject(new Error('Invalid url type.'))
              }
            } catch (e) {
              reject(e)
            }
          } else {
            reject(new Error('脚本加载失败'))
          }
        }
      }
      xhr.open('GET', url, true)
      xhr.send()
    })
  })).then((nodes) => {
    nodes.forEach((node) => {
      document.getElementsByTagName('head')[0].appendChild(node)
    })
    return nodes
  })
}

/**
 * 动态view显示时使用history.pushState修改浏览器地址，以便返回时关闭该viwe
 * @param view Object 动态view示例
 * @param viewName String 可选 显示的view的名称
 * @param resolve Function 关闭时的resolve函数
 * @param present Object 可选 显示时的选项
 */
export function viewPresentPushState ({view, viewName, resolve, present}) {
  if (!history.pushState) throw new Error('history.pushState not support')

  view.present(Object.assign({}, present, {
    onDismiss: ({role, data}) => {
      if (role !== 'popstate') history.back()
      if (role !== 'pushstate') {
        resolve && setTimeout(() => resolve({role, data}))
      }
    }
  }))

  viewName = viewName || `_${Math.random().toString(36).substring(2)}`
  const popstateFn = (e) => {
    view.dismiss('popstate')
    window.removeEventListener('popstate', popstateFn, false)
    window.removeEventListener('pushstate', pushstateFn, true)
  }
  const pushstateFn = (e) => {
    view.dismiss('pushstate')
    window.removeEventListener('popstate', popstateFn, false)
    window.removeEventListener('pushstate', pushstateFn, true)
  }
  window.addEventListener('popstate', popstateFn, false)
  // TODO hash替换
  history.pushState({}, viewName, `${location.href}#${viewName}`)
  window.addEventListener('pushstate', pushstateFn, true)
}
