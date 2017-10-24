import { storiesOf } from '@storybook/vue'

import IonSegment from '../components/segment/segment.vue'
import IonSegmentButton from '../components/segment/segment-button.vue'

storiesOf('IonToolbar', module)
  .add('Basic', () => {
    return {
      template: `
      <ion-toolbar>
        <ion-button slot="left" icon-only color="dark">
          <ion-icon name="scan"></ion-icon>
        </ion-button>
        <ion-title>标题</ion-title>
        <ion-button slot="right" icon-only color="dark">
          <ion-icon name="notification"></ion-icon>
        </ion-button>
      </ion-toolbar>
      `
    }
  })
  .add('IonButtons', () => {
    return {
      template: `
      <ion-toolbar>
        <ion-buttons slot="left">
          <ion-button icon-only color="dark">
            <ion-icon name="scan"></ion-icon>
          </ion-button>
          <ion-button icon-only color="dark">
            <ion-icon name="scan"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>标题</ion-title>
        <ion-buttons slot="right">
          <ion-button icon-only color="dark">
            <ion-icon name="notification"></ion-icon>
          </ion-button>
          <ion-button icon-only color="dark">
            <ion-icon name="notification"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      `
    }
  })
  .add('IonSegment', () => {
    return {
      template: `
      <ion-toolbar>
        <ion-button slot="left" icon-only color="dark">
          <ion-icon name="scan"></ion-icon>
        </ion-button>
        <ion-segment v-model="tabIndex">
          <ion-segment-button value="1">标签1</ion-segment-button>
          <ion-segment-button value="2">标签2</ion-segment-button>
        </ion-segment>
        <ion-button slot="right" icon-only color="dark">
          <ion-icon name="notification"></ion-icon>
        </ion-button>
      </ion-toolbar>
      `,
      components: {
        IonSegment,
        IonSegmentButton
      },
      data () {
        return {
          tabIndex: '1'
        }
      }
    }
  })
