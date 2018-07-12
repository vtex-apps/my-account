import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import ContentBox from '../shared/ContentBox'

const DefaultAddressBox = ({ intl }) => {
  return (
    <ContentBox
      header={intl.formatMessage({ id: 'addresses.defaultAddress' })}
      width="third"
      isCentered={true}
      lowerButton={intl.formatMessage({ id: 'commons.edit' })}
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

DefaultAddressBox.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(DefaultAddressBox)
