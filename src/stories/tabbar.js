import { storiesOf } from '@storybook/vue'
import { withKnobs, number, text, select, object } from '@storybook/addon-knobs'
import { decorateAction } from '@storybook/addon-actions'

import IonTabbar from '../components/tabbar/tabbar.vue'
import IonTabButton from '../components/tabbar/tab-button.vue'

storiesOf('IonTabbar', module)
  .addDecorator(withKnobs)
  .add('All Props', () => {
    const placement = select('Tabs Placement', ['bottom', 'top'], 'bottom')
    const layout = select('Tabs Layout', ['icon-top', 'icon-bottom', 'icon-right', 'icon-left', 'icon-hide', 'title-hide'], 'icon-top')
    const count = number('Count', 3, {
      range: true,
      min: 2,
      max: 5
    })

    let tabs = []
    const icons = ['home', 'msg', 'shopcart', 'shop', 'me']

    for (let i = 0; i < count; i++) {
      tabs.push({
        tag: text(`Tag-${i}`, 'div'),
        tagProps: object(`TagProps-${i}`, {}),
        title: text(`Title-${i}`, `Tab${i}`),
        icon: text(`Icon-${i}`, icons[i]),
        selectedIcon: text(`SelectedIcon-${i}`, ''),
        badge: number(`Badge-${i}`, 0),
        badgeColor: select(`BadgeColor-${i}`, ['default', 'primary', 'success', 'danger', 'warning', 'dark'], 'danger'),
        badgeStyle: text(`BadgeStyle-${i}`, '')
      })
    }

    const changeAction = decorateAction([
      args => args.slice(0, 1)
    ])
    const selectAction = decorateAction([
      args => args.slice(0, 1)
    ])

    return {
      components: {
        IonTabbar,
        IonTabButton
      },
      render (h) {
        return h('ion-app', {
          attrs: {
            'tabs-placement': placement
          }
        }, [
          h('ion-tabbar', {
            attrs: {
              'tabs-layout': layout
            },
            on: {
              change: changeAction('change')
            }
          }, tabs.map((item) => h('ion-tab-button', {
            props: item,
            on: {
              select: selectAction('select')
            }
          })))
        ])
      }
    }
  })
