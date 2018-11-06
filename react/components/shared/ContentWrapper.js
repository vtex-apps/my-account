import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { injectIntl, intlShape } from 'react-intl'
import { PageHeader } from 'vtex.styleguide'

import GenericError from './GenericError'

class ContentWrapper extends Component {
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
    const { children, intl, titleId, backButton, history, headerContent } = this.props
    const { shouldShowError } = this.state

    return (
      <section className="vtex-account__page w-100 w-80-m pa6">
        <header>
          <PageHeader
            title={intl.formatMessage({ id: titleId })}
            linkLabel={
              backButton
                ? intl.formatMessage({ id: backButton.titleId })
                : intl.formatMessage({ id: 'commons.back' })
            }
            onLinkClick={() => history.push(backButton ? backButton.path : '/')}
          >
            {headerContent}
          </PageHeader>
        </header>
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

ContentWrapper.propTypes = {
  intl: intlShape,
  children: PropTypes.func.isRequired,
  titleId: PropTypes.string.isRequired,
  backButton: PropTypes.shape({
    titleId: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }),
  headerContent: PropTypes.node,

}

export default withRouter(injectIntl(ContentWrapper))