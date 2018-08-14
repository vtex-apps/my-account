import React from 'react'
import PropTypes from 'prop-types'
import BaseLoading from '../shared/BaseLoading'
import ProfileHeader from './ProfileHeader'

const ProfileLoading = ({ data }) => {
  return <BaseLoading queryData={data} PageHeader={ProfileHeader} />
}

ProfileLoading.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProfileLoading
