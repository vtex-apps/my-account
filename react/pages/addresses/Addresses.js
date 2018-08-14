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
  startEditing = address => {
    this.props.history.push('/addresses/edit/' + address.addressId)
  }

  render() {
    const { addresses, location } = this.props
    const shouldShowToast = location.search === '?success=true'

    return (
      <section>
        <AddressesHeader />
        <main className="mt7 flex-ns flex-wrap-ns items-start-ns relative">
          {addresses.map(address => (
            <AddressBox
              key={address.addressId}
              address={address}
              onEditClick={() => this.startEditing(address)}
            />
          ))}
          {shouldShowToast && <Toast messageId="alert.success" />}
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
