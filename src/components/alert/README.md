# Ionic Alert

## 函数

- $showAlert
- $showConfirm
- $showPrompt

## 示例

显示alert

    this.$showAlert('你长得很帅~') // {message: '你长得很帅~'}
    
    this.$showAlert({
      title: '风险提示',
      message: '您的账号在异地登录',
      buttons: '知道了'
    })

显示confirm

    this.$showConfirm('你却要这么做吗？') // {message: '你长得很帅~'}
    
    this.$showConfirm({
      title: '温馨提示',
      subTitle: '小心再小心',
      message: '你确定要删除这条数据吗',
      buttons: [{
        role: 'cancel',
        text: '取消'
      }, {
        text: '确定'
      }]
    })

    async function showMyConfirm () { // 使用async函数
        await this.$showConfirm({
          title: '温馨提示',
          subTitle: '小心再小心',
          message: '你确定要删除这条数据吗',
          buttons: [{
            role: 'cancel',
            text: '取消'
          }, {
            text: '确定',
            role: 'confirm'
          }]
        })
        alert('你已经删除成功！') // 注意，这条会在你点了确定按钮之后执行
    }

显示prompt