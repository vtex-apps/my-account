import React, { Component, ComponentType } from 'react'
import PropTypes from 'prop-types'

export function withSettings(
  WrappedComponent: ComponentType<{ settings: any }>
) {
  return class SettingsApplied extends Component {
    public static contextTypes = {
      getSettings: PropTypes.func,
    }

    public render() {
      const settings = this.context.getSettings('vtex.my-account')
      return <WrappedComponent {...this.props} settings={settings} />
    }
  }
}
