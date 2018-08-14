import React from 'react'
import PropTypes from 'prop-types'
import BaseLoading from '../shared/BaseLoading'
import AddressesHeader from './AddressesHeader'

const AddressesLoading = ({ data }) => {
  return <BaseLoading queryData={data} PageHeader={AddressesHeader} />
}

AddressesLoading.propTypes = {
  data: PropTypes.any.isRequired,
}

export default AddressesLoading
