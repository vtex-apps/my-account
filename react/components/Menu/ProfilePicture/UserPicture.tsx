import React, { Component } from 'react'
import { Modal } from 'vtex.styleguide'

import PictureUploader from './PictureUploader'
import PictureRenderer from './PictureRenderer'

class UserPicture extends Component<Props> {
  public state = {
    isModalOpen: false,
  }

  private handleOpenModal = () => {
    this.setState({ isModalOpen: true })
  }

  private handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  public render() {
    const { imagePath } = this.props
    const { isModalOpen } = this.state

    return (
      <React.Fragment>
        <PictureRenderer imagePath={imagePath} />
        <button
          className="absolute bottom-0 right-0 pa0 c-on-base--inverted bg-action-primary br-100 f5 bn pointer flex justify-center items-center"
          style={{ width: 26, height: 26 }}
          onClick={this.handleOpenModal}>
          ＋
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

interface Props {
  imagePath?: string
}

export default UserPicture
