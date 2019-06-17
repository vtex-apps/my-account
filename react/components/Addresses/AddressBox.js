import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { AddressSummary, AddressRules } from 'vtex.address-form'
import ContentBox from '../shared/ContentBox'

const AddressBox = ({ address, onEditClick, intl }) => {
  return (
    <ContentBox
      lowerButton={<FormattedMessage id="commons.edit" />}
      onLowerButtonClick={onEditClick}>
      <div className="lighter c-muted-2 lh-copy pv4 w5 h4">
        <AddressRules country={address.country} shouldUseIOFetching>
          <AddressSummary address={address} />
        </AddressRules>
      </div>
    </ContentBox>
  )
}

AddressBox.propTypes = {
  address: PropTypes.object,
  onEditClick: PropTypes.func,
}

export default AddressBox
