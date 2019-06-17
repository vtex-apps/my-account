import React from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import { AuthState } from 'vtex.react-vtexid'
import { InputPassword } from 'vtex.styleguide'

const messages = defineMessages({
  currentPassword: { id: 'personalData.currentPassword', defaultMessage: '' },
})

const RedefinePasswordForm = ({ handleChange, intl }) => {
  return (
    <AuthState.CurrentPassword>
      {({ value: currentPassword, setValue: setCurrentPassword }) => (
        <div className="mb7">
          <InputPassword
            name="currentPassword"
            value={currentPassword || ''}
            onChange={e => handleChange(e, setCurrentPassword)}
            type="password"
            label={intl.formatMessage(messages.currentPassword)}
          />
        </div>
      )}
    </AuthState.CurrentPassword>
  )
}

export default injectIntl(RedefinePasswordForm)
