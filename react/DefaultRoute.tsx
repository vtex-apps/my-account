import { Component } from 'react'

class DefaultRoute extends Component<Props> {
  public componentDidMount() {
    this.props.onSetDefaultPath(this.props.defaultRoute || '/profile')
  }

  public static getSchema = () => {
    return {
      title: 'vtex.store-messages@0.x::editor.defaultRoute.name',
      description: 'vtex.store-messages@0.x::editor.defaultRoute.description',
      type: 'object',
      properties: {
        defaultRoute: {
          title: 'vtex.store-messages@0.x::editor.defaultRoute.field',
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
  defaultRoute: string
  onSetDefaultPath: (path: string) => void
}

export default DefaultRoute
