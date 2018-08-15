import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'vtex.styleguide'
import ConnectionError from '../../components/shared/ConnectionError'

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
    const { PageHeader, children } = this.props

    return (
      <section>
        <PageHeader />
        <main className="mt7">
          {isLoading ? children : <ConnectionError onReload={this.reload} />}
        </main>
      </section>
    )
  }
}

BaseLoading.propTypes = {
  queryData: PropTypes.any.isRequired,
  PageHeader: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}

export default BaseLoading
