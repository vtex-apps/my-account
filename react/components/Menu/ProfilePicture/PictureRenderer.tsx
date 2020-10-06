import React, { FunctionComponent } from 'react'

import UserPlaceholderPicture from './UserPlaceholderPicture'

const PictureRenderer: FunctionComponent<Props> = ({ imagePath }) => {
  const imageStyle = { backgroundImage: `url(${imagePath})` }

  return imagePath ? (
    <div className="h-100 w-100 br-100 cover" style={imageStyle} />
  ) : (
    <UserPlaceholderPicture />
  )
}

interface Props {
  imagePath?: string
}

export default PictureRenderer
