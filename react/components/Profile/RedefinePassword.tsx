import React, { FunctionComponent } from 'react'
import { injectIntl, defineMessages, InjectedIntlProps } from 'react-intl'
import { AuthState } from 'vtex.react-vtexid'
import { InputPassword } from 'vtex.styleguide'

const messages = defineMessages({
  currentPassword: {
    id: 'vtex.store-messages@0.x::personalData.currentPassword',
  },
})

const RedefinePasswordForm: FunctionComponent<Props> = ({ onChange, intl }) => {
  return (
    <AuthState.CurrentPassword>
      {({ value: currentPassword, setValue: setCurrentPassword }: any) => (
        <div className="mb7">
          <InputPassword
            name="currentPassword"
            value={currentPassword || ''}
            onChange={(e: any) => onChange(e, setCurrentPassword)}
            type="password"
            label={intl.formatMessage(messages.currentPassword)}
          />
        </div>
      )}
    </AuthState.CurrentPassword>
  )
}

interface Props extends InjectedIntlProps {
  onChange: (e: any, arg: (value: string) => void) => void
}

export default injectIntl(RedefinePasswordForm)
