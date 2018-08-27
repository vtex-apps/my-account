import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconPlus, Modal } from 'vtex.styleguide'
import PictureUploader from './PictureUploader'
import PictureRenderer from './PictureRenderer'

class UserPicture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: true,
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { profile } = this.props
    const imagePath = profile.customFields[0].value
      ? '//api.vtex.com/storecomponents/dataentities/CL/documents/03532226-a799-11e8-8214-ff32d2cd1e6c/profilePicture/attachments/' +
        profile.customFields[0].value
      : null

    const { isModalOpen } = this.state
    return (
      <React.Fragment>
        <PictureRenderer imagePath={imagePath} />
        <button
          className="absolute bottom-0 right-0 blue hover-heavy-blue bg-white br-100 pa0 bn pointer"
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
  profile: PropTypes.object.isRequired,
}

export default UserPicture
