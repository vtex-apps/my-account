import React from 'react'
import BaseHeader from '../shared/BaseHeader'

const AddressCreateHeader = () => {
  return (
    <BaseHeader
      titleId={'pages.addressCreate'}
      backButton={{ id: 'pages.addresses', path: '/addresses' }}
      shouldAlwaysShowBackButton
    />
  )
}

export default AddressCreateHeader
