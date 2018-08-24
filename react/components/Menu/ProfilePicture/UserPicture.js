import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconPlus, Modal } from 'vtex.styleguide'
import PictureUploader from './PictureUploader'
import UserPlaceholderPicture from './UserPlaceholderPicture'

class UserPicture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: true,
    }
  }

  openModal = () => {
    console.log('opening modal')
    this.setState({ isModalOpen: true })
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { isModalOpen } = this.state
    return (
      <React.Fragment>
        <UserPlaceholderPicture />
        <button
          className="absolute bottom-0 right-0 blue hover-heavy-blue bg-white br-100 pa0 bn pointer"
          onClick={this.openModal}
        >
          <IconPlus block size={22} />
        </button>
        <Modal centered isOpen={isModalOpen} onClose={this.handleCloseModal}>
          <div className="pv4 ph4">
            <PictureUploader />
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

export default UserPicture
