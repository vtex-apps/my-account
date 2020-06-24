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
import className from '../../styles/ContentBox.css'

const PASSWORD_MASK = '*******************'
const messages = defineMessages({
  password: {
    id: 'vtex.store-messages@0.x::personalData.password',
    defaultMessage: '',
  },
})

const PasswordBox: FunctionComponent<Props> = ({
  passwordLastUpdate,
  onEditClick,
  intl,
}) => {
  const lowerButtonId = passwordLastUpdate
    ? 'vtex.store-messages@0.x::personalData.redefinePassword'
    : 'vtex.store-messages@0.x::personalData.definePassword'

  return (
    <div className={`${className.passwordBoxContainer}`}>
      <ContentBox
        shouldAllowGrowing
        lowerButton={<FormattedMessage id={lowerButtonId} />}
        onLowerButtonClick={onEditClick}
      >
        <div className={`${styles.passwordBox} w-100`}>
          <DataEntry label={intl.formatMessage(messages.password)}>
            {passwordLastUpdate ? (
              PASSWORD_MASK
            ) : (
                <FormattedMessage id="vtex.store-messages@0.x::personalData.noPassword" />
              )}
          </DataEntry>
        </div>
      </ContentBox>
    </div>
  )
}

interface Props extends InjectedIntlProps {
  onEditClick: () => void
  passwordLastUpdate?: string
}

export default injectIntl(PasswordBox)
