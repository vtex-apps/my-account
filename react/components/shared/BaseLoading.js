import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReloadableError from './ReloadableError'
import PageTemplate from './PageTemplate'

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
    const { PageHeader, children, queryData } = this.props

    const hasAuthenticationError =
      queryData.error &&
      queryData.error.toString().indexOf('not authenticated') > -1

    return (
      <PageTemplate
        header={<PageHeader />}
      >
        {() => (
          <Fragment>
            {isLoading || true ? (
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
      </PageTemplate>
    )
  }
}

BaseLoading.propTypes = {
  queryData: PropTypes.any.isRequired,
  PageHeader: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}

export default BaseLoading
