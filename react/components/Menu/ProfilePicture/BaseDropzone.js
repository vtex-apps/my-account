import PropTypes from 'prop-types'
import React from 'react'
import ReactDropzone from 'react-dropzone'

const MAX_SIZE = 4 * 1024 * 1024

const BaseDropzone = ({ disabled, children, onClick, onDrop }) => (
  <ReactDropzone
    accept="image/*"
    activeClassName="b--action-primary bg-action-secondary"
    className="ba br2 bw1 b--dashed b--muted-4 pa7 pa9-ns"
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
