import React from 'react'
import PropTypes from 'prop-types'
import BaseLoading from '../shared/BaseLoading'
import AddressEditHeader from './AddressEditHeader'

const AddressEditLoading = ({ data }) => {
  return <BaseLoading queryData={data} PageHeader={AddressEditHeader} />
}

AddressEditLoading.propTypes = {
  data: PropTypes.any.isRequired,
}

export default AddressEditLoading
