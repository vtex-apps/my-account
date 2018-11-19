import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Input, Button } from 'vtex.styleguide'
import { GenericError } from 'vtex.my-account-commons'

import ContentBox from '../shared/ContentBox'
import RedefinePassword from '../../graphql/redefinePassword.gql'
import PasswordValidator from './PasswordValidator'

class PasswordFormBox extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    newPasswordTouched: false,
    confirmPasswordTouched: false,
    newPasswordValid: false,
    changeAttempts: 0,
    isLoading: false,
    error: null,
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleTouchField = e => {
    this.setState({ [`${e.target.name}Touched`]: true })
  }

  handleValidationChange = ({ valid }) => {
    this.setState({ newPasswordValid: valid })
  }

  handleSubmit = async e => {
    const { email, onPasswordChange } = this.props
    const {
      currentPassword,
      newPassword,
      newPasswordValid,
      confirmPassword,
      changeAttempts,
    } = this.state
    if (newPassword !== confirmPassword || !newPasswordValid) return

    this.setState({
      isLoading: true,
      error: null,
      changeAttempts: changeAttempts + 1,
    })
    try {
      await this.props.redefinePassword({
        variables: { email, currentPassword, newPassword },
      })
      this.setState({ isLoading: false, changeAttempts: 0 })
      onPasswordChange()
    } catch (error) {
      const wrongPassword = error.toString().indexOf('Wrong credentials') > -1
      const blockedUser = error.toString().indexOf('Blocked') > -1
      this.setState(prevState => ({
        isLoading: false,
        error:
          wrongPassword && prevState.changeAttempts === 3
            ? 'alert.wrongAndAboutToBlock'
            : wrongPassword
            ? 'alert.wrongPassword'
            : blockedUser
            ? 'alert.blockedUser'
            : 'alert.unknownError',
      }))
    }
  }

  handleDismissError = () => {
    this.setState({ error: null })
  }

  render() {
    const { intl } = this.props
    const {
      currentPassword,
      newPassword,
      confirmPassword,
      newPasswordTouched,
      confirmPasswordTouched,
      newPasswordValid,
      isLoading,
      error,
    } = this.state

    const passwordsTouched = newPasswordTouched && confirmPasswordTouched
    const passwordMismatch = newPassword !== confirmPassword
    const shouldEnableSubmit =
      currentPassword && !passwordMismatch && newPasswordValid

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        {error && (
          <div className="mb7">
            <GenericError onDismiss={this.handleDismissError} errorId={error} />
          </div>
        )}
        <div className="mb7">
          <Input
            name="currentPassword"
            value={currentPassword}
            onChange={this.handleChange}
            type="password"
            label={intl.formatMessage({ id: 'personalData.currentPassword' })}
          />
        </div>
        <div className="mb7">
          <Input
            name="newPassword"
            value={newPassword}
            onChange={this.handleChange}
            onBlur={this.handleTouchField}
            type="password"
            label={intl.formatMessage({ id: 'personalData.newPassword' })}
          />
        </div>
        <div className="mb7">
          <PasswordValidator
            password={newPassword}
            onValidationChange={this.handleValidationChange}
          />
        </div>
        <div className="mb7">
          <Input
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            onBlur={this.handleTouchField}
            errorMessage={
              passwordsTouched && passwordMismatch
                ? intl.formatMessage({ id: 'alert.passwordMismatch' })
                : null
            }
            type="password"
            label={intl.formatMessage({ id: 'personalData.confirmPassword' })}
          />
        </div>
        <Button
          block
          size="small"
          onClick={this.handleSubmit}
          isLoading={isLoading}
          disabled={!shouldEnableSubmit}>
          {intl.formatMessage({ id: 'personalData.savePassword' })}
        </Button>
      </ContentBox>
    )
  }
}

PasswordFormBox.propTypes = {
  email: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  redefinePassword: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(RedefinePassword, { name: 'redefinePassword' }),
  injectIntl
)

export default enhance(PasswordFormBox)
