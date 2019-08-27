import { Component } from 'react'

class DefaultPage extends Component<Props> {
  public componentDidMount() {
    this.props.onSetDefaultPath(this.props.defaultRoute || '/profile')
  }

  public getSchema() {
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
  onSetDefaultPath: (args: string) => void
  defaultRoute: string
}

export default DefaultPage
