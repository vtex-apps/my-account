import React, { FC } from 'react'
import { SkeletonPiece } from 'vtex.my-account-commons'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['shimmer'] as const

const UserInfoLoading: FC = () => {
  const cssHandles = useCssHandles(CSS_HANDLES)

  return (
    <div className="flex items-end mb7">
      <div className="mr5 relative">
        <div className="h3 w3 br-100 bg-light-silver">
          <div className={cssHandles.shimmer} />
        </div>
      </div>
      <div className="flex-auto w3">
        <div className="mb2">
          <SkeletonPiece width={50} />
        </div>
        <SkeletonPiece />
      </div>
    </div>
  )
}

export default UserInfoLoading
