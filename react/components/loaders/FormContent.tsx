import React, { PureComponent } from 'react'
import { SkeletonPiece } from 'vtex.my-account-commons'

// eslint-disable-next-line react/prefer-stateless-function
class FormContent extends PureComponent {
  public render() {
    return (
      <>
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
      </>
    )
  }
}

export default FormContent
