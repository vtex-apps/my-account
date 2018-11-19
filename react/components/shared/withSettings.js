import React, { Component } from 'react'
import PropTypes from 'prop-types'

export function withSettings(WrappedComponent) {
  return class SettingsApplied extends Component {
    static contextTypes = {
      getSettings: PropTypes.func,
    }

    render() {
      const settings = this.context.getSettings('vtex.my-account')
      return <WrappedComponent {...this.props} settings={settings} />
    }
  }
}
