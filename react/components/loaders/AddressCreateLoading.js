import React from 'react'
import PropTypes from 'prop-types'
import { SkeletonPiece, SkeletonBox, BaseLoading } from 'vtex.my-account-commons'

import { headerConfig } from '../pages/AddressCreate'

const AddressCreateLoading = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig()}>
      <SkeletonBox shouldAllowGrowing maxWidthStep={6}>
        <div className="mb8 mt4">
          <SkeletonPiece width={100} />
          <SkeletonPiece width={100} />
        </div>
        <div className="mb9">
          <SkeletonPiece width={100} />
          <SkeletonPiece width={100} />
        </div>
        <div className="mb8">
          <SkeletonPiece width={40} />
          <SkeletonPiece width={40} />
        </div>
      </SkeletonBox>
    </BaseLoading>
  )
}

AddressCreateLoading.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AddressCreateLoading
