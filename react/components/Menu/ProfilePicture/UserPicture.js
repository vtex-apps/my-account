import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'vtex.styleguide'
import PictureUploader from './PictureUploader'
import PictureRenderer from './PictureRenderer'

class UserPicture extends Component {
  state = {
    isModalOpen: false,
  }

  handleOpenModal = () => {
    this.setState({ isModalOpen: true })
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { imagePath } = this.props
    const { isModalOpen } = this.state

    return (
      <React.Fragment>
        <PictureRenderer imagePath={imagePath} />
        <button
          className="absolute bottom-0 right-0 c-on-base--inverted center bg-action-primary br-100 f4 bn pointer"
          onClick={this.handleOpenModal}>
          +
        </button>
        <Modal centered isOpen={isModalOpen} onClose={this.handleCloseModal}>
          <div className="pv4 ph4">
            <PictureUploader
              currentPicture={imagePath}
              onCloseClick={this.handleCloseModal}
            />
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

UserPicture.propTypes = {
  imagePath: PropTypes.string,
}

export default UserPicture
