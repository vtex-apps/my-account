import React from 'react'
import PropTypes from 'prop-types'
import SkeletonPiece from './SkeletonPiece'

const SkeletonBox = ({
  children,
  maxWidthStep,
  shouldAllowGrowing,
  shouldShowLowerButton,
}) => {
  const widthClass = maxWidthStep ? `mw${maxWidthStep}` : ''
  const flexClass = shouldAllowGrowing ? 'flex-auto' : 'flex-none'
  return (
    <div className={`pb5 pr5-ns ${flexClass} ${widthClass}`}>
      <article className="ba bw1 b--light-gray br2 h-100 flex flex-column justify-between">
        <main className="ph7 pv6">{children}</main>
        {shouldShowLowerButton && (
          <footer className="flex justify-end ph7 pb6 pt3">
            <SkeletonPiece width={50} />
          </footer>
        )}
      </article>
    </div>
  )
}

SkeletonBox.defaultProps = {
  shouldAllowGrowing: false,
}

SkeletonBox.propTypes = {
  children: PropTypes.any.isRequired,
  maxWidthStep: PropTypes.number,
  shouldAllowGrowing: PropTypes.bool,
  shouldShowLowerButton: PropTypes.bool,
}

export default SkeletonBox
