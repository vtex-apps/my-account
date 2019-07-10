import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  intlShape,
  injectIntl,
  FormattedMessage,
  defineMessages,
} from 'react-intl'
import { Button, InputPassword, Input } from 'vtex.styleguide'
import { AuthState, AuthService } from 'vtex.react-vtexid'
import { GenericError } from 'vtex.my-account-commons'

import ContentBox from '../shared/ContentBox'
import RedefinePasswordForm from './RedefinePassword'
import SendAccCodeButton from './SendAccCodeButton'
import PasswordValidator from './PasswordValidator'

const WRONG_CREDENTIALS = 'Wrong credentials'
const BLOCKED_USER = 'Blocked'
const messages = defineMessages({
  code: { id: 'personalData.code', defaultMessage: '' },
  newPassword: { id: 'personalData.newPassword', defaultMessage: '' },
})

class PasswordFormBox extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    newPasswordTouched: false,
    newPasswordValid: false,
    changeAttempts: 0,
    isLoading: false,
    error: null,
    isCodeSent: false,
  }

  handleChange = (e, setPassword = () => {}) => {
    const { name, value } = e.target
    this.setState({ [name]: value }, () => setPassword(this.state[name]))
  }

  handleTouchField = e => {
    this.setState({ [`${e.target.name}Touched`]: true })
  }

  handleValidationChange = ({ valid }) => {
    this.setState({ newPasswordValid: valid })
  }

  handleSubmit = async (setNewPassword = () => {}) => {
    const { newPasswordValid, changeAttempts } = this.state
    if (!newPasswordValid) return

    this.setState({
      isLoading: true,
      error: null,
      changeAttempts: changeAttempts + 1,
    })
    setNewPassword()
  }

  handleSetPasswordError = error => {
    const wrongPassword = error.toString().indexOf(WRONG_CREDENTIALS) > -1
    const blockedUser = error.toString().indexOf(BLOCKED_USER) > -1
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

  handleSetPasswordSuccess = onPasswordChange => {
    this.setState({ isLoading: false, changeAttempts: 0 })
    onPasswordChange()
  }

  toggleIsCodeSent = () => {
    this.setState(prevState => ({ isCodeSent: !prevState.isCodeSent }))
  }

  render() {
    const {
      intl,
      passwordLastUpdate,
      currentToken,
      setToken,
      onPasswordChange,
    } = this.props
    const {
      currentPassword,
      newPassword,
      newPasswordValid,
      isLoading,
      error,
    } = this.state

    const shouldEnableSubmit =
      (currentPassword || !passwordLastUpdate) && newPasswordValid

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        {error && (
          <div className="mb7">
            <GenericError onDismiss={this.handleDismissError} errorId={error} />
          </div>
        )}

        {passwordLastUpdate ? (
          <RedefinePasswordForm handleChange={this.handleChange} />
        ) : this.state.isCodeSent ? (
          <Fragment>
            <div className="pt4 pb4">
              <Input
                value={currentToken || ''}
                onChange={e => {
                  setToken(e.target.value)
                }}
                label={intl.formatMessage(messages.code)}
              />
            </div>
            <div className="flex justify-end">
              <SendAccCodeButton variation="tertiary">
                <FormattedMessage id="personalData.resendCode" />
              </SendAccCodeButton>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="t-heading-6 tc pb4">
              <FormattedMessage id="personalData.sendAccessCode.title" />
            </div>
            <div className="pt4 flex justify-center">
              <SendAccCodeButton
                variation="primary"
                onSuccess={this.toggleIsCodeSent}>
                <FormattedMessage id="personalData.sendCode" />
              </SendAccCodeButton>
            </div>
          </Fragment>
        )}
        {(this.state.isCodeSent || passwordLastUpdate) && (
          <Fragment>
            <AuthState.Password>
              {({ value, setValue: setNewPassword }) => (
                <Fragment>
                  <div className="mb7 mt4">
                    <InputPassword
                      name="newPassword"
                      value={value || ''}
                      onChange={e => this.handleChange(e, setNewPassword)}
                      onBlur={this.handleTouchField}
                      type="password"
                      label={intl.formatMessage(messages.newPassword)}
                    />
                  </div>
                  <div className="mb7">
                    <PasswordValidator
                      password={newPassword}
                      onValidationChange={this.handleValidationChange}
                    />
                  </div>
                </Fragment>
              )}
            </AuthState.Password>
            <AuthService.SetPassword
              onSuccess={() => this.handleSetPasswordSuccess(onPasswordChange)}
              onFailure={error => this.handleSetPasswordError(error)}>
              {({ action: setPassword }) => {
                return (
                  <AuthService.StartLoginSession
                    onSuccess={() => this.handleSubmit(setPassword)}>
                    {({
                      loading: loadingStartSession,
                      action: startSession,
                    }) => {
                      return (
                        <Button
                          block
                          size="small"
                          onClick={() => startSession()}
                          isLoading={isLoading || loadingStartSession}
                          disabled={!shouldEnableSubmit}>
                          <FormattedMessage id="personalData.savePassword" />
                        </Button>
                      )
                    }}
                  </AuthService.StartLoginSession>
                )
              }}
            </AuthService.SetPassword>
          </Fragment>
        )}
      </ContentBox>
    )
  }
}

PasswordFormBox.propTypes = {
  email: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(PasswordFormBox)
