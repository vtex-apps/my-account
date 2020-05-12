import React, { FunctionComponent } from 'react'
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from 'react-intl'

import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const PASSWORD_MASK = '*******************'
const messages = defineMessages({
  password: { id: 'personalData.password', defaultMessage: '' },
})

const PasswordBox: FunctionComponent<Props> = ({
  passwordLastUpdate,
  onEditClick,
  intl,
}) => {
  const lowerButtonId = passwordLastUpdate
    ? 'personalData.redefinePassword'
    : 'personalData.definePassword'

  return (
    <ContentBox
      shouldAllowGrowing
      lowerButton={<FormattedMessage id={lowerButtonId} />}
      onLowerButtonClick={onEditClick}
    >
      <div className="vtex-account__password-box w-100">
        <DataEntry label={intl.formatMessage(messages.password)}>
          {passwordLastUpdate ? (
            PASSWORD_MASK
          ) : (
            <FormattedMessage id="personalData.noPassword" />
          )}
        </DataEntry>
      </div>
    </ContentBox>
  )
}

interface Props extends InjectedIntlProps {
  onEditClick: () => void
  passwordLastUpdate?: string
}

export default injectIntl(PasswordBox)
