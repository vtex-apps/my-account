import React from 'react'
import SkeletonPiece from '../shared/SkeletonPiece'

const UserInfoLoading = () => {
  return (
    <div className="flex items-end mb7">
      <div className="mr5 relative">
        <div className="h3 w3 br-100 bg-light-silver">
          <div className="shimmer" />
        </div>
      </div>
      <div className="flex-auto">
        <div className="mb2">
          <SkeletonPiece width={50} />
        </div>
        <div>
          <SkeletonPiece />
        </div>
      </div>
    </div>
  )
}

export default UserInfoLoading
