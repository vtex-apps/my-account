import React from 'react'
import PropTypes from 'prop-types'
import { BaseLoading } from 'vtex.my-account-commons'

import { headerConfig } from '../pages/ProfileEdit'
import FormLoader from './FormLoader'

const ProfileEditLoading = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig()}>
      <FormLoader />
    </BaseLoading>
  )
}

ProfileEditLoading.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProfileEditLoading
