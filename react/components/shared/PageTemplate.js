import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GenericError from './GenericError'

export default class PageTemplate extends Component {
  state = {
    shouldShowError: false,
  }

  handleError = () => {
    this.setState({ shouldShowError: true })
  }

  handleDismissError = () => {
    this.setState({ shouldShowError: false })
  }

  render() {
    const { children, header } = this.props
    const { shouldShowError } = this.state

    return (
      <section className="vtex-account__page w-100 w-80-m pa6">
        {header}
        <main className="vtex-account__page-body center w-100 pt6 flex justify-around">
          {shouldShowError && (
            <GenericError
              onDismiss={this.handleDismissError}
              errorId="alert.unknownError"
            />
          )}
          {children(this.handleError)}
        </main>
      </section>
    )
  }
}

PageTemplate.propTypes = {
  children: PropTypes.func.isRequired,
  header: PropTypes.node.isRequired,
}