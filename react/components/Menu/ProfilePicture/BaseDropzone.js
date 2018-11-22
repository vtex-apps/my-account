import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDropzone from 'react-dropzone'

const MAX_SIZE = 4 * 1024 * 1024

class BaseDropzone extends Component {
  state = {
    isHovering: false,
  }

  handleStartHovering = () => {
    this.setState({ isHovering: true })
  }

  handleStopHovering = () => {
    this.setState({ isHovering: false })
  }

  handleDrop = files => {
    this.setState({ isHovering: false })
    this.props.onDrop(files)
  }

  render() {
    const { disabled, children, onClick } = this.props
    const { isHovering } = this.state
    return (
      <ReactDropzone
        accept="image/*"
        activeClassName="b--action-primary bg-action-secondary"
        className={`ba br2 bw1 b--dashed ${
          isHovering ? '' : 'b--muted-4'
        } pa7 pa9-ns`}
        disabled={disabled}
        disablePreview
        maxSize={MAX_SIZE}
        multiple={false}
        onClick={onClick}
        onDrop={this.handleDrop}
        onDragEnter={this.handleStartHovering}
        onDragLeave={this.handleStopHovering}>
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
