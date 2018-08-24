import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'vtex.styleguide'

class UploadPictureModal extends Component {
  render() {
    const { isOpen, handleClose } = this.props
    return (
      <Modal centered isOpen={isOpen} onClose={handleClose}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Modal>
    )
  }
}

export default UploadPictureModal
