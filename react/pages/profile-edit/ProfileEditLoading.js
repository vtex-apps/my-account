import React from 'react'
import PropTypes from 'prop-types'
import BaseLoading from '../shared/BaseLoading'
import ProfileEditHeader from './ProfileEditHeader'

const ProfileEditLoading = ({ data }) => {
  return <BaseLoading queryData={data} PageHeader={ProfileEditHeader} />
}

ProfileEditLoading.propTypes = {
  data: PropTypes.any.isRequired,
}

export default ProfileEditLoading
