import React from 'react'
import PropTypes from 'prop-types'
import BaseLoading from '../shared/BaseLoading'
import ProfileHeader from '../headers/ProfileHeader'
import SkeletonPiece from '../shared/SkeletonPiece'
import SkeletonBox from '../shared/SkeletonBox'

const ProfileLoading = ({ data }) => {
  return (
    <BaseLoading queryData={data} PageHeader={ProfileHeader}>
      <main className="mt6 flex-ns flex-wrap-ns items-start-ns">
        <SkeletonBox shouldAllowGrowing shouldShowLowerButton maxWidthStep={6}>
          <div className="flex flex-wrap mb8 justify-between w5">
            <SkeletonPiece width={40} />
            <SkeletonPiece width={50} />
          </div>
          <div className="mb8">
            <SkeletonPiece width={100} />
          </div>
          <div className="flex flex-wrap mb8 justify-between">
            <SkeletonPiece width={30} />
            <SkeletonPiece width={50} />
          </div>
          <div className="flex flex-wrap mb8 justify-between">
            <SkeletonPiece width={40} />
            <SkeletonPiece width={50} />
          </div>
        </SkeletonBox>
        <div className="flex flex-wrap mb8 justify-between w5">
          <SkeletonBox shouldAllowGrowing shouldShowLowerButton maxWidthStep={5}>
            <SkeletonPiece width={100} />
          </SkeletonBox>
        </div>
      </main>
    </BaseLoading>
  )
}

ProfileLoading.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProfileLoading
