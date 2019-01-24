import React from 'react'
import PropTypes from 'prop-types'
import { SkeletonPiece, SkeletonBox, BaseLoading } from 'vtex.my-account-commons'
import { headerConfig } from '../pages/Profile'

const ProfileLoading = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig()}>
      <main className="flex flex-column-s flex-row-ns">
        <div className="w-60-ns w-100-s">
          <SkeletonBox shouldAllowGrowing shouldShowLowerButton>
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
        </div>
        <div className="w-40-ns w-100-s">
          <SkeletonBox
            shouldAllowGrowing
            shouldShowLowerButton>
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
