import React from 'react'
import PropTypes from 'prop-types'
import { BaseLoading } from 'vtex.my-account-commons'

import { headerConfig } from '../pages/AddressCreate'
import FormLoader from './FormLoader'

const AddressCreateLoading = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig()}>
      <FormLoader />
    </BaseLoading>
  )
}

AddressCreateLoading.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AddressCreateLoading
