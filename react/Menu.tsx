import React, { Component } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'

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
      title: 'vtex.store-messages@0.x::editor.menu.name',
      description: 'vtex.store-messages@0.x::editor.menu.description',
      type: 'object',
      properties: {
        extensionPoint: {
          title: 'vtex.store-messages@0.x::editor.menu.field',
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
