import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import PaymentsHeader from './PaymentsHeader'
import PaymentsLoading from './PaymentsLoading'
import PaymentBox from '../../components/Payments/PaymentBox'
import Toast from '../../components/shared/Toast'
import GetAddresses from '../../graphql/getAddresses.gql'

class Payments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showToast: false,
    }
  }

  componentDidMount() {
    const { location } = this.props
    this.setState({ showToast: location.search.indexOf('success=true') > -1 })
  }

  handleCloseToast = () => {
    this.setState({ showToast: false })
  }

  render() {
    const { addresses } = this.props
    const { showToast } = this.state

    return (
      <section>
        <PaymentsHeader />
        <main className="mt7 flex-ns flex-wrap-ns items-start-ns relative">
          {addresses.map(address => (
            <PaymentBox address={address} />
          ))}
          {showToast && (
            <Toast messageId="alert.success" onClose={this.handleCloseToast} />
          )}
        </main>
      </section>
    )
  }
}

Payments.propTypes = {
  addresses: PropTypes.array.isRequired,
}

const enhance = compose(
  graphql(GetAddresses),
  branch(({ data }) => data.profile == null, renderComponent(PaymentsLoading)),
  withProps(({ data }) => ({ addresses: data.profile.addresses })),
  withRouter,
)
export default enhance(Payments)
