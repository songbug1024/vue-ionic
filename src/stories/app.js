import { storiesOf } from '@storybook/vue'

storiesOf('IonApp', module)
  .add('Welcome', () => ({
    template: `
      <ion-app>
        <h1>Welcome to Ionic Storybook!</h1>
      </ion-app>
    `
  }))
