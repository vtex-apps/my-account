import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { Alert } from 'vtex.styleguide'

class Toast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClosing: false,
    }
  }

  componentDidMount() {
    this.openTimeout = setTimeout(() => {
      this.setState({ isClosing: true }, () => {
        this.closeTimeout = setTimeout(() => {
          this.props.onClose
        }, 3000)
      })
    }, this.props.autoClose)
  }

  componentWillUnmount() {
    clearTimeout(this.openTimeout)
    clearTimeout(this.closeTimeout)
  }

  render() {
    const { isClosing } = this.state
    const { onClose, messageId, intl } = this.props
    return (
      <div
        className={`animated ${
          isClosing ? 'fadeOutDown' : 'fadeInUp'
        }  slower bottom--1 fixed z-5 ma7-ns mb5-s left-2-ns w-100-s w-30-ns`}
      >
        <Alert type="success" onClose={onClose}>
          {intl.formatMessage({ id: messageId })}
        </Alert>
      </div>
    )
  }
}

Toast.defaultProps = {
  autoClose: 3000,
}

Toast.propTypes = {
  autoClose: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  messageId: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(Toast)
