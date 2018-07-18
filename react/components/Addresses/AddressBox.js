import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import AddressSummary from '@vtex/address-form/lib/AddressSummary'
import ContentBox from '../shared/ContentBox'

const AddressBox = ({ address, rules, onEditClick, intl }) => {
  return (
    <ContentBox
      width="third"
      isCentered={true}
      lowerButton={intl.formatMessage({ id: 'commons.edit' })}
      onLowerButtonClick={onEditClick}
    >
      <div className="lighter black-40 flex flex-column items-center lh-copy pv4">
        <AddressSummary address={address} rules={rules} />
      </div>
    </ContentBox>
  )
}

AddressBox.propTypes = {
  address: PropTypes.object,
  rules: PropTypes.object,
  onEditClick: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(AddressBox)
