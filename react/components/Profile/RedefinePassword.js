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
      </Fragment>
    )
  }
}

export default injectIntl(RedefinePasswordForm)
