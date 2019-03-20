import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const PasswordBox = ({ passwordLastUpdate, onEditClick, intl }) => {
  const lowerButtonId = passwordLastUpdate? 'personalData.redefinePassword' : 'personalData.definePassword'
  return (
    <ContentBox
      shouldAllowGrowing
      lowerButton={intl.formatMessage({ id: lowerButtonId })}
      onLowerButtonClick={onEditClick}>
      <div className="vtex-account__password-box w-100">
        <DataEntry label={intl.formatMessage({ id: 'personalData.password' })}>
          {passwordLastUpdate? '*******************': 'personalData.no-password'}
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
