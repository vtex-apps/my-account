import React, { Component } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { defineMessages } from 'react-intl'

const messages = defineMessages({
  name: {
    id: 'editor.menu.name',
    from: 'vtex.store-messages',
  },
  description: {
    id: 'editor.menu.description',
    from: 'vtex.store-messages',
  },
  field: {
    id: 'editor.menu.field',
    from: 'vtex.store-messages',
  },
})

class Menu extends Component<Props> {
  public componentDidMount() {
    this.props.hasExtension(!!this.props.extensionPoint)
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.extensionPoint !== prevProps.extensionPoint) {
      this.props.hasExtension(!!this.props.extensionPoint)
    }
  }

  public static getSchema() {
    return {
      title: messages.name.id,
      description: messages.description.id,
      type: 'object',
      properties: {
        extensionPoint: {
          title: messages.field.id,
          type: 'string',
          default: '',
        },
      },
    }
  }

  public render() {
    return this.props.extensionPoint ? (
      <ExtensionPoint id={this.props.extensionPoint} />
    ) : null
  }
}

interface Props {
  extensionPoint: string
  hasExtension: (arg: boolean) => void
}

export default Menu
