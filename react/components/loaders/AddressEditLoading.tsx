import type { FunctionComponent } from 'react'
import React from 'react'
import { BaseLoading } from 'vtex.my-account-commons'

import { headerConfig } from '../pages/AddressEdit'
import FormLoader from './FormLoader'

const AddressEditLoading: FunctionComponent<Props> = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig}>
      <FormLoader />
    </BaseLoading>
  )
}

interface Props {
  data: unknown
}

export default AddressEditLoading
