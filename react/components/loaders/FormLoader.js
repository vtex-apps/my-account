import React from 'react'
import { SkeletonPiece, SkeletonBox } from 'vtex.my-account-commons'

const FormLoader = () => (
  <SkeletonBox shouldAllowGrowing maxWidthStep={6}>
    <div className="mb8 mt4">
      <SkeletonPiece width="100" size="3" />
      <SkeletonPiece width="100" size="3" />
    </div>
    <div className="mb9">
      <SkeletonPiece width="100" size="3" />
      <SkeletonPiece width="100" size="3" />
    </div>
    <div className="mb8">
      <SkeletonPiece width="40" size="3" />
      <SkeletonPiece width="40" size="3" />
    </div>
  </SkeletonBox>
)

export default FormLoader
