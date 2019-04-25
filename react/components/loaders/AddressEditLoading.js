import React from 'react'
import PropTypes from 'prop-types'
import { BaseLoading } from 'vtex.my-account-commons'

import { headerConfig } from '../pages/AddressEdit'
import FormLoader from './FormLoader'

const AddressEditLoading = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig()}>
      <FormLoader />
    </BaseLoading>
  )
}

AddressEditLoading.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AddressEditLoading
