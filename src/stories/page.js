import { storiesOf } from '@storybook/vue'
import { withKnobs, number, boolean, text, select } from '@storybook/addon-knobs'

storiesOf('IonPage', module)
  .addDecorator(withKnobs)
  .add('Basic Layout', () => {
    const count = number('Count', 100, {
      range: true,
      min: 1,
      max: 500
    })
    const absolute = boolean('Absolute Layout', false)
    return {
      template: `
      <ion-page ${absolute ? 'absolute' : ''}>
        <ion-header>
          <ion-button full large color="danger">IonHeader</ion-button>
        </ion-header>
        <ion-content>
          <ion-button v-for="n in ${count}" full style="margin: 10px 0;">button-{{n}}</ion-button>
        </ion-content>
        <ion-footer>
          <ion-button full large color="success">IonFooter</ion-button>
        </ion-footer>
      </ion-page>
    `
    }
  })
  .add('Infinite Content', () => {
    const absolute = boolean('Absolute Layout', false)
    const infiniteEnabled = boolean('Infinite Enabled', true)
    const infiniteThreshold = number('Infinite Threshold', 0.1)
    const infiniteSpinner = select('Infinite Spinner', ['ios', 'bubbles', 'circles', 'crescent', 'dots', 'wave'], 'ios')
    const infiniteText = text('Infinite Text', '加载中...')
    const infiniteEndedText = text('Infinite Ended Text', '没有更多数据了')

    return {
      template: `
      <ion-page :absolute="absolute">
        <ion-header>
          <ion-button full large color="danger">IonHeader</ion-button>
        </ion-header>
        <ion-content :infiniteEnabled="infiniteEnabled" :infiniteThreshold="infiniteThreshold" 
         :infiniteSpinner="infiniteSpinner" :infiniteText="infiniteText"
         :infiniteEndedText="infiniteEndedText" @infinite="doInfinite" ref="content">
          <ion-button v-for="n in count" full style="margin: 10px 0;">button-{{n}}</ion-button>
        </ion-content>
        <ion-footer>
          <ion-button full large color="success" @click="resetInfiniteScroll">Reset</ion-button>
        </ion-footer>
      </ion-page>
    `,
      data () {
        return {
          absolute,
          infiniteEnabled,
          infiniteThreshold,
          infiniteSpinner,
          infiniteText,
          infiniteEndedText,
          count: 20
        }
      },
      methods: {
        doInfinite (complete) {
          setTimeout(() => {
            this.count += 20
            complete(this.count < 60)
          }, 1000)
        },
        resetInfiniteScroll () {
          const complete = this.$refs.content.resetInfiniteScroll()

          this.count = 20
          setTimeout(() => complete(this.count < 60))
        }
      }
    }
  })
  .add('Content Scroll To Top', () => {
    const absolute = boolean('Absolute Layout', false)
    const scrollToTopEnabled = boolean('ScrollToTop Enabled', true)
    const scrollToTopDuration = number('ScrollToTop Duration', 320)
    const scrollToTopThreshold = number('ScrollToTop Threshold', 1)
    const scrollToTopIcon = text('ScrollToTop Icon', 'arrow-top')

    return {
      template: `
      <ion-page :absolute="absolute">
        <ion-header>
          <ion-button full large color="danger">IonHeader</ion-button>
        </ion-header>
        <ion-content :scrollToTopEnabled="scrollToTopEnabled" :scrollToTopDuration="scrollToTopDuration" 
         :scrollToTopThreshold="scrollToTopThreshold" :scrollToTopIcon="scrollToTopIcon" ref="content">
          <ion-button v-for="n in 40" full style="margin: 10px 0;" color="success">button-{{n}}</ion-button>
        </ion-content>
        <ion-footer>
          <ion-button full large>IonFooter</ion-button>
        </ion-footer>
      </ion-page>
    `,
      data () {
        return {
          absolute,
          scrollToTopEnabled,
          scrollToTopDuration,
          scrollToTopThreshold,
          scrollToTopIcon
        }
      }
    }
  })
