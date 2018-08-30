import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReloadableError from '../../components/shared/ReloadableError'
import ContentWrapper from './ContentWrapper'

class BaseLoading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidUpdate(prevProps) {
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
      <ContentWrapper>
        <PageHeader />
        <main className="mt7">
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
        </main>
      </ContentWrapper>
    )
  }
}

BaseLoading.propTypes = {
  queryData: PropTypes.any.isRequired,
  PageHeader: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}

export default BaseLoading
