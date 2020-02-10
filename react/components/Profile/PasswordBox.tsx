import React, { FunctionComponent } from 'react'
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from 'react-intl'

import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

import styles from '../../styles.css'

const PASSWORD_MASK = '*******************'
const messages = defineMessages({
  password: {
    id: 'personalData.password',
    from: 'vtex.store-messages',
  },
  redefinePassword: {
    id: 'personalData.redefinePassword',
    from: 'vtex.store-messages',
  },
  definePassword: {
    id: 'personalData.definePassword',
    from: 'vtex.store-messages',
  },
})

const PasswordBox: FunctionComponent<Props> = ({
  passwordLastUpdate,
  onEditClick,
  intl,
}) => {
  const lowerButtonId = passwordLastUpdate
    ? messages.redefinePassword.id
    : messages.definePassword.id

  return (
    <ContentBox
      shouldAllowGrowing
      lowerButton={<FormattedMessage id={lowerButtonId} />}
      onLowerButtonClick={onEditClick}>
      <div className={`${styles.passwordBox} w-100`}>
        <DataEntry label={intl.formatMessage(messages.password)}>
          {passwordLastUpdate ? (
            PASSWORD_MASK
          ) : (
            <FormattedMessage
              id="personalData.noPassword"
              from="vtex.store-messages"
            />
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
