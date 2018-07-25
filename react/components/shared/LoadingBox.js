import React from 'react'
import PropTypes from 'prop-types'
import ContentBox from './ContentBox'
import Spinner from '@vtex/styleguide/lib/Spinner'

const LoadingBox = ({ width }) => {
  return (
    <ContentBox isCentered width={width}>
      <div className="flex justify-center pv6">
        <Spinner />
      </div>
    </ContentBox>
  )
}

LoadingBox.propTypes = {
  width: PropTypes.string,
}

export default LoadingBox
