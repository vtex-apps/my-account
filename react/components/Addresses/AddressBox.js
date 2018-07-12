import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import ContentBox from '../shared/ContentBox'

const AddressBox = ({ onEditClick, onDefaultClick, intl }) => {
  return (
    <ContentBox
      width="third"
      isCentered={true}
      lowerButton={intl.formatMessage({ id: 'commons.edit' })}
      onLowerButtonClick={onEditClick}
      onUpperButtonClick={onDefaultClick}
      upperButton={intl.formatMessage({ id: 'addresses.setDefault' })}
    >
      <div className="lighter black-40 flex flex-column items-center lh-copy pv4">
        <div>
          <div>223 W Boundary St</div>
          <div>The Terrace 6214B</div>
          <div>Savannah, GA 31401-2207</div>
          <div>United States of America</div>
        </div>
      </div>
    </ContentBox>
  )
}

AddressBox.propTypes = {
  onEditClick: PropTypes.func,
  onDefaultClick: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(AddressBox)
