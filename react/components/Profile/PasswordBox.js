import React from 'react'
import PropTypes from 'prop-types'
import {
  injectIntl,
  intlShape,
  FormattedMessage,
  defineMessages,
} from 'react-intl'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const PASSWORD_MASK = '*******************'
const messages = defineMessages({
  password: { id: 'personalData.password', defaultMessage: '' },
})

const PasswordBox = ({ passwordLastUpdate, onEditClick, intl }) => {
  const lowerButtonId = passwordLastUpdate
    ? 'personalData.redefinePassword'
    : 'personalData.definePassword'

  return (
    <ContentBox
      shouldAllowGrowing
      lowerButton={<FormattedMessage id={lowerButtonId} />}
      onLowerButtonClick={onEditClick}>
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

PasswordBox.propTypes = {
  onEditClick: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(PasswordBox)
