import { storiesOf } from '@storybook/vue'
import { withKnobs, number } from '@storybook/addon-knobs'

storiesOf('IonPage', module)
  .addDecorator(withKnobs)
  .add('Basic Layout', () => {
    const count = number('Count', 100, {
      range: true,
      min: 1,
      max: 500
    })
    return {
      template: `
      <ion-page>
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
  .add('Absolute Layout', () => {
    const count = number('Count', 100, {
      range: true,
      min: 1,
      max: 500
    })
    return {
      template: `
      <ion-page absolute>
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
