import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import ContentBox from '../shared/ContentBox'

const PasswordBox = ({ intl }) => {
  return (
    <ContentBox width={40}>
      <h2>PasswordBox works!</h2>
    </ContentBox>
  )
}

PasswordBox.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(PasswordBox)
