import React, { Component } from 'react'

class DefaultPage extends Component {
  componentDidMount() {
    this.props.onSetDefaultPath(this.props.defaultRoute || '/profile')
  }

  render() {
    return null
  }
}

DefaultPage.getSchema = () => {
  return {
    title: 'editor.defaultRoute.name',
    description: 'editor.defaultRoute.description',
    type: 'object',
    properties: {
      defaultRoute: {
        title: 'editor.defaultRoute.field',
        type: 'string',
        default: '/profile',
      }
    }
  }
}

export default DefaultPage
