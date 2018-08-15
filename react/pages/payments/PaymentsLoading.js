import React from 'react'
import PropTypes from 'prop-types'
import BaseLoading from '../shared/BaseLoading'
import PaymentsHeader from './PaymentsHeader'
import SkeletonPiece from '../../components/shared/SkeletonPiece'
import SkeletonBox from '../../components/shared/SkeletonBox'

const PaymentsLoading = ({ data }) => {
  return (
    <BaseLoading queryData={data} PageHeader={PaymentsHeader}>
      <main className="mt7 flex-ns flex-wrap-ns items-start-ns">
        <SkeletonBox>
          <div className="pv4 w5">
            <div className="mb8">
              <SkeletonPiece width={70} />
            </div>
            <div className="mb8">
              <SkeletonPiece width={100} />
            </div>
            <div className="mb8">
              <SkeletonPiece width={40} />
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
          <div className="pv4 w5">
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
