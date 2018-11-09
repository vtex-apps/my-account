import React from 'react'
import PropTypes from 'prop-types'
import { BaseLoading } from 'vtex.store-components/Account'

import { headerConfig } from '../pages/Payments'
import SkeletonPiece from '../shared/SkeletonPiece'
import SkeletonBox from '../shared/SkeletonBox'

const PaymentsLoading = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig()}>
      <main className="mt7 flex-ns flex-wrap-ns items-start-ns">
        <SkeletonBox>
          <div className="pv4 w5 h5">
            <div className="mb8">
              <SkeletonPiece width={100} />
            </div>
            <div className="mb4">
              <SkeletonPiece width={70} />
            </div>
            <div className="mb4">
              <SkeletonPiece width={40} />
            </div>
            <div className="mb4">
              <SkeletonPiece width={30} />
            </div>
          </div>
        </SkeletonBox>
        <SkeletonBox>
          <div className="pv4 w5 h5">
            <div className="mb8">
              <SkeletonPiece width={100} />
            </div>
            <div className="mb4">
              <SkeletonPiece width={70} />
            </div>
            <div className="mb4">
              <SkeletonPiece width={40} />
            </div>
            <div className="mb4">
              <SkeletonPiece width={30} />
            </div>
          </div>
        </SkeletonBox>
      </main>
    </BaseLoading>
  )
}

PaymentsLoading.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PaymentsLoading
