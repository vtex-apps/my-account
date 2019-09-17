import React, { FunctionComponent } from 'react'
import { BaseLoading } from 'vtex.my-account-commons'

import { headerConfig } from '../pages/ProfileEdit'
import FormLoader from './FormLoader'

const ProfileEditLoading: FunctionComponent<Props> = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig}>
      <FormLoader />
    </BaseLoading>
  )
}

interface Props {
  data: any
}

export default ProfileEditLoading
