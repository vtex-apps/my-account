import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { AddressSummary, AddressRules } from 'vtex.address-form'

import ContentBox from '../shared/ContentBox'

const AddressBox: FunctionComponent<Props> = ({ address, onEditClick }) => {
  return (
    <ContentBox
      lowerButton={
        <FormattedMessage id="vtex.store-messages@0.x::commons.edit" />
      }
      onLowerButtonClick={onEditClick}>
      <div className="lighter c-muted-2 lh-copy pv4 w5 h4">
        <AddressRules country={address.country} shouldUseIOFetching>
          <AddressSummary address={address} />
        </AddressRules>
      </div>
    </ContentBox>
  )
}

interface Props {
  address: Address
  onEditClick: () => void
}

export default AddressBox
