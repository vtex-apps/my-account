import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Input, Button, Spinner, InputPassword } from 'vtex.styleguide'
import { AuthState, AuthService } from 'vtex.react-vtexid'
import { GenericError } from 'vtex.my-account-commons'

import ContentBox from '../shared/ContentBox'
import RedefinePassword from '../../graphql/redefinePassword.gql'
import RedefinePasswordForm from './RedefinePassword'
import DefinePassword from './DefinePassword'
import PasswordValidator from './PasswordValidator'

class PasswordFormBox extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    newPasswordTouched: false,
    newPasswordValid: false,
    changeAttempts: 0,
    isLoading: false,
    error: null,
    passwordState: null,
  }

  handleChange = (e, setPassword = () => {}) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value }, () => {
      setPassword(this.state[name])
    })
  }

  handleTouchField = e => {
    this.setState({ [`${e.target.name}Touched`]: true })
  }

  handleValidationChange = ({ valid }) => {
    this.setState({ newPasswordValid: valid })
  }

  handleSubmit = async (_, setNewPassword = () => {}) => {
    const {
      newPassword,
      newPasswordValid,
      changeAttempts,
    } = this.state
    if (!newPasswordValid) return

    this.setState({
      isLoading: true,
      error: null,
      changeAttempts: changeAttempts + 1,
    })
    setNewPassword()
  }

  handleSetPasswordError = (error) => {
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

  handleDismissError = () => {
    this.setState({ error: null })
  }

  handleSetPasswordSuccess = (onPasswordChange) => {
    this.setState({ isLoading: false, changeAttempts: 0 })
    onPasswordChange()
  }

  render() {
    const { intl, passwordLastUpdate, currentToken, setToken, onPasswordChange } = this.props
    const {
      currentPassword,
      newPassword,
      newPasswordTouched,
      newPasswordValid,
      isLoading,
      error,
    } = this.state

    const passwordsTouched = newPasswordTouched
    const shouldEnableSubmit =
      (currentPassword || !passwordLastUpdate) && newPasswordValid

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        {error && (
          <div className="mb7">
            <GenericError onDismiss={this.handleDismissError} errorId={error} />
          </div>
        )}

        {
          !passwordLastUpdate?
          <DefinePassword
            setToken={setToken}
            currentToken={currentToken}/> :
          (
            <RedefinePasswordForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleTouchField={this.handleTouchField}
              handleValidationChange={this.handleValidationChange}
              handleSetPasswordError={this.handleSetPasswordError}
              handleSetPasswordSuccess={this.handleSetPasswordSuccess}
              isLoading={isLoading}
              shouldEnableSubmit={shouldEnableSubmit}
              newPassword={newPassword}
              onPasswordChange={onPasswordChange}
            />
          )
        }
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
