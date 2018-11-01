import React from 'react'
import PropTypes from 'prop-types'

import BaseLoading from '../shared/BaseLoading'
import { headerConfig } from '../pages/Addresses'
import SkeletonPiece from '../../components/shared/SkeletonPiece'
import SkeletonBox from '../../components/shared/SkeletonBox'

const AddressesLoading = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig}>
      <main className="mt7 flex-ns flex-wrap-ns items-start-ns">
        <SkeletonBox shouldShowLowerButton>
          <div className="pv4 w5 h4">
            <div className="mb4">
              <SkeletonPiece width={70} />
            </div>
            <div className="mb4">
              <SkeletonPiece width={40} />
            </div>
            <SkeletonPiece width={30} />
          </div>
        </SkeletonBox>
        <SkeletonBox shouldShowLowerButton>
          <div className="pv4 w5 h4">
            <div className="mb4">
              <SkeletonPiece width={70} />
            </div>
            <div className="mb4">
              <SkeletonPiece width={40} />
            </div>
            <SkeletonPiece width={30} />
          </div>
        </SkeletonBox>
      </main>
    </BaseLoading>
  )
}

AddressesLoading.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AddressesLoading
