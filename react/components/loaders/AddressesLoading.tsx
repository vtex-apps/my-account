import type { FunctionComponent } from 'react'
import React from 'react'
import {
  SkeletonPiece,
  SkeletonBox,
  BaseLoading,
} from 'vtex.my-account-commons'

import { headerConfig } from '../pages/Addresses'

const AddressesLoading: FunctionComponent<Props> = ({ data }) => {
  return (
    <BaseLoading queryData={data} headerConfig={headerConfig}>
      <main className="mt7 flex-ns flex-wrap-ns items-start-ns">
        {[0, 1].map(i => (
          <SkeletonBox shouldShowLowerButton key={i}>
            <div className="pv4 w5 h4">
              <div className="mb4">
                <SkeletonPiece width="70" size="3" />
              </div>
              <div className="mb4">
                <SkeletonPiece width="40" size="3" />
              </div>
              <SkeletonPiece width="30" size="3" />
            </div>
          </SkeletonBox>
        ))}
      </main>
    </BaseLoading>
  )
}

interface Props {
  data: unknown
}

export default AddressesLoading
