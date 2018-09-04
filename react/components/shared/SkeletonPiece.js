import React from 'react'
import PropTypes from 'prop-types'

const SkeletonPiece = ({ width }) => (
  <div className={`pa3 bg-muted-4 w-${width} relative overflow-hidden`}>
    <div className="shimmer" />
  </div>
)

SkeletonPiece.defaultProps = {
  width: 100,
}

SkeletonPiece.propTypes = {
  width: PropTypes.number,
}

export default SkeletonPiece
