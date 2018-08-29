import React from 'react'
import PropTypes from 'prop-types'
import UserPlaceholderPicture from './UserPlaceholderPicture'

const PictureRenderer = ({ imagePath }) => {
  const imageStyle = { backgroundImage: `url(${imagePath})` }
  return imagePath ? (
    <div className="h-100 w-100 br-100 cover" style={imageStyle} />
  ) : (
    <UserPlaceholderPicture />
  )
}

PictureRenderer.propTypes = {
  imagePath: PropTypes.string,
}

export default PictureRenderer
