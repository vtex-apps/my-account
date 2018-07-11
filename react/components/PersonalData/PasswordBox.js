import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import ContentBox from '../shared/ContentBox'
import DataEntry from '../shared/DataEntry'

const PasswordBox = ({ intl }) => {
  return (
    <ContentBox
      width={40}
      lowerButton={intl.formatMessage({ id: 'personalData.redefinePassword' })}
      onLowerButtonClick={e => console.log('hi')}
    >
      <DataEntry label="Senha" content="*******************" />
    </ContentBox>
  )
}

PasswordBox.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(PasswordBox)
