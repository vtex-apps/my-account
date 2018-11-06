import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import ReloadableError from './ReloadableError'
import ContentWrapper from './ContentWrapper'

class BaseLoading extends Component {
  state = {
    isLoading: true,
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.queryData.loading != this.props.queryData.loading) {
      this.setState({ isLoading: false })
    }
  }

  reload = async () => {
    this.setState({ isLoading: true })
    try {
      await this.props.queryData.refetch()
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { isLoading } = this.state
    const { headerConfig, children, queryData, intl } = this.props

    const hasAuthenticationError =
      queryData.error &&
      queryData.error.toString().indexOf('not authenticated') > -1

    return (
      <ContentWrapper {...headerConfig(intl)}>
        {() => (
          <Fragment>
            {isLoading ? (
              children
            ) : (
                <ReloadableError
                  errorId={
                    hasAuthenticationError
                      ? 'alert.unauthenticated'
                      : 'alert.connectionError'
                  }
                  onReload={this.reload}
                />
              )}
          </Fragment>
        )}
      </ContentWrapper>
    )
  }
}

BaseLoading.propTypes = {
  intl: intlShape.isRequired,
  queryData: PropTypes.any.isRequired,
  headerConfig: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}

export default injectIntl(BaseLoading)
