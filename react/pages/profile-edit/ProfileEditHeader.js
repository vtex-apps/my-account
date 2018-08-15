import React from 'react'
import BaseHeader from '../shared/BaseHeader'

const ProfileEditHeader = () => {
  return (
    <BaseHeader
      titleId={'pages.profileEdit'}
      backButton={{ id: 'pages.profile', path: '/profile' }}
      shouldAlwaysShowBackButton
    />
  )
}

export default ProfileEditHeader
