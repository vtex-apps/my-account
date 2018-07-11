import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import ContentBox from '../shared/ContentBox'

const PersonalDataBox = ({ intl }) => {
  return (
    <ContentBox width={60}>
      <h2>PersonalDataBox works!</h2>
    </ContentBox>
  )
}

PersonalDataBox.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(PersonalDataBox)
