import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDropzone from 'react-dropzone'

const MAX_SIZE = 4 * 1024 * 1024

class BaseDropzone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false,
    }
  }

  startHovering = () => {
    this.setState({ isHovering: true })
  }

  stopHovering = () => {
    this.setState({ isHovering: false })
  }

  handleDrop = files => {
    this.setState({ isHovering: false })
    this.props.onDrop(files)
  }

  render() {
    const { disabled, children, onClick, onDrop } = this.props
    const { isHovering } = this.state
    return (
      <ReactDropzone
        accept="image/*"
        activeClassName="b--action-primary bg-action-secondary"
        className={`ba br2 bw1 b--dashed ${
          isHovering ? '' : 'b--muted-4'
        } pa7 pa9-ns`}
        disabled={disabled}
        disablePreview={true}
        maxSize={MAX_SIZE}
        multiple={false}
        onClick={onClick}
        onDrop={this.handleDrop}
        onDragEnter={this.startHovering}
        onDragLeave={this.stopHovering}
      >
        {children}
      </ReactDropzone>
    )
  }
}

BaseDropzone.propTypes = {
  children: PropTypes.element,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export default BaseDropzone
