import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { Button } from 'vtex.styleguide'
import Header from '../components/shared/Header'
import AddressBox from '../components/Addresses/AddressBox'
import Loading from '../pages/Loading'
import GetAddresses from '../graphql/getAddresses.gql'
import ConnectionError from '../components/shared/ConnectionError'

class Addresses extends Component {
  startEditing = address => {
    this.props.history.push('/addresses/edit/' + address.addressId)
  }

  render() {
    const { addresses, error, data } = this.props

    console.log(data.loading)

    return (
      <section>
        <Header
          titleId={'pages.addresses'}
          actionButton={{ id: 'addresses.addAddress', path: '/addresses/new' }}
        />
        {error ? (
          <ConnectionError onReload={data.refetch} />
        ) : (
          <main className="mt7 flex-ns flex-wrap-ns items-start-ns">
            {addresses.map(address => (
              <AddressBox
                key={address.addressId}
                address={address}
                onEditClick={() => this.startEditing(address)}
              />
            ))}
          </main>
        )}
      </section>
    )
  }
}

Addresses.propTypes = {
  addresses: PropTypes.array.isRequired,
}

const enhance = compose(
  graphql(GetAddresses),
  branch(({ data }) => data.loading, renderComponent(Loading)),
  branch(({ data }) => data.error, renderComponent(ConnectionError)),
  withProps(({ data }) => ({
    addresses: data.profile && data.profile.addresses,
    error: data.error,
  })),
  withRouter,
)
export default enhance(Addresses)
