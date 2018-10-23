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
      <section className="pa0 pa6-m pv0-m-2 pl0-m-2 pr8-l">
        {header}
        <main className="center w-100 pt6 tc">
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