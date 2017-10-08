import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs'

storiesOf('IonButton', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: '<ion-button>default</ion-button>'
  }))
  .add('Click Event', () => ({
    template: `<ion-button @click="onClick">click me</ion-button>`,
    methods: {
      onClick (e) {
        alert('Good boy!')
      }
    }
  }))
  .add('Prop Color', () => {
    const color = select('Colors', ['default', 'primary', 'success', 'danger', 'warning', 'dark'], 'default')
    return {
      template: `<ion-button color="${color}">color: ${color}</ion-button>`
    }
  })
  .add('Prop VStyle', withNotes('The "style" is a reserved prop, so "vStyle" means "style".')(() => {
    const style = select('Styles', ['default', 'outline', 'clear'], 'default')
    return {
      template: `
        <div>
          <ion-button vStyle="${style}">vStyle: ${style}</ion-button>
          <br><br>
          <ion-button>default</ion-button>
          <ion-button outline>outline</ion-button>
          <ion-button clear>clear</ion-button>
        </div>
      `
    }
  }))
  .add('Prop Size', () => {
    const size = select('Sizes', ['default', 'small', 'large'], 'default')
    return {
      template: `
        <div>
          <ion-button size="${size}">size: ${size}</ion-button>
          <br><br>
          <ion-button small>small</ion-button>
          <ion-button>default</ion-button>
          <ion-button large>large</ion-button>
        </div>
      `
    }
  })
  .add('Prop Shape', () => {
    const shape = select('Shapes', ['round', 'fab'], 'default')
    return {
      template: `
        <div>
          <ion-button shape="${shape}">shape: ${shape}</ion-button>
          <br><br>
          <ion-button>default</ion-button>
          <ion-button round>round</ion-button>
          <ion-button fab fab-right fab-bottom>fab</ion-button>
        </div>
      `
    }
  })
  .add('Prop Display', () => {
    const display = select('Display', ['block', 'full'], 'default')
    return {
      template: `
        <div>
          <ion-button display="${display}">display: ${display}</ion-button>
          <br><br>
          <ion-button>default</ion-button><br><br>
          <ion-button block>block</ion-button><br>
          <ion-button full>full</ion-button>
        </div>
      `
    }
  })
  .add('Prop Icon', () => {
    return {
      template: `
        <div>
          <ion-button icon-left><ion-icon name="home"></ion-icon>icon-left</ion-button>
          <ion-button icon-only><ion-icon name="home"></ion-icon></ion-button>
          <ion-button icon-right><ion-icon name="home"></ion-icon>icon-right</ion-button>
        </div>
      `
    }
  })
  .add('Prop Role', () => {
    const role = text('Role', 'button')
    return {
      template: `<ion-button role="${role}">role: ${role}</ion-button>`
    }
  })
  .add('Prop Type', withNotes('Only used when role is "button", includes: button, reset, submit.')(() => {
    const type = select('Type', ['button', 'reset', 'submit'], 'button')
    return {
      template: `<ion-button type="${type}">type: ${type}</ion-button>`
    }
  }))
  .add('Prop Disabled', () => {
    const disabled = boolean('Disabled', false)
    return {
      template: `<ion-button :disabled="${disabled}">disabled: ${disabled}</ion-button>`
    }
  })
  .add('Prop Tag and TagProps', withNotes('Tag props must be a HTML tag or registered in vue global component system.')(() => {
    const tag = text('Tag', 'button')
    const tagProps = object('TagProps', {})
    return {
      template: `<ion-button tag="${tag}" :tag-props="tagProps">tag: ${tag}, tagProps: {{tagProps}}</ion-button>`,
      data () {
        return {
          tagProps
        }
      }
    }
  }))
  .add('All Props', () => {
    const color = select('Colors', ['default', 'primary', 'success', 'danger', 'warning', 'dark'], 'default')
    const style = select('Styles', ['default', 'outline', 'clear'], 'default')
    const size = select('Sizes', ['default', 'small', 'large'], 'default')
    const shape = select('Shapes', ['default', 'round', 'fab'], 'default')
    const display = select('Display', ['default', 'block', 'full'], 'default')
    const role = text('Role', 'button')
    const type = select('Type', ['button', 'reset', 'submit'], 'button')
    const disabled = boolean('Disabled', false)
    const tag = text('Tag', 'button')
    const tagProps = object('TagProps', {})

    return {
      template: `
        <div>
          <ion-button tag="${tag}" :tag-props="tagProps" color="${color}" vStyle="${style}" size="${size}" shape="${shape}" display="${display}" role="${role}" type="${type}" :disabled="${disabled}">All Props</ion-button>
          <ul>
            <li>color: ${color}</li>
            <li>vStyle: ${style}</li>
            <li>size: ${size}</li>
            <li>shape: ${shape}</li>
            <li>display: ${display}</li>
            <li>role: ${role}</li>
            <li>disabled: ${disabled}</li>
            <li>tag: ${tag}</li>
            <li>tagProps: {{tagProps}}</li>
          </ul>
        </div>
      `,
      data () {
        return {
          tagProps
        }
      }
    }
  })
