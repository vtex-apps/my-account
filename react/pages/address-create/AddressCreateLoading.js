import React from 'react'
import PropTypes from 'prop-types'
import BaseLoading from '../shared/BaseLoading'
import AddressCreateHeader from './AddressCreateHeader'

const AddressCreateLoading = ({ data }) => {
  return <BaseLoading queryData={data} PageHeader={AddressCreateHeader} />
}

AddressCreateLoading.propTypes = {
  data: PropTypes.any.isRequired,
}

export default AddressCreateLoading
