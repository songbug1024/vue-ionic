import { configure } from '@storybook/vue'
import Vue from 'vue'
import Ionic from '../src/index'

Vue.use(Ionic)

function loadStories () {
  require('../src/stories/app')
  require('../src/stories/button')
  require('../src/stories/page')
  require('../src/stories/tabbar')
  require('../src/stories/toolbar')
}

configure(loadStories, module)
