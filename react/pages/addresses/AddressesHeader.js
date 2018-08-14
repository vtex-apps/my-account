import React from 'react'
import BaseHeader from '../shared/BaseHeader'

const AddressesHeader = () => {
  return (
    <BaseHeader
      titleId={'pages.addresses'}
      actionButton={{ id: 'addresses.addAddress', path: '/addresses/new' }}
    />
  )
}

export default AddressesHeader
