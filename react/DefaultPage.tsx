import { Component } from 'react'
import { defineMessages } from 'react-intl'

const messages = defineMessages({
  name: {
    id: 'editor.defaultRoute.name',
    from: 'vtex.store-messages',
  },
  description: {
    id: 'editor.defaultRoute.description',
    from: 'vtex.store-messages',
  },
  field: {
    id: 'editor.defaultRoute.field',
    from: 'vtex.store-messages',
  },
})

class DefaultPage extends Component<Props> {
  public componentDidMount() {
    this.props.onSetDefaultPath(this.props.defaultRoute || '/profile')
  }

  public static getSchema() {
    return {
      title: messages.name.id,
      description: messages.description.id,
      type: 'object',
      properties: {
        defaultRoute: {
          title: messages.field.id,
          type: 'string',
          default: '/profile',
        },
      },
    }
  }

  public render() {
    return null
  }
}

interface Props {
  onSetDefaultPath: (args: string) => void
  defaultRoute: string
}

export default DefaultPage
