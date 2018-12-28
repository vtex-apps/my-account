import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Link, withRouter } from 'react-router-dom'

class DefaultRoute extends Component {
  componentDidMount() {
    this.props.onSetDefaultPath(this.props.defaultRoute || '/profile')
  }

  render() {
    return null
  }
}

DefaultRoute.getSchema = () => {
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

export default DefaultRoute
