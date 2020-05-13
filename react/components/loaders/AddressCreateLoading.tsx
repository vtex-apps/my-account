import React, { FunctionComponent } from 'react'
import { BaseLoading } from 'vtex.my-account-commons'
import { DataValue } from 'react-apollo'

import { headerConfig } from '../pages/AddressCreate'
import FormLoader from './FormLoader'

const AddressCreateLoading: FunctionComponent<Props> = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig}>
      <FormLoader />
    </BaseLoading>
  )
}

interface Props {
  data: DataValue<unknown>
}

export default AddressCreateLoading
