import React, { Component, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import { AuthService, AuthState } from 'vtex.react-vtexid'
import { Button, InputPassword } from 'vtex.styleguide'

import PasswordValidator from './PasswordValidator'

class RedefinePasswordForm extends Component {
  render() {
    const {
      handleChange,
      intl,
      handleSubmit,
      handleTouchField,
      handleValidationChange,
      handleSetPasswordSuccess,
      handleSetPasswordError,
      isLoading,
      shouldEnableSubmit,
      newPassword,
      onPasswordChange,
    } = this.props

    return (
      <Fragment>
        <AuthState.CurrentPassword>
          {({
            value: currentPassword,
            setValue: setCurrentPassword,
          }) => (
            <div className="mb7">
              <InputPassword
                name="currentPassword"
                value={currentPassword || ''}
                onChange={e => handleChange(e, setCurrentPassword)}
                type="password"
                label={intl.formatMessage({ id: 'personalData.currentPassword' })}
              />
            </div>
          )}
        </AuthState.CurrentPassword>
        <AuthState.Password>
          {({
            value,
            setValue: setNewPassword,
          }) => (
            <Fragment>
              <div className="mb7">
                <InputPassword
                  name="newPassword"
                  value={value || ''}
                  onChange={e => handleChange(e, setNewPassword)}
                  onBlur={handleTouchField}
                  type="password"
                  label={intl.formatMessage({ id: 'personalData.newPassword' })}
                />
              </div>
              <div className="mb7">
                <PasswordValidator
                  password={newPassword}
                  onValidationChange={handleValidationChange}
                />
              </div>
            </Fragment>
          )}
        </AuthState.Password>
        <AuthService.SetPassword
          onSuccess={() => {
            handleSetPasswordSuccess(onPasswordChange)
          }}
          onFailure={error => {
            handleSetPasswordError(error)
          }}
        >
          {({
            action: setPassword,
          }) => {
            let event = null
            return (
              <AuthService.StartLoginSession
                onSuccess={() => handleSubmit(event, setPassword)}
                onFailure={err =>
                  setErrorAlertMessage(
                    getErrorMessage(intl, err)
                  )
                }
              >
                {({
                  loading: loadingStartSession,
                  action: startSession,
                }) => {
                  return (
                    <Button
                      block
                      size="small"
                      onClick={(e) => {
                        event = e
                        startSession()
                      }}
                      isLoading={isLoading || loadingStartSession}
                      disabled={!shouldEnableSubmit}>
                      {intl.formatMessage({ id: 'personalData.savePassword' })}
                    </Button>
                  )
                }}
              </AuthService.StartLoginSession>
            )}}
        </AuthService.SetPassword>
      </Fragment>
    )
  }
}

export default injectIntl(RedefinePasswordForm)
