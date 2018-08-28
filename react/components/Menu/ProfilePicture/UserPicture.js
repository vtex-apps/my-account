import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconPlus, Modal } from 'vtex.styleguide'
import PictureUploader from './PictureUploader'
import PictureRenderer from './PictureRenderer'

class UserPicture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
    }
  }

  openModal = () => {
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
          className="absolute bottom-0 right-0 c-link hover-c-link bg-base br-100 pa0 bn pointer"
          onClick={this.openModal}
        >
          <IconPlus block size={22} />
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
