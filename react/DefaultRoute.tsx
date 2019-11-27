import { Component } from 'react'

class DefaultRoute extends Component<Props> {
  public componentDidMount() {
    this.props.onSetDefaultPath(this.props.defaultRoute || '/profile')
  }

  public static getSchema = () => {
    return {
      title: 'editor.defaultRoute.name',
      description: 'editor.defaultRoute.description',
      type: 'object',
      properties: {
        defaultRoute: {
          title: 'editor.defaultRoute.field',
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
