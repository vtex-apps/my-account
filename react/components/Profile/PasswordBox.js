import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const PasswordBox = ({ onEditClick, intl }) => {
  return (
    <ContentBox
      shouldAllowGrowing
      maxWidthStep={5}
      lowerButton={intl.formatMessage({ id: 'personalData.redefinePassword' })}
      onLowerButtonClick={onEditClick}>
      <div className="vtex-account__password-box">
        <DataEntry label={intl.formatMessage({ id: 'personalData.password' })}>
          *******************
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
