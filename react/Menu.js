import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'vtex.my-account-commons/Router'
import { ExtensionPoint } from 'vtex.render-runtime'

class Menu extends Component {
  componentDidMount() {
    this.props.hasExtension(!!this.props.extensionPoint)
  }

  componentDidUpdate(prevProps) {
    if (this.props.extensionPoint !== prevProps.extensionPoint) {
      this.props.hasExtension(!!this.props.extensionPoint)
    }
  }

  render() {
    return this.props.extensionPoint
      ? <ExtensionPoint id={this.props.extensionPoint} />
      : null
  }
}

Menu.getSchema = () => {
  return {
    title: 'editor.menu.name',
    description: 'editor.menu.description',
    type: 'object',
    properties: {
      extensionPoint: {
        title: 'editor.menu.field',
        type: 'string',
        default: '',
      }
    }
  }
}

export default Menu
