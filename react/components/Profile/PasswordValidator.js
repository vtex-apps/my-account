import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { IconSuccess, IconFailure } from 'vtex.styleguide'

class PasswordValidator extends Component {
  state = {
    has8chars: false,
    hasNumber: false,
    hasCaps: false,
    hasLow: false,
  }

  componentDidUpdate(prevProps) {
    const { password, onValidationChange } = this.props
    if (password === prevProps.password) return

    const has8chars = password.length >= 8
    const hasNumber = /[0-9]+/g.test(password)
    const hasCaps = /[A-Z]+/g.test(password)
    const hasLow = /[a-z]+/g.test(password)

    const isValid = has8chars && hasNumber && hasCaps && hasLow
    const wasValid =
      this.state.has8chars &&
      this.state.hasNumber &&
      this.state.hasCaps &&
      this.state.hasLow
    this.setState({ has8chars, hasNumber, hasCaps, hasLow })

    if (isValid !== wasValid) {
      onValidationChange({ valid: isValid })
    }
  }

  render() {
    const { intl } = this.props
    const { has8chars, hasNumber, hasCaps, hasLow } = this.state

    const getIcon = condition =>
      condition ? (
        <div className="mr3 c-success">
          <IconSuccess solid block />
        </div>
      ) : (
        <div className="mr3 c-danger">
          <IconFailure solid block />
        </div>
      )

    return (
      <div className="f6">
        <div className="mb5">
          <FormattedMessage id="personalData.yourPasswordMust" />
        </div>
        <div className="flex mb5">
          <div className="w-50 flex items-center">
            {getIcon(has8chars)}
            <FormattedMessage id="personalData.8chars" />
          </div>
          <div className="w-50 flex items-center">
            {getIcon(hasLow)}
            <FormattedMessage id="personalData.1lowLetter" />
          </div>
        </div>
        <div className="flex">
          <div className="w-50 flex items-center">
            {getIcon(hasNumber)}
            <FormattedMessage id="personalData.1number" />
          </div>
          <div className="w-50 flex items-center">
            {getIcon(hasCaps)}
            <FormattedMessage id="personalData.1upLetter" />
          </div>
        </div>
      </div>
    )
  }
}

PasswordValidator.propTypes = {
  password: PropTypes.string.isRequired,
  onValidationChange: PropTypes.func.isRequired,
}

export default PasswordValidator
