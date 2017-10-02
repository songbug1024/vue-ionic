<template>
  <transition name="tabbar">
    <div v-show="showTabs" class="ion-tabbar" :class="{'show-tabs': showTabs}">
      <router-link v-for="item in tabs" :key="item.path" class="tab-button disable-hover" active-class="tab-selected"
                 :to="item.path"
                 :class="{'has-title': item.title, 'has-icon': item.icon, 'has-title-only': item.title && !item.icon, 'icon-only': !item.title && item.icon}"
                 :exact="item.exact">
        <ion-icon v-if="item.icon" :name="item.icon" class="tab-button-icon"></ion-icon>
        <span v-if="item.title" class="tab-button-text">{{item.title}}</span>
        <ion-badge v-if="item.badge && item.badge > 0" :color="item.badgeColor || 'danger'" class="tab-badge"
           :class="{[`tab-badge-${item.badgeStyle}`]: item.badgeStyle}">{{item.badge}}</ion-badge>
      </router-link>
    </div>
  </transition>
</template>

<script type="text/babel">
  import IonIcon from '../icon/icon.vue'
  import IonBadge from '../badge/badge.vue'

  export default {
    name: 'ion-tabbar',
    props: {
      tabs: {
        type: Array,
        default: []
      }
    },
    components: {
      IonIcon,
      IonBadge
    },
    computed: {
      showTabs () {
        const tabsPath = this.tabs.map((tab) => tab.path)
        let showTabs = false
        for (let i in tabsPath) {
          if (this.$route.path === tabsPath[i]) {
            showTabs = true
            break
          }
        }
        return showTabs
      }
    }
  }
</script>

<style lang="scss">
  @import "./tabbar";
  @import "./tabbar.ios";

  .tabbar-enter-active, .tabbar-leave-active {
    transition: opacity 150ms, transform 150ms;
  }

  .tabbar-enter, .tabbar-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
</style>
