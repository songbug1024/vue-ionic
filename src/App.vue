<template>
  <ion-app>
    <ion-page class="page1">
      <ion-header>
        <ion-navbar title="页面1" hideBack></ion-navbar>
      </ion-header>
      <ion-content>
        <h2>我是一段文字....</h2>
      </ion-content>
    </ion-page>

    <ion-tabbar>
      <ion-tab-button title="首页" icon="home"></ion-tab-button>
      <ion-tab-button title="购物车" icon="shopcart"></ion-tab-button>
      <ion-tab-button title="我" icon="me"></ion-tab-button>
    </ion-tabbar>
  </ion-app>
</template>

<script>
  import IonTabbar from './components/tabbar/tabbar.vue'
  import IonTabButton from './components/tabbar/tab-button.vue'

  export default {
    name: 'app',
    components: {
      IonTabbar,
      IonTabButton
    }
  }
</script>

<style lang="scss">
  @import "assets/fonts/iconfont.css";
</style>
