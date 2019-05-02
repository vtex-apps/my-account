import React from 'react'
import { injectIntl } from 'react-intl'
import { AuthState } from 'vtex.react-vtexid'
import { InputPassword } from 'vtex.styleguide'

const RedefinePasswordForm = ({ handleChange, intl }) => {
  return (
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
  )
}

export default injectIntl(RedefinePasswordForm)
