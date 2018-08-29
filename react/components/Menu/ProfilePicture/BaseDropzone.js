import PropTypes from 'prop-types'
import React from 'react'
import ReactDropzone from 'react-dropzone'

const MAX_SIZE = 4 * 1024 * 1024

const BaseDropzone = ({
  disabled,
  children,
  onClick,
  onDrop,
}) => (
  <ReactDropzone
    accept="image/*"
    activeClassName="b--blue bg-washed-blue"
    className="ba br2 bw1 b--dashed b--light-gray pa7 pa9-ns"
    disabled={disabled}
    disablePreview={true}
    maxSize={MAX_SIZE}
    multiple={false}
    onClick={onClick}
    onDrop={onDrop}
  >
    {children}
  </ReactDropzone>
)

BaseDropzone.propTypes = {
  children: PropTypes.element,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export default BaseDropzone
