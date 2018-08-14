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
    if (prevProps.data.loading != this.props.data.loading) {
      this.setState({ isLoading: false })
    }
  }

  reload = async () => {
    this.setState(() => ({ isLoading: true }))
    try {
      await this.props.data.refetch()
    } catch (error) {}
    this.setState(() => ({ isLoading: false }))
  }

  render() {
    const { PageHeader, isLoading } = this.state

    return (
      <section>
        {/* <PageHeader /> */}
        <main className="mt7">
          {isLoading ? <Spinner /> : <ConnectionError onReload={this.reload} />}
        </main>
      </section>
    )
  }
}

BaseLoading.propTypes = {
  data: PropTypes.any.isRequired,
  PageHeader: PropTypes.element.isRequired,
}

export default BaseLoading
