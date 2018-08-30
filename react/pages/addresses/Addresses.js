import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import AddressesHeader from './AddressesHeader'
import AddressesLoading from './AddressesLoading'
import AddressBox from '../../components/Addresses/AddressBox'
import Toast from '../../components/shared/Toast'
import GetAddresses from '../../graphql/getAddresses.gql'

class Addresses extends Component {
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

  startEditing = address => {
    this.props.history.push(`/addresses/edit/${address.addressId}`)
  }

  render() {
    const { addresses } = this.props
    const { showToast } = this.state

    return (
      <section className="pa6 pv0-m-2 pl0-m-2 pr5-m pr8-l">
        <AddressesHeader />
        <main className="mt7 flex-ns flex-wrap-ns items-start-ns relative">
          {addresses.map(address => (
            <AddressBox
              key={address.addressId}
              address={address}
              onEditClick={() => this.startEditing(address)}
            />
          ))}
          {showToast && (
            <Toast messageId="alert.success" onClose={this.handleCloseToast} />
          )}
        </main>
      </section>
    )
  }
}

Addresses.propTypes = {
  addresses: PropTypes.array.isRequired,
}

const enhance = compose(
  graphql(GetAddresses),
  branch(({ data }) => data.profile == null, renderComponent(AddressesLoading)),
  withProps(({ data }) => ({ addresses: data.profile.addresses })),
  withRouter,
)
export default enhance(Addresses)
