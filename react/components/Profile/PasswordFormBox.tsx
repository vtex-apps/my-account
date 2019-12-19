import React, { Component, Fragment } from 'react'
import {
  InjectedIntlProps,
  injectIntl,
  FormattedMessage,
  defineMessages,
} from 'react-intl'
import { compose } from 'recompose'
import { Button, InputPassword, Input } from 'vtex.styleguide'
import { AuthState, AuthService } from 'vtex.react-vtexid'
import { GenericError } from 'vtex.my-account-commons'
import { withRuntimeContext } from 'vtex.render-runtime'
import { withPixel, PixelData } from 'vtex.pixel-manager/PixelContext'

import ContentBox from '../shared/ContentBox'
import RedefinePasswordForm from './RedefinePassword'
import SendAccCodeButton from './SendAccCodeButton'
import PasswordValidator from './PasswordValidator'

const WRONG_CREDENTIALS = 'Wrong credentials'
const BLOCKED_USER = 'Blocked'
const messages = defineMessages({
  code: {
    id: 'vtex.store-messages@0.x::personalData.code',
  },
  newPassword: {
    id: 'vtex.store-messages@0.x::personalData.newPassword',
  },
})

class PasswordFormBox extends Component<Props, State> {
  public state = {
    currentPassword: '',
    newPassword: '',
    newPasswordTouched: false,
    newPasswordValid: false,
    changeAttempts: 0,
    isLoading: false,
    error: null,
    isCodeSent: false,
  }

  private handleChange = (
    e: any,
    setPassword: (args: any) => any = () => {}
  ) => {
    const { name, value } = e.target
    this.setState({ [name]: value }, () => setPassword(value))
  }

  private handleTouchField = (e: any) => {
    this.setState({ [`${e.target.name}Touched`]: true })
  }

  private handleValidationChange = ({ valid }: any) => {
    this.setState({ newPasswordValid: valid })
  }

  private handleSubmit = async (setNewPassword = () => {}) => {
    const { newPasswordValid, changeAttempts } = this.state
    if (!newPasswordValid) return

    this.setState({
      isLoading: true,
      error: null,
      changeAttempts: changeAttempts + 1,
    })
    setNewPassword()
  }

  private handleSetPasswordError = (error: any) => {
    const wrongPassword = error.toString().indexOf(WRONG_CREDENTIALS) > -1
    const blockedUser = error.toString().indexOf(BLOCKED_USER) > -1
    this.setState((prevState: any) => ({
      isLoading: false,
      error:
        wrongPassword && prevState.changeAttempts === 3
          ? 'vtex.store-messages@0.x::alert.wrongAndAboutToBlock'
          : wrongPassword
          ? 'vtex.store-messages@0.x::alert.wrongPassword'
          : blockedUser
          ? 'vtex.store-messages@0.x::alert.blockedUser'
          : 'vtex.store-messages@0.x::alert.unknownError',
    }))
  }

  private handleDismissError = () => {
    this.setState({ error: null })
  }

  private handleSetPasswordSuccess = (onPasswordChange: () => void) => {
    this.setState({ isLoading: false, changeAttempts: 0 })

    const { runtime, push } = this.props

    const event: PixelData = {
      event: 'pageView',
      eventType: 'passwordReset',
      accountName: runtime.account,
      pageTitle: document.title,
      pageUrl: location.href,
      pageCategory: 'MyAccount',
    }

    push(event)

    onPasswordChange()
  }

  private handleIsCodeSent = () => {
    this.setState((prevState: any) => ({ isCodeSent: !prevState.isCodeSent }))
  }

  public render() {
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
          <RedefinePasswordForm onChange={this.handleChange} />
        ) : this.state.isCodeSent ? (
          <Fragment>
            <div className="pt4 pb4">
              <Input
                value={currentToken || ''}
                onChange={(e: any) => {
                  setToken(e.target.value)
                }}
                label={intl.formatMessage(messages.code)}
              />
            </div>
            <div className="flex justify-end">
              <SendAccCodeButton variation="tertiary">
                <FormattedMessage id="vtex.store-messages@0.x::personalData.resendCode" />
              </SendAccCodeButton>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="t-heading-6 tc pb4">
              <FormattedMessage id="vtex.store-messages@0.x::personalData.sendAccessCode.title" />
            </div>
            <div className="pt4 flex justify-center">
              <SendAccCodeButton
                variation="primary"
                onSuccess={this.handleIsCodeSent}>
                <FormattedMessage id="vtex.store-messages@0.x::personalData.sendCode" />
              </SendAccCodeButton>
            </div>
          </Fragment>
        )}
        {(this.state.isCodeSent || passwordLastUpdate) && (
          <Fragment>
            <AuthState.Password>
              {({ value, setValue: setNewPassword }: any) => (
                <Fragment>
                  <div className="mb7 mt4">
                    <InputPassword
                      name="newPassword"
                      value={value || ''}
                      onChange={(e: any) =>
                        this.handleChange(e, setNewPassword)
                      }
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
              onFailure={(error: any) => this.handleSetPasswordError(error)}>
              {({ action: setPassword }: any) => {
                return (
                  <AuthService.StartLoginSession
                    onSuccess={() => this.handleSubmit(setPassword)}>
                    {({
                      loading: loadingStartSession,
                      action: startSession,
                    }: any) => {
                      return (
                        <Button
                          block
                          size="small"
                          onClick={() => startSession()}
                          isLoading={isLoading || loadingStartSession}
                          disabled={!shouldEnableSubmit}>
                          <FormattedMessage id="vtex.store-messages@0.x::personalData.savePassword" />
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

interface State {
  currentPassword: string
  newPassword: string
  newPasswordTouched: boolean
  newPasswordValid: boolean
  changeAttempts: number
  isLoading: boolean
  error: any
  isCodeSent: boolean
  [key: string]: any
}

interface Props extends InjectedIntlProps {
  email: string
  onPasswordChange: () => void
  setToken: (value: string) => void
  passwordLastUpdate?: string
  currentToken?: string
  runtime: Runtime
  push: (args: PixelData) => void
}

export default compose<Props, Omit<Props, 'intl' | 'runtime' | 'push'>>(
  injectIntl,
  withRuntimeContext,
  withPixel
)(PasswordFormBox)
