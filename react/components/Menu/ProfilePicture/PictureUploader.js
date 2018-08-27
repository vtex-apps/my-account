import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { compose } from 'recompose'
import { Button, Spinner } from 'vtex.styleguide'
import { graphql } from 'react-apollo'
import UploadProfilePicture from '../../../graphql/uploadProfilePicture.gql'
import BaseDropzone from './BaseDropzone'
import GenericError from '../../shared/GenericError'
import PictureRenderer from './PictureRenderer'

class PictureUploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoading: false,
      finishedUpload: false,
    }
  }

  handleImageDrop = async acceptedFiles => {
    const { uploadProfilePicture } = this.props

    if (acceptedFiles && acceptedFiles[0]) {
      this.setState({ isLoading: true })

      try {
        await uploadProfilePicture({ variables: { file: acceptedFiles[0] } })
        this.setState({ isLoading: false, finishedUpload: true })

        console.log('obtivemos sucesso')
      } catch (e) {
        console.log(e)
        this.setState({
          error: 'alert.unknownError',
          isLoading: false,
        })
      }
    } else {
      this.setState({ error: 'alert.fileTooBig' })
    }
  }

  handleErrorReset = () => {
    this.setState({ error: null })
  }

  render() {
    const { currentPicture, onCloseClick, intl } = this.props
    const { error, isLoading, finishedUpload } = this.state
    const boxText = finishedUpload
      ? 'upload.photoUpdated'
      : 'upload.dragYourPhoto'

    return (
      <React.Fragment>
        {error && (
          <div className="mb6">
            <GenericError onDismiss={this.handleErrorReset} errorId={error} />
          </div>
        )}
        <BaseDropzone
          disabled={isLoading || finishedUpload}
          onClick={this.handleErrorReset}
          onDrop={this.handleImageDrop}
        >
          <div className="w-100 w5-ns flex flex-column justify-between items-center">
            {isLoading ? (
              <React.Fragment>
                <Spinner />
                <div className="mt8 f5 tc gray">
                  {intl.formatMessage({ id: 'upload.loading' })}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="h4 w4 mb8">
                  <PictureRenderer imagePath={currentPicture} />
                </div>
                <div className="mb8 f5 tc gray">
                  {intl.formatMessage({ id: boxText })}
                </div>
                {finishedUpload ? (
                  <Button size="small" onClick={onCloseClick}>
                    {intl.formatMessage({ id: 'upload.close' })}
                  </Button>
                ) : (
                  <Button size="small">
                    {intl.formatMessage({ id: 'upload.choosePhoto' })}
                  </Button>
                )}
              </React.Fragment>
            )}
          </div>
        </BaseDropzone>
      </React.Fragment>
    )
  }
}

PictureUploader.propTypes = {
  uploadProfilePicture: PropTypes.func.isRequired,
  currentPicture: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(UploadProfilePicture, { name: 'uploadProfilePicture' }),
  injectIntl,
)
export default enhance(PictureUploader)
