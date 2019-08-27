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

  public getSchema() {
    return {
      title: 'editor.menu.name',
      description: 'editor.menu.description',
      type: 'object',
      properties: {
        extensionPoint: {
          title: 'editor.menu.field',
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
